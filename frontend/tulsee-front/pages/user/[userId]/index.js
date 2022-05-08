import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../Components/Common/layout";
import TopNavBar from "../../../Components/Common/TopNavBar";
import { UserContext } from "../../../Components/Contexts/UserContext";
import {useGetUser} from '../../../api/user/getUser';

import {
  Container,
  Flex,
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const User = () => {

  const [data, setData] = useState({})

  const {query} = useRouter();

  const {userId} = query

  const { UserDetails } = useContext(UserContext);

  const {data: user} = useGetUser(userId, !!userId)

  useEffect(() => {
    if(!userId || !user || !UserDetails) return
    if(userId === UserDetails.publicId) {
      setData(UserDetails)
    }else{
      setData(user)
    }
  },[userId,user,UserDetails])


  return (
    <Layout>
      <TopNavBar title="User Profile" />

      <Container
        bg="brand.50"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            bg="brand.500"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>{data.displayName || ''}</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="brand.900">
                      {data.email || ''}
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Text maxW={'250px'}>{data.description || ''}</Text>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={3} color="#0B0E3F">
                      <VStack spacing={3}>
                        <Box boxSize="150px">
                          <Image
                            src={data.profilePhotoUrl || ''}
                            alt={data.displayName || ''}
                          />
                        </Box>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default User;
