import { Center, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "/src/assets/bgn.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" padding="10px">
      <Link to="/">
        {" "}
        {/* Link to the main page */}
        <HStack spacing={2}>
          <Image src={logo} boxSize="75px" />
          <Text fontSize={"l"} fontWeight="bold" color="#52322D">
            Bookshelf Genius
          </Text>
        </HStack>
      </Link>

      <HStack>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
        <Link to="/signup">
          {" "}
          {/* Use Link component for navigation */}
          <Button
            mr={4}
            bg="#cfcbbc"
            color="#52322D"
            padding="20px"
            borderRadius={10}
          >
            Sign Up
          </Button>
        </Link>
      </HStack>
    </Flex>
  );
};

export default NavBar;
