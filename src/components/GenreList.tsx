import useGenres, { Genre } from "../hooks/useGenres";
import {
  Box,
  HStack,
  List,
  ListItem,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  onSelectedGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectedGenre }: Props) => {
  const genres = useGenres();
  const bgColor = useColorModeValue("#74512D", "#AF8F6F");
  const textColor = useColorModeValue("#F8F4E1", "#543310");
  const buttonColor = useColorModeValue("#F8F4E1", "#543310");

  return (
    <Box
      width="130px"
      borderRadius={5}
      bg={bgColor}
      color={textColor}
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
                color={buttonColor}
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
