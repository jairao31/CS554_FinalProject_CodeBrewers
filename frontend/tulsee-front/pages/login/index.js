
import {
  Box,
  Text,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Flex,
  Divider,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import RegisterForm from "../../Components/Register/RegisterForm";
import LoginForm from "../../Components/Login/LoginForm";
import { UserContext } from "../../Components/Contexts/UserContext";


export default function Login() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const router = useRouter();
  const isDark = colorMode === "dark";
  const colors = useColorModeValue(
    ['red.50', 'teal.50'],
    ['red.100', 'teal.100'],
  )
  const [tabIndex, setTabIndex] = React.useState(0)
  const bg = colors[tabIndex]

  const {UserDetails} = useContext(UserContext)

    const {push} = useRouter()

    useEffect(() => {
      if(UserDetails) push('/')
    },[UserDetails])

  return (

    <Flex h={'100vh'}>
      <Flex w={'45%'} bg={'#00a88f'} direction={'column'} justifyContent='center'>
        <Flex p='0 50px' justifyContent={'center'}>
          <Box>
            <Text fontWeight={800} color='white' fontSize={'4xl'}>
              T<span style={{fontSize:'25px',color:'black'}}>eam</span>
            </Text>
            <Text fontWeight={800} color='white' fontSize={'4xl'} >
              U<span style={{fontSize:'25px',color:'black'}}>p {' &'}</span>
            </Text>
            <Text fontWeight={800} color='white' fontSize={'4xl'}>
              L<span style={{fontSize:'25px',color:'black'}}>ets</span>
            </Text>
            <Text fontWeight={800} color='white' fontSize={'4xl'}>
              S<span style={{fontSize:'25px',color:'black'}}>ynergize</span>
            </Text>
            <Text fontWeight={800} color='white' fontSize={'4xl'}>
              E<span style={{fontSize:'25px',color:'black'}}>verything for</span>
            </Text>
            <Text fontWeight={800} color='white' fontSize={'4xl'}>
              E<span style={{fontSize:'25px',color:'black'}}>veryone</span>
            </Text>
          </Box>
          <Image
            mx='auto'
            w='300px'
            src='./login_poster.svg'
            alt='login_image'
          />
        </Flex>
      </Flex>
      <Flex direction={'column'} justifyContent='center' w={'55%'}>
        <Box 
          mx={'auto'}
          mt='auto'
          mb='20px'
            boxShadow='md'
            w="385px"
            p={3}
            rounded="lg"
          >
          <Tabs  variant={"solid-rounded"} isFitted m={4}>
            <TabList gap={2} mb={2}>
              <Tab _selected={{ color: 'white', bg: 'brand.700' }} boxShadow={'md'}>Sign Up</Tab>
              <Tab _selected={{ color: 'white', bg: 'brand.700' }} boxShadow={'md'} >Login</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RegisterForm/>
              </TabPanel>
              <TabPanel>
                <LoginForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Box>
        <HStack 
          mb='auto'   
          w="385px"
          mx='auto'
          justifyContent={'center'}
          mt='20px'
        >
          <Link href='/team'>Made with ❤️ by CodeBrewers</Link>
        </HStack>
      </Flex>
    </Flex>

  );
}
