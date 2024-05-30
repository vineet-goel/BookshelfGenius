import { SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Book } from "../hooks/useBooks";
import BookCard from "./BookCard";
import { Genre } from "../hooks/useGenres";
import { Author } from "../hooks/useAuthors";

interface Props {
  Books: Book[];
  selectedGenre: Genre | null;
  selectedAuthor: Author | null;
  available: boolean | null;
}

const BookGrid = ({ Books, selectedGenre, selectedAuthor, available }: Props) => {
  const filteredBooks = Books.filter(
    (book) =>
      (!selectedGenre || book.genre === selectedGenre.name) &&
      (!selectedAuthor || book.author === selectedAuthor.name) &&
      (available == null  || book.available === available)

  );

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, lg: 6 }}
        mt="17px"
        padding="15px"
        spacing={7}
      >
        {filteredBooks.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`}>
            <BookCard book={book} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BookGrid;
