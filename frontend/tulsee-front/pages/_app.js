import React from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import UserContextProvider from '../Components/Contexts/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProjectContextProvider from '../Components/Contexts/ProjectContext';
import ErrorBoundary from '../Components/ErrorBoundary';



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
        // apiKey: process.env.NEXT_PUBLIC_API_KEY,
        // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        // databaseURL: process.env.FIREBASE_DATABASE_URL,
        // projectId: process.env.FIREBASE_PROJECT_ID,
        // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        // appId: process.env.FIREBASE_APP_ID,
        // measurementId: process.env.FIREBASE_MEASUREMENT_ID
      };
      
      // Initialize Firebase
        initializeApp(firebaseConfig);


      const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <ErrorBoundary>
                    <UserContextProvider>
                        <ProjectContextProvider>
                            <Component {...PageProps}/>
                        </ProjectContextProvider>
                    </UserContextProvider>
                </ErrorBoundary>
            </ChakraProvider>
        </QueryClientProvider>

        
    );
};

export default MyApp;