import {
  Card,
  CardBody,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Book } from "../hooks/useBooks";
import BookCardContainer from "./BookCardContainer";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("#AF8F6F", "#74512D");
  const headingColor = useColorModeValue("#543310", "#F8F4E1");
  const textColor = useColorModeValue("#74512D", "#AF8F6F");

  return (
    <BookCardContainer>
      <Card bg={bgColor}>
        <Image src={book.image} />
        <CardBody>
          <Heading fontSize="l" marginY="1" color={headingColor}>
            {book.title}
          </Heading>
          <Text fontSize="m" color={textColor}>
            {book.genre}
          </Text>
        </CardBody>
      </Card>
    </BookCardContainer>
  );
};

export default BookCard;
