import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "#543310" : "#F8F4E1",
      },
    }),
  },
  colors: {
    lightModeBg: "#F8F4E1",
    darkModeBg: "#543310",
    lightModePrimary: "#543310",
    darkModePrimary: "#F8F4E1",
    brown: {
      200: "#543310", 
    },
  },
  components: {
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: "#F8F4E1", // Change focus border color
              boxShadow: "0 0 0 1px #F8F4E1", // Change focus box shadow
            },
          },
        },
      },
    },
  },
});

export default theme;