import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../Components/Common/layout';
import { UserContext } from '../Components/Contexts/UserContext';

const Home = () => {

  const {UserDetails} = useContext(UserContext);

  return (
    UserDetails ?
    <Layout></Layout> :
    <Box>
      <p>you are being logged out!</p>
    </Box>
  );
};

export default Home;