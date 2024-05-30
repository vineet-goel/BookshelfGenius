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
import { Book } from "../hooks/useBooks";
import useBooks from "../hooks/useBooks";
import BookPageContainer from "./BookPageContainer";
import fallback from "../images/fallback_image.jpg";
import FavoriteButton from "./FavoriteButton";

const BookPage = () => {
  const { id } = useParams(); // Get book id from URL params
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#543310" : "#F8F4E1";
  const textColor = colorMode === "dark" ? "#F8F4E1" : "#543310";
  const cardBgColor = colorMode === "dark" ? "#74512D" : "#AF8F6F";

  const [isFavorite, setIsFavorite] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [book, setBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    const selectedBook: Book | undefined = useBooks().books.find(
      (book) => book.id === parseInt(String(id))
    );
    setBook(selectedBook);
  }, [id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddComment = () => {
    if (book) {
      book.addComment(username, comment);
      setUsername("");
      setComment("");
    }
  };

  // Debugging: Log the image URL to the console
  useEffect(() => {
    if (book) {
      console.log("Book image URL:", book.image);
    }
  }, [book]);

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
                width="100%"
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
                <Button bg="#F8F4E1" color="#52322D" alignSelf="end">
                  Borrow
                </Button>
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
