// import styles from "../styles/Home.module.css";
import {
  Box,
  Text,
  VStack,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Skeleton,
  useColorModeValue,
  Link,
  IconButton,
  Flex,
  Container,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import {
  Button,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon, FaGithub } from "react-icons/fa";
import RegisterForm from "../../Components/Register/RegisterForm";
import LoginForm from "../../Components/Login/loginForm";
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
      <Flex w={'45%'} bg={'#45B39D'} direction={'column'} justifyContent='center'>
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
          my='auto'
            // bgGradient={isDark ?["linear(to-tr, teal.300, yellow.400)"]: "linear(to-t, green.200, pink.500)"}
            boxShadow='md'
            // bgGradient="linear(to-t, green.200, pink.500)"
            // bgGradient="radial(gray.300, yellow.400, pink.200)"
            // bg= {isDark ? "gray.400"  : "gray.600"}
            // bg={toggleColorMode === "light" ? "gray.200" : "gray.300"}
            w="385px"
            p={3}
            // boxShadow="sm"
            rounded="lg"
          >
          <Center>
            {/* <Image src={''} w="120px" mx={"auto"} my={5} /> */}
          </Center>
          {/*USE THIS FEATURE IN TABS:  colorScheme='green' onChange={(index) => setTabIndex(index)} bg={bg} */}

          <Tabs  variant={"solid-rounded"} isFitted m={4}>
            <TabList gap={2} mb={2}>
              <Tab _selected={{ color: 'white', bg: '#45B39D' }} boxShadow={'md'}>Sign Up</Tab>
              <Tab _selected={{ color: 'white', bg: '#45B39D' }} boxShadow={'md'} >Login</Tab>
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
      </Flex>
    </Flex>


    // <div className={styles.container}>
    // <VStack p={5}>
    //   <Flex>
    //     <IconButton
          
    //       icon={<FaGithub />}
    //       isRound="true"
    //       onClick={toggleColorMode}
    //       //MAKE Chages in this onclick
    //     ></IconButton>
    //     <IconButton
    //     ml={3}
    //     boxShadow="dark-lg"
    //       icon={isDark ? <FaSun /> : <FaMoon />}
    //       isRound="true"
    //       onClick={toggleColorMode}
    //     ></IconButton>
    //   </Flex>
    //   <Center><img src="\Logo1.png" width={70} height={70}/>
    //     <Text
    //       className='typeWriter'
    //       bgGradient="linear(to-l, red, green)"
    //       bgClip="text"
    //       fontSize="6xl"
    //       fontWeight="extrabold"
    //     >
    //       TULSEE
    //     </Text>
    //   </Center>
    //   {/* <Skeleton startColor="pink.500" endColor="orange.500" height="20px" /> */}
    //   <Center>
        // <Box 
        //   // bgGradient={isDark ?["linear(to-tr, teal.300, yellow.400)"]: "linear(to-t, green.200, pink.500)"}
        //   boxShadow="dark-lg"
        //   // bgGradient="linear(to-t, green.200, pink.500)"
        //   // bgGradient="radial(gray.300, yellow.400, pink.200)"
        //   bg= {isDark ? "gray.400"  : "gray.600"}
        //   // bg={toggleColorMode === "light" ? "gray.200" : "gray.300"}
        //   w="385px"
        //   p={3}
        //   // boxShadow="sm"
        //   rounded="lg"
        // >
        // <Center>
        //   {/* <Image src={''} w="120px" mx={"auto"} my={5} /> */}
        // </Center>
        // {/*USE THIS FEATURE IN TABS:  colorScheme='green' onChange={(index) => setTabIndex(index)} bg={bg} */}

        // <Tabs  colorScheme='green'  variant={"soft-rounded"} isFitted m={4}>
        //   <TabList >
        //     <Tab boxShadow={'lg'} color={isDark ? ''  : 'white'}>Sign Up</Tab>
        //     <Tab boxShadow={'lg'} color={isDark ? ''  : 'white'}>Login</Tab>
        //   </TabList>
        //   <TabPanels>
        //     <TabPanel>
        //       <RegisterForm/>
        //     </TabPanel>
        //     <TabPanel>
        //       <LoginForm />
        //     </TabPanel>
        //   </TabPanels>
        // </Tabs>
        // </Box>
    //   </Center>
    //   {/* </div> */}
    // </VStack>
  );
}

// w={['full', 'md']}
// p= {[8, 10]}
// mt={[20, '10vh']}
// mx='auto'
// border={['none', '1px']}
// borderColor={['', 'gray.300']}
// borderRadius= {10}
