import useGenres, { Genre } from "../hooks/useGenres";
import { Box, HStack, List, ListItem, Text, Button } from "@chakra-ui/react";

interface Props {
  onSelectedGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectedGenre }: Props) => {
  const genres = useGenres();

  return (
    <Box
      width=" 130px"
      borderRadius={5}
      bg="#EDE9D8"
      color="#52322D"
      pt="5px"
      paddingX="10px"
    >
      <List>
        <Text
          fontSize={"xl"}
          fontWeight="bold"
          paddingY="5px"
          cursor="pointer"
          onClick={() => onSelectedGenre(null)}
        >
          Genres
        </Text>
        <Text fontWeight="bold">---------</Text>
        {genres.map((genre) => (
          <ListItem key={genre.name} paddingY="10px">
            <HStack>
              <Button
                fontWeight={
                  genre.name === selectedGenre?.name ? "bold" : "normal"
                }
                onClick={() => onSelectedGenre(genre)}
                color="#52322D"
                variant="link"
                fontSize={"l"}
                paddingY="4px"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
