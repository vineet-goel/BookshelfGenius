import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import BookGrid from "./components/BookGrid";
import SignUpPage from "./components/SignUpPage";
import BookPage from "./components/BookPage";
import UserPage from "./components/UserPage";
import useBooks, {Book, getBooks} from "./hooks/useBooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenreList from "./components/GenreList";
import AuthorList from "./components/AuthorList";
import { Genre } from "./hooks/useGenres";
import { Author } from "./hooks/useAuthors";
import {useEffect, useState} from "react";

function App() {
  // const { books } = useBooks();
  const [books, setBooks] = useState<Book[]>();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getBooks().then(response => {
      setFilteredBooks(response.filter(
          (book) =>
              (!selectedGenre || book.genre === selectedGenre.name) &&
              (!selectedAuthor || book.author === selectedAuthor.name) &&
              (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  book.author.toLowerCase().includes(searchQuery.toLowerCase()))
      ));
    });

  }, []);

  return (
    <Router>
      <Grid
        templateAreas={'"nav nav" "aside main"'}
        templateColumns={"150px 1fr"}
      >
        <GridItem area="nav" bg="#F8F4E1">
          <NavBar onSearch={(searchText) => setSearchQuery(searchText)} />
        </GridItem>
        <GridItem area="aside" paddingX="4" paddingY="7">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <GenreList
                    selectedGenre={selectedGenre}
                    onSelectedGenre={(genre) => setSelectedGenre(genre)}
                  />
                  <AuthorList
                    selectedAuthor={selectedAuthor}
                    onSelectedAuthor={(author) => setSelectedAuthor(author)}
                  />
                </>
              }
            />
          </Routes>
        </GridItem>
        <GridItem area="main">
          <Routes>
            <Route
              path="/"
              element={
                <BookGrid
                  Books={filteredBooks}
                  selectedGenre={selectedGenre}
                  selectedAuthor={selectedAuthor}
                  available={null}
                />
              }
            />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
