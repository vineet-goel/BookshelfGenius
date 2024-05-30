import { HStack, Image, Text, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/bgenius.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import Cookies from "js-cookie";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const isUserPage = location.pathname === "/user";
  const username = Cookies.get("username");

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      bg="#AF8F6F"
      position="relative"
    >
      <Link to="/">
        <HStack spacing={2}>
          <Image src={logo} boxSize="75px" />
          <Text fontSize={"l"} fontWeight="bold" color="#543310">
            Bookshelf Genius
          </Text>
        </HStack>
      </Link>

      <HStack>
        {isMainPage && <SearchInput onSearch={onSearch} />}
        <ColorModeSwitch />
        <Link to="/signup">
          {isMainPage && !username && (
            <Button
              mr={4}
              bg="#74512D"
              color="#F8F4E1"
              padding="20px"
              borderRadius={10}
            >
              Sign Up
            </Button>
          )}
        </Link>

        <Link to="/user">
          {!!username && (
              <Button
                  mr={4}
                  bg="#74512D"
                  color="#F8F4E1"
                  padding="20px"
                  borderRadius={10}
              >
                {username}
              </Button>
          )}
        </Link>

      </HStack>

      {/* Add the bold brown line */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="2px"
        bg="#543310"
        fontWeight="bold"
      />
    </Flex>
  );
};

export default NavBar;
