import useBooks from "./useBooks";

export interface Author {
  name: string;
}

const useAuthors = (): Author[] => {
  const { books } = useBooks();

  const authors: string[] = Array.from(
    new Set(books.map((book) => book.author))
  ).sort();

  const authorObjects: Author[] = authors.map((author) => ({ name: author }));

  return authorObjects;
};

export default useAuthors;
