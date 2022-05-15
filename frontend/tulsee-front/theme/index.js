import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const overrides = {
  styles:{
    global:()=>({
      '.chakra-form__required-indicator':{
        color:'#e22d2d!important'
      },
      '.chakra-form__helper-text':{
        color:'#67788f!important'
      }
    }),
  },

  fonts: {
    heading: "Lato, sans-serif",
    body: "Lato, sans-serif",
  },
  colors: {
    brand: {
        50:'FFFFFF',
      100: "#E5E3C9",
      300: "#B4CFB0",
      500: "#45B39D",
      700: "#008268",
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
        size: "md",
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
          borderColor:'brand.700',
          _hover:{
            backgroundColor:'rgba(180, 207, 176,0.3)'
          }
        },
        'solid': {
          backgroundColor:'#148F77',
          _hover:{
            backgroundColor:'#73C6B6'
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
    },
    Input:{
      asterisk:{
        color:'black'
      }
    }
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "brand" })
);
