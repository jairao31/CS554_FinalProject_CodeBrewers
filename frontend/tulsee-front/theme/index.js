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
        focusBorderColor: "brand.900"
      },
    },
    Input:{
      baseStyle:{
        color: "brand.900"
      }
    },
    Button: {
      baseStyle:{
        fontWeight: '500',
        color:"brand.700"
      },
      variants: {
        'ghost' : {
          _hover:{
            backgroundColor:'rgba(180, 207, 176,0.3)'
          }
        },
        'outline' : {
          borderColor:'#789395',
          _hover:{
            backgroundColor:'rgba(180, 207, 176,0.3)'
          }
        },
        'solid': {
          backgroundColor:'#789395',
          _hover:{
            backgroundColor:'#94B49F'
          }
        }
      }
    },
    IconButton:{
      defaultProps:{
        textColor:"brand.700",
      },
      variants:{
        'ghost':{
          _hover:{
            color: 'black!important',
            backgroundColor:'rgba(180, 207, 176,0.2)'
          }
        }
      }
    }
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "brand" })
);
