import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },

  fonts: {
    heading: "Hubot Sans",
    body: "Hubot Sans",
  },

  breakpoints: {
    sm: "486px",
    md: "850px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },

  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("yellow.50", "gray.800")(props),
        h: "100vh",
      },
    }),
  },
};

export default extendTheme(theme);
