import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import {MdAdd, MdPerson,MdGroups} from 'react-icons/md'
import { UserContext } from '../../Contexts/UserContext';

const Sidebar = () => {

    const {logout} = useContext(UserContext)

    return (
        <Box p={2} h={'100%'}>
            <Text fontSize={'xl'} fontWeight='bold' mb={2} color='#E5E3C9' bg='#789395' w={'fit-content'} p={2} borderRadius={5}>TULSEE.io</Text>
            <Flex justifyContent={'space-between'}>
                <Text pt={2} verticalAlign={'middle'}>Hi, Saurabh</Text>
                <Button variant='ghost' onClick={() => logout()}>Logout</Button>
            </Flex>
            <Flex direction={'column'} h={'100%'}>
                <VStack textAlign={'left'} py={4} px={4} borderBottom='1px solid #DBDBDB'>
                    <Text w={'100%'} fontWeight={'semibold'} mb={2} fontSize='lg'>Personal</Text>
                    <Button variant={'outline'} w='100%' leftIcon={<MdAdd/>} mb={'10px!important'}>
                        Create New
                    </Button>
                    {
                        [1,2].map(i => <Button key={i} variant={'solid'} w='100%' leftIcon={<MdPerson/>}>
                            Personal Project {i}
                        </Button>)
                    }
                </VStack>
                <VStack textAlign={'left'} py={4} px={4} h={'100%'}>
                    <Text w={'100%'} fontWeight={'semibold'} mb={2} fontSize='lg'>Group</Text>
                    <Button variant={'outline'} w='100%' leftIcon={<MdAdd/>} mb={'10px!important'}>
                        Create New
                    </Button>
                    {
                        [1,2].map(i => <Button key={i} variant={'solid'} w='100%' leftIcon={<MdGroups/>}>
                            Group Project {i}
                        </Button>)
                    }
                </VStack>
            </Flex>
        </Box>
    );
};

export default Sidebar;