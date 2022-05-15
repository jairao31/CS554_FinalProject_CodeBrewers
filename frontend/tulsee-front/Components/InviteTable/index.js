import React, { useContext, useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useToast,
    Box,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
import { UserContext } from '../Contexts/UserContext';
import { getDate } from '../../helpers/dateFormat';
import { useAcceptRejectInvite } from '../../api/project/acceptRejectInvite';
import { ProjectContext } from '../Contexts/ProjectContext';

const InviteTable = () => {

    const [currentInvites, setCurrentInvites] = useState()

    const {UserDetails,refetchUser} = useContext(UserContext)
    const {setGroupProjects} = useContext(ProjectContext)
    const {mutate: updateInvite, isLoading} = useAcceptRejectInvite();

    const toast = useToast();

    useEffect(() => {
        refetchUser()
    },[])

    useEffect(() => {
        if(!UserDetails) return
        setCurrentInvites(UserDetails.invites);
    },[UserDetails])

    const handleUpdate = (projectId,status) => {
        updateInvite({
            projectId,
            userId: UserDetails.publicId,
            status
        },{
            onSuccess: d => {
                if(status === 1) {
                    setGroupProjects(prev => {
                        return [d,...prev]
                    })
                }
                let curr = currentInvites;
                curr = curr.filter(i => i.publicId !== projectId);
                if(curr.length > 0) {
                    setCurrentInvites(curr)
                }else{
                    setCurrentInvites(null)
                }
                toast({title: `Invitation was ${status ? 'accepted' : 'rejected'} successfully`, status:'success', duration: 2000})
            },
            onError: e => {
                console.log(e);
                toast({title: "Could not update invite status", status:'error', duration: 2000})
            }
        })
    }

    

    return (
        UserDetails ? <TableContainer minW={'60%'}>
            <Table variant='simple' size={'lg'} >
                <TableCaption>Invitations to projects</TableCaption>
                <Thead>
                <Tr>
                    <Th>Project</Th>
                    <Th>Owner</Th>
                    <Th >Sent on</Th>
                    <Th >Accept/Reject</Th>
                </Tr>
                </Thead>
                {currentInvites ? <Tbody>
                 {currentInvites.map(i => <Tr key={i.publicId}>
                    <Td>{i.name}</Td>
                    <Td>{i.createdBy.displayName}</Td>
                    <Td>{getDate(i.sentOn)}</Td>
                    <Td>
                        <Button mr={2} bg="green!important" colorScheme="green" onClick={() => handleUpdate(i.publicId, 1)} isLoading={isLoading}>Accept</Button>
                        <Button bg="red!important" colorScheme="red" onClick={() =>handleUpdate(i.publicId, 0)} isLoading={isLoading}>Reject</Button>
                    </Td>
                </Tr>)}
                </Tbody> :
                <Alert status='info' minW={'200px'} mt={'10px'} borderRadius={3}>
                    <AlertIcon />
                    You got no invites yet!
              </Alert>
                }
            </Table>
        </TableContainer> :
        <>Loading</>
    );
};

export default InviteTable;