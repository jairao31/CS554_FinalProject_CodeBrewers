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
  InputRightElement,
  Checkbox,
  useToast,
  Text,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { UserContext } from "../Contexts/UserContext";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [details, setDetails] = useState({});
  const handleClick = () => setShow(!show);
  const handleConfirmShow = () => setConfirmShow(!confirmShow);

  const toast = useToast()

  const { createUser, googleSignIn, isLoggingIn, isRegistering } = useContext(UserContext);

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
    let request = details;
    const {firstName,lastName,email,password,confirmPassword} = request
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({title:"Please fill all the fields", status:'warning', duration: 2000});
      return
    }
    if(firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
      toast({title:"Please fill all the fields", status:'warning', duration: 2000});
      return
    }

    if(password.length < 6 || confirmPassword.length < 6) {
      toast({title:"Passwords should be atleast 6 characters long!", status:'warning', duration: 2000});
      return
    }

    if(password !== confirmPassword) {
      toast({title:"Both passwords should match", status:'warning', duration: 2000});
      return
    }

    delete request.confirmPassword;
    createUser(request);
    setDetails({});
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<IoInformationCircle />} />
            <Input
              type="name"
              placeholder="First Name"
              aria-label="First Name"
              name="firstName"
              onChange={handleChange}
              value={details.firstName || ""}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<IoInformationCircle />} />
            <Input
              type={"name"}
              placeholder="Last Name"
              aria-label="Lasts Name"
              name="lastName"
              onChange={handleChange}
              value={details.lastName || ""}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<MdEmail />} />
            <Input
              type={"email"}
              placeholder="Email"
              aria-label="Email"
              name="email"
              onChange={handleChange}
              value={details.email || ""}
            />
          </InputGroup>
          <FormHelperText
            color='#67788f'
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
              placeholder="Password"
              aria-label="Password"
              name="password"
              onChange={handleChange}
              value={details.password || ""}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" backgroundColor={'brand.700'} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children={<RiLockPasswordFill />} />
            <Input
              type={confirmShow ? "text" : "password"}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={details.confirmPassword || ""}
            />
            <InputRightElement width="4.5rem">
              <Button backgroundColor={'brand.700'} h="1.75rem" size="sm" bac onClick={handleConfirmShow}>
                {confirmShow ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* <Checkbox color={'white'} colorScheme={'green'} onClick={() =>setCookies}> Remember Me </Checkbox> */}
        <Button
          backgroundColor={'brand.700'} 
          className="button"
          type="submit"
          variant="solid"
          // boxShadow={'rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px, rgba(44, 187, 99, 0.25) 0 16px 32px'}
          isLoading={isRegistering}
          loadingText="Signing Up"
        >
          Sign Up
        </Button>
        <Text textAlign={'center'}> OR </Text>
        <Button variant={'outline'} isLoading={isLoggingIn || isRegistering} leftIcon={<FcGoogle/>} onClick={() => googleSignIn()}>Sign up with google</Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
