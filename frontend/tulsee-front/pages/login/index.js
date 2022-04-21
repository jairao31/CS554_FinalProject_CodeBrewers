import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    StylesProvider,
    InputRightElement
  } from "@chakra-ui/react";
  import React from "react";
  // import {
  //   InfoIcon,
  //   EmailIcon,
  //   LockIcon,
  //   AddIcon,
  //   WarningIcon,
  // } from "@chakra-ui/icons";
  import { IoInformationCircle } from "react-icons/io5";
  import {MdEmail} from "react-icons/md";
  import {RiLockPasswordFill} from "react-icons/ri";
  
  const Login = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
      <Box>
        <form action="submit">
          <Stack spacing={3}>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftAddon children={<MdEmail />} />
                <Input
                  background={"white"}
                  type={"email"}
                  placeholder="Email"
                  aria-label="Email"
                />
              </InputGroup>
              <FormHelperText
                textAlign={"center"}
                boxShadow="sl"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                We will never share your email!🤞
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftAddon children={<RiLockPasswordFill />} />
                <Input
                  type={show ? 'text' : 'password'}
                  background={"white"}
                  
                  placeholder="Password"
                  aria-label="Password"
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
  
            <Button boxShadow={'dark-lg'} className="button" type="submit" variant="solid">
              Login
            </Button>
            <FormLabel>Welcome Home! 🏡</FormLabel>
          </Stack>
        </form>
      </Box>
    );
  };
  
  export default Login;
  