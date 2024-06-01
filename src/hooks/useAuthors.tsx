import useBooks, {getBooks} from "./useBooks";
import {useEffect, useState} from "react";

export interface Author {
  name: string;
}

const useAuthors = (): Author[] => {

  const [authors, setAuthors] = useState<String[]>([]);
  const [authorObjects, setAuthorObjects] = useState<any>([]);


  useEffect(() => {
    getBooks().then(response => {
      setAuthors(Array.from(
          new Set(response.map((book) => book.author))
      ).sort());
    });
  }, []);


  useEffect(() => {
    var map = authors.map((author) => ({name: author}));
    setAuthorObjects(map)
  }, [authors]);

  return authorObjects;
};

export default useAuthors;
