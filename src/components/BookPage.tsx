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
import { Book, getBooks, Comment } from "../hooks/useBooks";
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
  const [comment, setComment] = useState("");
  const [book, setBook] = useState<Book>();

  enum BookStatus {
      BOOKED_BY_USER,
      NOT_AVAILABLE,
      AVAILABLE,
      BOOKING_NOT_AVAILABLE
  }

  const [bookStatus, setBookStatus] = useState(BookStatus.NOT_AVAILABLE);
  const username = Cookies.get("username");

  //get book info with comments
  useEffect(() => {
      getBooks().then(books => {
          var selectedBook = books.find(
              (book) => book.id === parseInt(String(id))
          );

          if (!!selectedBook) {
              getBookComments(selectedBook.id)
                  .then((comments) => {
                      comments.forEach(bookComment => {
                          console.log("bookComment")
                          selectedBook.addComment(bookComment.username, bookComment.comment);
                      });
                      setBook(selectedBook);
                  });
          }
      })

    }, []);

  //set book status to borrow or return book
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

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddComment = () => {
      if (book) {
          postComment(book.id).then(resp => {
              book.addComment(username, comment);
              setComment("");
          })
      }
  };

  // Debugging: Log the image URL to the console
  useEffect(() => {
    if (book) {
      console.log("Book image URL:", book.image);
    }
  }, [book]);

  const getBookComments = async (bookId: number): Promise<Comment[]> => {
    return await fetch('http://localhost:8080/api/books/' + bookId + "/comments", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then((CommentList: Comment[]) => {
        // return [{"username": "xxx", "comment": "yyy"}];
        return CommentList;
    })
    .catch((err) => {
        console.log(err.message);
        throw err;
    });
  };

  const postComment = async (bookId: number) => {
    return await fetch('http://localhost:8080/api/books/' + bookId + "/comments", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            comment: comment
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .catch((err) => {
        console.log(err.message);
        throw err;
    });
};

  const onBorrowClick = async () => {
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

  const onReturnClick = async () => {
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
