import React, { useContext, useState } from 'react';
import {
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
  import {MdEmail} from "react-icons/md";
  import {RiLockPasswordFill} from "react-icons/ri";
import { UserContext } from '../Contexts/UserContext';

const LoginForm = () => {
    const [details, setDetails] = useState({
      email:"",
      password:""
    });

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {loginUser} = useContext(UserContext)

    const handleChange = e => {
      const {name,value} = e.target;
      setDetails(prev => {
        return {
          ...prev,
          [name]: value
        }
      })
    }

    const handleSubmit = e => {
      e.preventDefault()
      loginUser(details);
      setDetails({})
    }

    return (
        <form action='submit' onSubmit={handleSubmit}>
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
                  value={details.password || ""}
                  name="password"
                  onChange={handleChange}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
  
            <Button type='submit' boxShadow={'dark-lg'} className="button" variant="solid">
              Login
            </Button>
            <FormLabel>Welcome Home! 🏡</FormLabel>
          </Stack>
        </form>
    );
};

export default LoginForm;