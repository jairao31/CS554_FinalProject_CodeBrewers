import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
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
import {MdEmail} from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import {RiLockPasswordFill} from "react-icons/ri";
// import { Checkbox, CheckboxGroup } from "@chakra-ui/react/dist/declarations/src";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
const Register = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Box>
      <form action="submit">
        <Stack spacing={3}>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children={<IoInformationCircle />} />
              <Input
                background={"white"}
                type="name"
                placeholder="First Name"
                aria-label="First Name"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children={<IoInformationCircle />} />
              <Input
                background={"white"}
                type={"name"}
                placeholder="Last Name"
                aria-label="Lasts Name"
              />
            </InputGroup>
          </FormControl>
          <Divider borderColor={"gray.500"} />
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
                background={"white"}
                type={show ? 'text' : 'password'}
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
          <Checkbox color={'white'} colorScheme={'green'}> Remember Me </Checkbox>
          <Button
            className="button"
            type="submit"
            variant="solid"
            boxShadow={'dark-lg'}
            // boxShadow={'rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px, rgba(44, 187, 99, 0.25) 0 16px 32px'}
            // isLoading
            loadingText="Signing Up"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;