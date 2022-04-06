import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const overrides = {
  fonts: {
    heading: "Lato, sans-serif",
    body: "Lato, sans-serif",
  },
  colors: {
    brand: {
        50:'FFFFFF',
      100: "#E5E3C9",
      300: "#B4CFB0",
      500: "#94B49F",
      700: "#789395",
      900: "#000000",
    },
  },
  components: {
    Select: {
      parts: [],
      // The base styles for each part
      baseStyle: {},
      // The size styles for each part
      sizes: {},
      // The variant styles for each part
      variants: {},
      // The default `size` or `variant` values
      defaultProps: {
        size: "lg",
        focusBorderColor: "brand.900",
      },
    },
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "brand" })
);
