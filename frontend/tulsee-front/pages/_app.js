import React from 'react';
import {AppProps} from 'next/app'
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({Component, PageProps}) => {
    return (
       <ChakraProvider theme={theme}>
            <Component {...PageProps}/>
       </ChakraProvider>
        
    );
};

export default MyApp;