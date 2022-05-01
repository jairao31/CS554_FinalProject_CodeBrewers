import { Avatar, Box, Button, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useInviteUsers } from '../../api/project/inviteUsers';
import UserAutocomplete from '../Common/UserAutocomplete';
import { ProjectContext } from '../Contexts/ProjectContext';

const InviteParticipants = () => {

    const [selectedUsers, setSelectedUsers] = useState([]);

    const {query} = useRouter()
    const {setGroupProjects, setCurrentProject, currentProject} = useContext(ProjectContext)
    const {mutate: sendInvites, isLoading} = useInviteUsers()

    const toast = useToast()

    const handleSelect = user => {
        console.log(currentProject)
        if(currentProject.requested) {
            let exist = currentProject.requested.find(i => i.publicId === user.publicId);
            if(exist) {
                toast({title:"An invite has already been sent to this user!", status:"warning",duration:2000});
                return
            }
        }

        let participant =  currentProject.participants.find(i => i.publicId === user.publicId);
        if(participant) {
            toast({title:"This user is already a participant!", status:"warning",duration:2000});
            return
        }
        setSelectedUsers(prev => {
            return [...prev, user]
        })
    }

    const handleRemove = id => {
        setSelectedUsers(prev => {
            return prev.filter(i => i.publicId !== id)
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        sendInvites({
            users: selectedUsers,
            projectId: query.projectId
        },{
            onSuccess: d => {
                console.log(d);
                setCurrentProject(d);
                setGroupProjects(prev => {
                    return prev.map(i => i.publicId === d.publicId ? d : i)
                })
                setSelectedUsers([])
                toast({title:"Invites were sent successfully", status: "success", duration: 2000})
            },
            onError: e => {
                console.log(e);
                toast({title:"Something went wrong", status: "error", duration: 2000})
            }
        })
    }

    return (
        <Box>
            <Text fontSize={'lg'} fontWeight='bold'  my={4}>Invite participants</Text>
            <form style={{width:'40%', paddingBottom:'20px'}} onSubmit={handleSubmit}>
                <UserAutocomplete label="Invite Users" handleSelect={handleSelect}/>
                {
                    selectedUsers.map(i => 
                        {return <HStack key={i.publicId} w={'100%'} p={2} >
                            <Avatar size={'sm'}  name={i.displayName}/>
                            <Text>{i.displayName}</Text>
                            <IconButton variant={'ghost'} icon={<RiCloseCircleFill/>} onClick={() => handleRemove(i.publicId)}/>
                        </HStack>}
                        )
                }
                <Button
                    type='submit'
                    disabled={selectedUsers.length === 0}
                    isLoading={isLoading}
                >Send Invites</Button>
            </form>
        </Box>
    );
};

export default InviteParticipants;