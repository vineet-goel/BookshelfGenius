import useAuthors, { Author } from "../hooks/useAuthors";
import {
  Box,
  HStack,
  List,
  ListItem,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onSelectedAuthor: (author: Author | null) => void;
  selectedAuthor: Author | null;
}

const AuthorList = ({ selectedAuthor, onSelectedAuthor }: Props) => {
  const authors = useAuthors();
  const bgColor = useColorModeValue("#74512D", "#AF8F6F");
  const textColor = useColorModeValue("#F8F4E1", "#543310");
  const buttonColor = useColorModeValue("#F8F4E1", "#543310");
  const [isAuthorListVisible, setIsAuthorListVisible] = useState(false); // State to toggle author list visibility

  return (
    <Box
      width="130px"
      borderRadius={5}
      bg={bgColor}
      color={textColor}
      pt="5px"
      paddingX="10px"
      mt="10px"
    >
      <List>
        <Text
          fontSize={"xl"}
          fontWeight="bold"
          paddingY="5px"
          cursor="pointer"
          onClick={() => onSelectedAuthor(null)}
        >
          Authors
        </Text>
        <Text
          fontWeight="bold"
          cursor="pointer" // Add cursor pointer to indicate it's clickable
          onClick={() => setIsAuthorListVisible(!isAuthorListVisible)} // Toggle author list visibility
          _hover={{ color: "#74512D" }} // Change text color on hover
          title="Click to expand" // Add tooltip message
        >
          ---------{" "}
        </Text>
        {isAuthorListVisible &&
          authors.map(
            (
              author // Conditionally render the author list
            ) => (
              <ListItem key={author.name} paddingY="5px">
                <HStack>
                  <Button
                    fontWeight={
                      author.name === selectedAuthor?.name ? "bold" : "normal"
                    }
                    onClick={() => onSelectedAuthor(author)}
                    color={buttonColor}
                    variant="link"
                    fontSize={"xs"}
                    paddingY="4px"
                    justifyContent={"flex-start"}
                    textAlign={"left"}
                    whiteSpace={"normal"}
                  >
                    {author.name}
                  </Button>
                </HStack>
              </ListItem>
            )
          )}
      </List>
    </Box>
  );
};

export default AuthorList;
