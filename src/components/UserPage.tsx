import {
  Card,
  CardBody,
  Heading,
  Text,
  Flex,
  Box,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import UserPageContainer from "./UserPageContainer";
import {useEffect, useState} from "react";
import { Book, getBooks } from "../hooks/useBooks";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import BookCard from "./BookCard";

const UserPage = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#543310" : "#F8F4E1";
  const textColor = colorMode === "dark" ? "#F8F4E1" : "#543310";
  const cardBgColor = colorMode === "dark" ? "#74512D" : "#AF8F6F";
  const booksBgColor = colorMode === "dark" ? "#AF8F6F" : "#F8F4E1";

  const username = Cookies.get("username");

  const [borrowedBookList, setBorrowedBookList] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(response => {
      setBorrowedBookList(response.filter(book => book.getBorrowedBy() === username));
    });
  }, []);


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

            <Text fontWeight="bold" marginBottom="4" color={textColor}>
              Borrowed Books
            </Text>

            <SimpleGrid
                columns={{ sm: 1, lg: 6 }}
                mt="17px"
                padding="15px"
                spacing={7}
            >
              {borrowedBookList.map((book) => (
                  <Link key={book.id} to={`/book/${book.id}`}>
                    <BookCard book={book} />
                  </Link>
              ))}
            </SimpleGrid>
          </CardBody>
        </Flex>
      </Card>
    </UserPageContainer>
  );
};

export default UserPage;
