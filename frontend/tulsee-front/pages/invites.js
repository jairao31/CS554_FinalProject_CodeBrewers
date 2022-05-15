import { Box } from '@chakra-ui/react';
import React from 'react';
import Layout from '../Components/Common/layout';
import TopNavBar from '../Components/Common/TopNavBar';
import InviteTable from '../Components/InviteTable';

const Invites = () => {
    return (
        <Layout>
            <TopNavBar title={"Invites"}/>
            <Box mx={0} w='80%' maxHeight='100vh' overflowY={'auto'}>
                <InviteTable/>
            </Box>
        </Layout>
    );
};

export default Invites;