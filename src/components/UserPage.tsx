import {
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import UserPageContainer from "./UserPageContainer";

const UserPage = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#543310" : "#F8F4E1";
  const textColor = colorMode === "dark" ? "#F8F4E1" : "#543310";
  const cardBgColor = colorMode === "dark" ? "#74512D" : "#AF8F6F";
  const booksBgColor = colorMode === "dark" ? "#AF8F6F" : "#F8F4E1";

  return (
    <UserPageContainer bgColor={bgColor} textColor={textColor}>
      <Card marginRight={10} marginTop={5} marginBottom={15} bg={cardBgColor}>
        <Flex>
          <Box
            borderRadius={10}
            overflow="hidden"
            boxSize={{ width: "150px", height: "200px" }}
            marginLeft={5}
            marginTop={5}
            marginBottom={10}
            minWidth="fit-content"
          ></Box>
          <CardBody marginRight={10}>
            <Heading
              fontSize="2xl"
              marginY="5"
              color={textColor}
              textAlign={"right"}
            >
              Bellgin13
            </Heading>

            <Text fontWeight="bold" marginBottom="4" color={textColor}>
              Favorite Books
            </Text>
            {/* Box for Favorite Books */}
            <Box
              bg={booksBgColor}
              p={4}
              borderRadius={8}
              marginBottom={4}
              width={"800px"}
              height={"200px"}
            >
              {/* Add your content for Favorite Books here */}
            </Box>

            <Text fontWeight="bold" marginBottom="4" color={textColor}>
              Borrowed Books
            </Text>
            {/* Box for Borrowed Books */}
            <Box
              bg={booksBgColor}
              p={4}
              borderRadius={8}
              width={"800px"}
              height={"200px"}
            >
              {/* Add your content for Borrowed Books here */}
            </Box>
          </CardBody>
        </Flex>
      </Card>
    </UserPageContainer>
  );
};

export default UserPage;
