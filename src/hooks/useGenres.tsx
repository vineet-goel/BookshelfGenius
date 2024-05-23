import useBooks from "./useBooks";

export interface Genre {
  name: string;
}

const useGenres = (): Genre[] => {
  const { books } = useBooks();

  const genres: string[] = Array.from(
    new Set(books.map((book) => book.genre))
  ).sort();

  const genreObjects: Genre[] = genres.map((genre) => ({ name: genre }));

  return genreObjects;
};

export default useGenres;
