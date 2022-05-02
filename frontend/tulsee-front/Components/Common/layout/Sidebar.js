import { Box, Button, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import {MdAdd, MdPerson,MdGroups} from 'react-icons/md'
import { ProjectContext } from '../../Contexts/ProjectContext';
import { UserContext } from '../../Contexts/UserContext';
import {GoRequestChanges} from 'react-icons/go'
import {HiMenu} from 'react-icons/hi'
import { RiUserSettingsLine } from 'react-icons/ri';

const Sidebar = () => {

    const {logout,UserDetails} = useContext(UserContext);
    const {groupProjects, personalProjects} = useContext(ProjectContext);

    const {push} = useRouter()

    return (
        <Box p={2} h={'100%'}>
            <Flex justifyContent={'space-between'}>
                <Text fontSize={'xl'} fontWeight='bold' mb={2} color='#ffff' bg='brand.700' w={'fit-content'} p={2} borderRadius={5}>TULSEE.io</Text>
                <Button variant='ghost' onClick={() => logout()}>Logout</Button>
            </Flex>
            <Flex justifyContent={'space-between'}>
                <Text pt={2} verticalAlign={'middle'}>Hi, {UserDetails ? UserDetails.firstName : ''}</Text>
                {/* <IconButton onClick={() => push("/invites")} fontWeight={'bold'} variant={'ghost'} size={'sm'} icon={<GoRequestChanges size={'18px'}/>}/> */}
                <Menu>
                    <MenuButton as={IconButton} icon={<HiMenu/>} variant='ghost'/>
                    <MenuList>
                        <MenuItem onClick={() => push("/invites")} icon={<GoRequestChanges size={'18px'}/>}>Project invites</MenuItem>
                        <MenuItem onClick={() => push("/settings")}  icon={<RiUserSettingsLine size={'18px'}/>}>User settings</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex direction={'column'} h={'100%'}>
                
                <VStack textAlign={'left'} py={4} px={4} borderBottom='1px solid #DBDBDB'>
                    <Button variant={'outline'} w='100%' leftIcon={<MdAdd/>} mb={'10px!important'} onClick={() => push('/project/createNew')}>
                       New Project
                    </Button>
                    <Text w={'100%'} fontWeight={'semibold'} mb={2} fontSize='lg'>Personal</Text>

                    {
                        personalProjects.map(i => <Button backgroundColor={'brand.700'} onClick={() => push(`/project/${i.publicId}/task`)} key={i.publicId} variant={'solid'} w='100%' leftIcon={<MdPerson/>}>
                            {i.name}
                        </Button>)
                    }
                </VStack>
                <VStack textAlign={'left'} py={4} px={4} h={'100%'}>
                    <Text w={'100%'} fontWeight={'semibold'} mb={2} fontSize='lg'>Group</Text>
                    {
                        groupProjects.map(i => <Button backgroundColor={'brand.700'} bg={'brand.700'} onClick={() => push(`/project/${i.publicId}/task`)} key={i.publicId} variant={'solid'} w='100%' leftIcon={<MdGroups/>}>
                            {i.name}
                        </Button>)
                    }
                </VStack>
            </Flex>
        </Box>
    );
};

export default Sidebar;