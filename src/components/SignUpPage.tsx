import { useState } from "react";
import Cookies from "js-cookie";

import {
  Box,
  Input,
  Button,
  VStack,
  Image,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logog from "/src/assets/bgenius.png";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const addUser = async (username: string, email: string, password: string) => {
    await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    addUser(username, email, password)
        .then(data => {
          Cookies.set('username', username)
          navigate("/user");
        })
        .catch(err => {
          alert("Not able to add user. Please try later");
        })
    ;
  };

  const bgColor = useColorModeValue("lightModeBg", "darkModeBg");
  const formBgColor = useColorModeValue("#AF8F6F", "#74512D");
  const inputBgColor = useColorModeValue("#F8F4E1", "#AF8F6F");
  const buttonBgColor = useColorModeValue("#543310", "#F8F4E1");
  const buttonTextColor = useColorModeValue("#F8F4E1", "#543310");
  const textColor = useColorModeValue("#52322D", "#F8F4E1");

  return (
    <Box
      bg={bgColor}
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius={5}
      marginLeft="auto"
      marginRight={150}
      marginBottom={10}
    >
      {/* Logo and Form */}
      <Flex justifyContent="center" alignItems="center" marginBottom={10}>
        {/* Logo */}
        <Box mr="4">
          <Image src={logog} boxSize="350px" />
        </Box>

        {/* Sign-up form */}
        <Box
          w="400px"
          p="8"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          bg={formBgColor}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing="4">
              {/* Form inputs */}
              <Input
                bg={inputBgColor}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                _focus={{
                  borderColor: "#F8F4E1", // Set the focus border color
                }}
              />
              <Input
                bg={inputBgColor}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                _focus={{
                  borderColor: "#F8F4E1", // Set the focus border color
                }}
              />
              <Input
                bg={inputBgColor}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                _focus={{
                  borderColor: "#F8F4E1", // Set the focus border color
                }}
              />
              <Input
                bg={inputBgColor}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                _focus={{
                  borderColor: "#F8F4E1", // Set the focus border color
                }}
              />

              {/* Sign Up button */}
              <Button
                type="submit"
                bg={buttonBgColor}
                color={buttonTextColor}
                padding="20px"
                borderRadius={10}
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>

      {/* Text */}
      <Text marginTop="20px" color={textColor} fontSize={"m"}>
        "A reader lives a thousand lives before he dies."{" "}
        <i>George R. R. Martin,</i> <i>A Dance with Dragons</i>
      </Text>
    </Box>
  );
}

export default SignUpPage;
