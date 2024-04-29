import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import BookGrid from "./components/BookGrid";
import SignUpPage from "./components/SignUpPage";
import BookPage from "./components/BookPage";
import useBooks, { Book } from "./hooks/useBooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import { useState } from "react";

function App() {
  const { books } = useBooks();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBooks = books.filter(
    (book) =>
      (!selectedGenre || book.genre === selectedGenre.name) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Router>
      <Grid
        templateAreas={'"nav nav" "aside main"'}
        templateColumns={"150px 1fr"}
      >
        <GridItem area="nav" bg="#EDE9D8">
          <NavBar
            onSearch={(searchText) => setSearchQuery(searchText)}
          ></NavBar>
        </GridItem>
        <GridItem area="aside" paddingX="4" paddingY="7">
          <Routes>
            <Route
              path="/"
              element={
                <GenreList
                  selectedGenre={selectedGenre}
                  onSelectedGenre={(genre) => setSelectedGenre(genre)}
                />
              }
            />{" "}
            {/* Route for the main page */}
          </Routes>
        </GridItem>
        <GridItem area="main">
          <Routes>
            <Route
              path="/"
              element={
                <BookGrid Books={filteredBooks} selectedGenre={selectedGenre} />
              }
            />{" "}
            {/* Route for the main page */}
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/signup" element={<SignUpPage />} />{" "}
            {/* Route for the sign-up page */}
          </Routes>
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
