import { Container } from '@chakra-ui/react';
import React from 'react';
import Layout from '../Components/Common/layout';
import TopNavBar from '../Components/Common/TopNavBar';
import InviteTable from '../Components/InviteTable';

const Invites = () => {
    return (
        <Layout>
            <TopNavBar title={"Invites"}/>
            <Container mx={0}>
                <InviteTable/>
            </Container>
        </Layout>
    );
};

export default Invites;