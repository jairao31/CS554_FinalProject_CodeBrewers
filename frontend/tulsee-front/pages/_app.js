import React from 'react';
import {AppProps} from 'next/app'
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import UserContextProvider from '../Components/Contexts/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getAuth } from 'firebase/auth';



const MyApp = ({Component, PageProps}) => {
    const firebaseConfig = {
        apiKey: "AIzaSyA80n1RK8xk-2PY44aZz-mY8Q8Pq3XLZm0",
        authDomain: "tulsee-43d3d.firebaseapp.com",
        databaseURL: "https://tulsee-43d3d-default-rtdb.firebaseio.com",
        projectId: "tulsee-43d3d",
        storageBucket: "tulsee-43d3d.appspot.com",
        messagingSenderId: "357663161206",
        appId: "1:357663161206:web:a8bafd513291667fbf1857",
        measurementId: "G-2PQ5YJ42WS"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);


      const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <UserContextProvider>
                        <Component {...PageProps}/>
                </UserContextProvider>
            </ChakraProvider>
        </QueryClientProvider>

        
    );
};

export default MyApp;