import React from 'react';
import {Box, Grid, GridItem} from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({children}) => {


    return (
        <Box w={'100%'} h='100vh' position={'fixed'}>
            <Grid h={'100%'}  templateColumns='repeat(5,1fr)' >
                <GridItem  h={'100vh'} borderRight='1px solid #DBDBDB' colSpan={1}>
                    <Sidebar/>
                </GridItem>
                <GridItem colSpan={4}>{children}</GridItem>
            </Grid>
        </Box>
    );
};

export default Layout;