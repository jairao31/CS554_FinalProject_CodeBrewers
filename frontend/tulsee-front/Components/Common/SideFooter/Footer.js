import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import styled from "styled-components";
// const Footer = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const isDark = colorMode === "dark";
//   return (
//     <div>
//       <IconButton
//         marginBottom={"120px"}
//         ml={3}
//         boxShadow="dark-lg"
//         icon={isDark ? <FaSun /> : <FaMoon />}
//         isRound="true"
//         onClick={toggleColorMode}
//       ></IconButton>
//     </div>
//   );
// };

// export default Footer;

export const Box = styled.div`
  //   padding: 10px;
  background: transparent;
  position: absolute;
  bottom: 0;
  //   width: 10%;
  display: grid;
`;

export const FooterLink = styled.a`
  margin-bottom: 20px;
  //   font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box>
      <FooterLink href="#">
        <IconButton
          color={"white"}
          ml={"1px"}
          boxShadow={isDark ? "0px 0px 16px 2px white" : "dark-lg"}
          icon={isDark ? <FaSun /> : <FaMoon />}
          isRound="true"
          onClick={toggleColorMode}
        ></IconButton>

        {/* <i>
            <span
              color={isDark ? "black" : "white"}
              style={{ marginLeft: "10px" }}
            >
              About Us
              <FcAbout size={"20px"} />
            </span>
          </i> */}
      </FooterLink>
      {/* </Column> */}
    </Box>
  );
};
export default Footer;
