import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Book } from "../hooks/useBooks";
import useBooks from "../hooks/useBooks";
import BookPageContainer from "./BookPageContainer";
import fallback from "../images/fallback_image.jpg";

const BookPage = () => {
  const { id } = useParams(); // Get book id from URL params
  const book: Book | undefined = useBooks().books.find(
    (book) => book.id === parseInt(String(id))
  );

  if (!book) return <div>Book not found</div>;

  return (
    <>
      <BookPageContainer>
        <Card marginRight={10} marginTop={5} marginBottom={15}>
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
              <Heading fontSize="2xl" marginY="5">
                {book.title}
              </Heading>

              <Text fontWeight="bold" marginBottom="4">
                {book.author}
              </Text>
              <Text>Pages: {book.pageCount}</Text>
              <Text marginBottom="4">Genre: {book.genre}</Text>
              <Text marginBottom={8}>
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
              <Button bg="#cfcbbc" color="#52322D" alignSelf="end">
                Borrow
              </Button>
            </CardBody>
          </Flex>
        </Card>
      </BookPageContainer>
    </>
  );
};

export default BookPage;
