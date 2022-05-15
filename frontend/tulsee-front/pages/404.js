import { Box, Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Custom404 = () => {
    const {push} = useRouter()

    return (
        <VStack h={'100vh'} w='100vw' justifyContent={'center'}>
            <HStack w='100%' justifyContent={'center'}>
                <Box>
                    <Image
                        w='300px'
                        src={'/not_found.svg'}
                    />
                    <Text my={2} textAlign={'center'} fontWeight='bold' fontSize='xl'>Page not found!</Text>
                    <Flex justifyContent='center'>
                        <Button onClick={() => push('/')} mt={4}>Back to home</Button>
                    </Flex>
                </Box>

            </HStack>
        </VStack>
    );
};

export default Custom404;