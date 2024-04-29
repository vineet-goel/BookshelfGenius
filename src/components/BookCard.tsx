import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Book } from "../hooks/useBooks";
import BookCardContainer from "./BookCardContainer";

interface Props {
  book: Book;
}
const BookCard = ({ book }: Props) => {
  return (
    <BookCardContainer>
      <Card>
        <Image src={book.image} />
        <CardBody>
          <Heading fontSize="l" marginY="1">
            {book.title}
          </Heading>
          <Text fontSize="m" color="gray.500">
            {book.genre}
          </Text>
        </CardBody>
      </Card>
    </BookCardContainer>
  );
};

export default BookCard;
