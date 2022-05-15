import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Checkbox,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { UserContext } from "../Contexts/UserContext";
import {FcGoogle} from 'react-icons/fc'



const LoginForm = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { loginUser, googleSignIn, isLoggingIn, isRegistering } = useContext(UserContext);
  const toast = useToast()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {email,password} = details;
    if(email.trim().length === 0 || password.trim().length === 0) {
      toast({title:'Please fill all the fields', status: 'warning', duration: 2000});
      return
    }
    loginUser(details);
    setDetails({});
  };
  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<MdEmail />} />
            <Input
              background={"white"}
              type={"email"}
              placeholder="Email"
              aria-label="Email"
              value={details.email || ""}
              name="email"
              onChange={handleChange}
            />
          </InputGroup>
          <FormHelperText
            textAlign={"center"}
            boxShadow="sl"
          >
            We will never share your email!🤞
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<RiLockPasswordFill />} />
            <Input
              type={show ? "text" : "password"}
              background={"white"}
              placeholder="Password"
              aria-label="Password"
              value={details.password || ""}
              name="password"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button backgroundColor={'brand.700'}  h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* <Checkbox color={"white"} name="rememberMe" colorScheme={"green"}>
          {" "}
          Remember Me{" "}
        </Checkbox> */}
        <Button backgroundColor={'brand.700'}  type="submit" bg={"brand.500"} variant="solid">
          Login
        </Button>
        <Text textAlign={'center'}> OR </Text>
        <Button variant={'outline'} isLoading={isLoggingIn || isRegistering} leftIcon={<FcGoogle/>} onClick={() => googleSignIn()}>Login with google</Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
