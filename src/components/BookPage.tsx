import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Button,
  Flex,
  Box,
  useColorMode,
  Input,
  Textarea,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Book, getBooks } from "../hooks/useBooks";
import BookPageContainer from "./BookPageContainer";
import fallback from "../images/fallback_image.jpg";
import FavoriteButton from "./FavoriteButton";
import Cookies from "js-cookie";

const BookPage = () => {
  const { id } = useParams(); // Get book id from URL params
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#543310" : "#F8F4E1";
  const textColor = colorMode === "dark" ? "#F8F4E1" : "#543310";
  const cardBgColor = colorMode === "dark" ? "#74512D" : "#AF8F6F";

  const [isFavorite, setIsFavorite] = useState(false);
  // const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  // const [book, setBook] = useState<Book | undefined>(undefined);

  // useEffect(() => {
  //   const selectedBook: Book | undefined = useBooks().books.find(
  //     (book) => book.id === parseInt(String(id))
  //   );
  //   setBook(selectedBook);
  // }, [id]);

    const [book, setBook] = useState<Book>();
    const [bookList, setBookList] = useState<Book[]>();


    // const [availability, setAvailability] = useState(false);

    enum BookStatus {
        BOOKED_BY_USER,
        NOT_AVAILABLE,
        AVAILABLE,
        BOOKING_NOT_AVAILABLE
    }

    const [bookStatus, setBookStatus] = useState(BookStatus.NOT_AVAILABLE);

    useEffect(() => {
        getBooks().then(response => {
            setBookList(response);
        });
    }, []);

    useEffect(() => {

        setBook(bookList?.find(
            (book) => book.id === parseInt(String(id))
        ));

    }, [bookList]);

    useEffect(() => {
        if (book?.getAvailable()) {
            if (!!username) {
                setBookStatus(BookStatus.AVAILABLE);
            } else {
                setBookStatus(BookStatus.BOOKING_NOT_AVAILABLE);
            }

        } else {
            if (book?.getBorrowedBy() === username) {
                setBookStatus(BookStatus.BOOKED_BY_USER);
            } else {
                setBookStatus(BookStatus.NOT_AVAILABLE);
            }
        }
    }, [book]);


    const username = Cookies.get("username");

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

    const handleAddComment = () => {
        if (book) {
            book.addComment(username, comment);
            // setUsername("");
            setComment("");
        }
    };

  // Debugging: Log the image URL to the console
  useEffect(() => {
    if (book) {
      console.log("Book image URL:", book.image);
    }
  }, [book]);



    const onBorrowClick = async (event: React.MouseEvent) => {
        await fetch('http://localhost:8080/api/books', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                bookId: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                setBookStatus(BookStatus.BOOKED_BY_USER);
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }

    const onReturnClick = async (event: React.MouseEvent) => {
        await fetch('http://localhost:8080/api/books/' + id + '/return', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                setBookStatus(BookStatus.AVAILABLE);
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }

  if (!book) return <div>Book not found</div>;

  return (
    <>
      <BookPageContainer bgColor={bgColor} textColor={textColor}>
        <Card marginRight={10} marginTop={5} marginBottom={15} bg={cardBgColor}>
          <Flex>
            <Box
              borderRadius={10}
              overflow="hidden"
              boxSize={{ width: "150px", height: "200px" }}
              marginLeft={5}
              marginTop={5}
              marginBottom={10}
              minWidth="fit-content"
            >
              <Image
                src={book.image}
                fallbackSrc={fallback}
                borderRadius={5}
                width="300px"
                height="100%"
                objectFit="cover"
              />
            </Box>
            <CardBody marginRight={10}>
              <Heading fontSize="2xl" marginY="5" color={textColor}>
                {book.title}
              </Heading>

              <Text fontWeight="bold" marginBottom="4" color={textColor}>
                {book.author}
              </Text>
              <Text color={textColor}>Pages: {book.pageCount}</Text>
              <Text marginBottom="4" color={textColor}>
                Genre: {book.genre}
              </Text>
              <Text marginBottom={8} color={textColor}>
                Books are timeless vessels of knowledge, imagination, and
                enlightenment. As quintessential artifacts of human
                civilization, they transcend epochs, offering insights into the
                past, present, and future. Within their pages lie the collective
                wisdom of humanity, curated by authors who dare to explore the
                depths of human experience. From ancient scrolls to modern
                bestsellers, books encapsulate diverse perspectives, sparking
                curiosity, empathy, and understanding. They serve as beacons of
                education, entertainment, and inspiration, fostering
                intellectual growth and cultural enrichment. In a world
                inundated with fleeting distractions, books stand as steadfast
                companions, inviting readers to embark on journeys of discovery
                and introspection, enriching lives one page at a time.
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                {bookStatus === BookStatus.AVAILABLE && (
                    <Button bg="#F8F4E1" color="#52322D" alignSelf="end"
                            onClick={onBorrowClick}>
                      Borrow
                    </Button>
                )}

                {bookStatus === BookStatus.BOOKED_BY_USER && (
                    <Button bg="#F8F4E1" color="#52322D" alignSelf="end"
                            onClick={onReturnClick}>
                      Return
                    </Button>
                )}

                {bookStatus === BookStatus.NOT_AVAILABLE && (
                    <Text alignSelf="end">
                      Not available
                    </Text>
                )}

                {bookStatus === BookStatus.BOOKING_NOT_AVAILABLE && (
                    <Text alignSelf="end">

                    </Text>
                )}

                <FavoriteButton
                  isFavorite={isFavorite}
                  onClick={handleFavoriteClick}
                />
              </Flex>
            </CardBody>
          </Flex>
        </Card>

        <Card marginRight={10} marginTop={5} marginBottom={15} bg={cardBgColor}>
          <CardBody>
            <Heading fontSize="xl" marginBottom="4" color={textColor}>
              Comments
            </Heading>
            {book.getComments().length === 0 ? (
              <Text color={textColor}>No comments, yet.</Text>
            ) : (
              <List spacing={3} marginBottom="4">
                {book.getComments().map((c, index) => (
                  <Box key={index} bg={bgColor} padding="4" borderRadius="md">
                    <Text fontWeight="bold" color={textColor}>
                      {c.username}:
                    </Text>
                    <Text color={textColor}>{c.comment}</Text>
                  </Box>
                ))}
              </List>
            )}
          </CardBody>
        </Card>

        <Card marginRight={10} marginTop={5} marginBottom={15} bg={cardBgColor}>
          <CardBody>
            <Heading fontSize="lg" marginBottom="6" color={textColor}>
              Add a Comment
            </Heading>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              marginBottom="2"
              bg={bgColor}
              color={textColor}
            />
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here!"
              marginBottom="2"
              bg={bgColor}
              color={textColor}
            />
            <Flex justifyContent="flex-end">
              <Button onClick={handleAddComment} bg="#F8F4E1" color="#52322D">
                Submit
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </BookPageContainer>
    </>
  );
};

export default BookPage;
