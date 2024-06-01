import useBooks, {getBooks} from "./useBooks";
import {useEffect, useState} from "react";

export interface Genre {
  name: string;
}

const useGenres = (): Genre[] => {

  const [genres, setGenres] = useState<String[]>([]);
  const [genreObjects, setGenreObjects] = useState<any>([]);

  useEffect(() => {
    getBooks().then(response => {
      setGenres(Array.from(
          new Set(response.map((book) => book.genre))
      ).sort());
    });
  }, []);

  useEffect(() => {
    var map = genres.map((genre) => ({name: genre}));
    setGenreObjects(map)
  }, [genres]);


  return genreObjects;
};

export default useGenres;
