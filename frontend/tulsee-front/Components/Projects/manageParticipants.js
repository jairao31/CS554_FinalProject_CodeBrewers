import { Avatar, Box, Button, Grid, GridItem, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useRemoveParticipant } from '../../api/project/removeParticipant';
import { ProjectContext } from '../Contexts/ProjectContext';
import { UserContext } from '../Contexts/UserContext';

const ManageParticipants = () => {

    const {UserDetails} = useContext(UserContext)
    const {currentProject, setGroupProjects, setCurrentProject} = useContext(ProjectContext)
    const {mutate: removeUser, isLoading} = useRemoveParticipant()

    const toast = useToast()

    const handleRemove = user => {
        removeUser({
            projectId: currentProject.publicId,
            userId: user
        },{
            onSuccess: d => {
                setCurrentProject(d)
                setGroupProjects(prev => {
                    return prev.map(i => i.publicId === d.publicId ? d : i)
                })
                toast({title: "Participant removed successfully", status:'success', duration:2000});
            },
            onError: e => {
                console.log(e)
                toast({title: "Participant could not be removed", status:'error', duration:2000});
            }
        })
    } 

    return (
        UserDetails && <Box mb={2}>
            <Text fontSize={'lg'} fontWeight='bold'  my={4}>Manage participants</Text>
            {
                currentProject && currentProject.participants.map(i => 
                    {
                    return <Grid templateColumns='repeat(2, 1fr)' gap={2} key={i.publicId} w={'40%'} p={2}>
                        <GridItem>
                            <HStack>
                                <Avatar size={'sm'} src={i.profilePhotoUrl} name={i.displayName}/>
                                <Text>{i.displayName}</Text>
                            </HStack>
                        </GridItem>
                        <GridItem>
                            {(UserDetails.publicId ===  currentProject.createdBy.publicId && currentProject.createdBy.publicId !== i.publicId) && 
                                <Button 
                                    isLoading={isLoading} 
                                    size={'sm'} 
                                    bg={'red!important'} 
                                    onClick={() => handleRemove(i.publicId)}>
                                        Remove
                                    </Button>}
                        </GridItem>
                    </Grid>
                    } 
                )
            }
        </Box>
    );
};

export default ManageParticipants;