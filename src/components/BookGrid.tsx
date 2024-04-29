import { SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useBooks, { Book } from "../hooks/useBooks";
import BookCard from "./BookCard";
import { Genre } from "../hooks/useGenres";

interface Props {
  Books: Book[];
  selectedGenre: Genre | null;
}

const BookGrid = ({ Books, selectedGenre }: Props) => {
  const filteredBooks = selectedGenre
    ? Books.filter((book) => book.genre === selectedGenre.name)
    : Books;

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, lg: 6 }}
        mt="17px "
        padding="15px"
        spacing={7}
      >
        {filteredBooks.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`}>
            {" "}
            {/* Link to BookPage */}
            <BookCard book={book} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BookGrid;
