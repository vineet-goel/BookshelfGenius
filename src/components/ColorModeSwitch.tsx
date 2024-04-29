import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="#5F370E"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      ></Switch>
      <Text color="#52322D" whiteSpace="nowrap" fontSize={"s"} padding={2}>
        Dark Mode
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
