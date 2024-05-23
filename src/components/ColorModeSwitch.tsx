import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        sx={{
          ".chakra-switch__track": {
            backgroundColor: colorMode === "dark" ? "#543310" : "#F8F4E1",
          },
          ".chakra-switch__thumb": {
            backgroundColor: colorMode === "dark" ? "#F8F4E1" : "#543310",
          },
        }}
      />
      <Text color="#52322D" whiteSpace="nowrap" fontSize={"s"} padding={2}>
        Dark Mode
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
