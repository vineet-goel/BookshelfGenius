import {
  Box,
  Input,
  Button,
  VStack,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import logog from "/src/assets/bgn.png";

function SignUpPage() {
  return (
    <>
      <Box
        bg="#EDE9D8"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius={5}
        marginTop={10}
        marginRight={20}
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
            bg="#cfcbbc"
          >
            <VStack spacing="4">
              {/* Form inputs */}
              <Input bg="#52322D" placeholder="Username" />
              <Input bg="#52322D" placeholder="Email" type="email" />
              <Input bg="#52322D" placeholder="Password" type="password" />
              <Input
                color="#52322D"
                bg="#52322D"
                placeholder="Confirm Password"
                type="password"
              />

              {/* Sign Up button */}
              <Button
                bg="#cfcbbc"
                color="#52322D"
                padding="20px"
                borderRadius={10}
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        </Flex>

        {/* Text */}
        <Text marginTop="20px" color="#52322D" fontSize={"m"}>
          "A reader lives a thousand lives before he dies."{" "}
          <i>George R. R. Martin,</i> <i>A Dance with Dragons</i>
        </Text>
      </Box>
    </>
  );
}

export default SignUpPage;
