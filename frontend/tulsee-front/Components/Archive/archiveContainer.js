import { Alert, AlertIcon, Avatar, AvatarGroup, Box, Button, Flex, Grid, GridItem, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MdInfo, MdRestorePage } from 'react-icons/md';
import { useEditProject } from '../../api/project/editProject';
import { ProjectContext } from '../Contexts/ProjectContext';

const ArchiveContainer = () => {

    const {archivedProjects, restoreProj} = useContext(ProjectContext)

    const {mutate: restoreProject, isLoading} = useEditProject();

    const toast = useToast()

    const handleRestore = project => {
        restoreProject({
                ...project,
                archived: false
            },
            {
                onSuccess: d => {
                    restoreProj(d);
                    toast({title: "Restored project successfully!", status: "success", duration: 2000});
                },
                onError: e => {
                    console.log(e);
                    toast({title: "Something went wrong!", status: "error", duration: 2000});
                }
            }
        )
    }

    return (
        <Box p={5}>
            {archivedProjects.length > 0 ? <Grid templateColumns='repeat(4, 1fr)' gap={6} >
                {
                    archivedProjects.map( i => <GridItem key={i.publicId}>
                        <Box p={2} borderRadius={'md'} boxShadow={'md'}>
                            <Text fontSize={'lg'} fontWeight='bold'>{i.name}</Text>
                            <HStack mt={'40px'} justifyContent='space-between'>
                                <AvatarGroup size='sm' max={2}>
                                    {
                                        i.participants.map(i => 
                                            <Avatar src={i.profilePhotoUrl} name={i.displayName} />    
                                        )
                                    }
                                </AvatarGroup>
                                <Button size='sm' isLoading={isLoading} onClick={() => handleRestore(i)}>Remove</Button>   
                            </HStack>
                        </Box>
                    </GridItem>)
                    }
                </Grid>
                :
                <Alert status='info'>
                <AlertIcon />
                    No projects archived yet!
              </Alert>
            }
        </Box>

    );
};

export default ArchiveContainer;