import { Box, 
    Button, 
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast, } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import {FaArchive} from 'react-icons/fa'
import { useEditProject } from '../../api/project/editProject';
import { ProjectContext } from '../Contexts/ProjectContext';
import { UserContext } from '../Contexts/UserContext';
import {CgLogOut} from 'react-icons/cg'
import { useRemoveParticipant } from '../../api/project/removeParticipant';

const ArchiveProject = () => {

    const {currentProject,archiveProj, setGroupProjects, setCurrentProject} = useContext(ProjectContext)

    const {userID} = useContext(UserContext);

    const {push} = useRouter()
    
    const {isOpen, onOpen, onClose} = useDisclosure()

    const {mutate: archive, isLoading} = useEditProject()

    const {mutate: leaveProject, isLoading: isLeaving} = useRemoveParticipant()

    const toast = useToast()

    const handleArchive = () => {
        archive({
                ...currentProject,
                archived: true
            },
            {
                onSuccess: d => {
                    archiveProj(d);
                    onClose();
                    toast({title: "Project archived successfully", status: "success", duration: 2000});
                    push('/');
                },
                onError: e => {
                    console.log(e);
                    toast({title: "Something went wrong!", status: "error", duration: 2000});
                }
            }
        )
    }

    const handleLeaveProject = () => {
      leaveProject({
        projectId: currentProject.publicId,
        user: userID
      },{
        onSuccess: d => {
          setGroupProjects(prev => {
            let exist = prev.find(i => i.publicId === currentProject.publicId);
            if(exist) {
              return prev.filter(i => i.publicId !== currentProject.publicId);
            }else{
              return prev
            }
          })
          toast({title: "Project left successfully", status: 'success', duration: 2000});
          push('/')
          setCurrentProject(null)
        },
        onError: e => {
          toast({title: "Something went wrong!", status: "error", duration: 2000})
        }
      })
    }

    return (
        <Box>
            <Text fontSize={'lg'} fontWeight='bold'  mt={4} mb={1}>   {currentProject && currentProject.createdBy.publicId === userID ? 'Archive' : 'Leave'} project</Text>
            <Text mb={4} maxW={'800px'}>{currentProject && currentProject.createdBy.publicId === userID ?
              "Archiving the project removes it from your current projects and places it in your archive projects. You will not have access to this project untill you remove it from your archive." :
              "Leaving the project will remove the project from your directory. You can rejoin the group if invited by the owner again."
              }</Text>
            <Button backgroundColor='#E74C3C' leftIcon={currentProject && currentProject.createdBy.publicId === userID ? <FaArchive/> : <CgLogOut/>} onClick={() => onOpen()}>
              {currentProject && currentProject.createdBy.publicId === userID ? 'Archive' : 'Leave'}
            </Button>
            <ArchiveDialog 
              owner={currentProject && currentProject.createdBy.publicId === userID} 
              archiving={isLoading}
              leaving={isLeaving}
              handleArchive={handleArchive}
              handleLeave={handleLeaveProject}
              name={currentProject && currentProject.name} 
              isOpen={isOpen} 
              onClose={onClose}
            />
        </Box>
    );
};


const ArchiveDialog = ({name, owner, isOpen,onClose, archiving, leaving, handleLeave, handleArchive}) => {


    const cancelRef = useRef()
    return <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => onClose()}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {owner ? 'Archive' : "Leave"} {name}
        </AlertDialogHeader>

        <AlertDialogBody>
         {owner ? 
          "If you archive the project, you will be redirected to home and will not have access to this project until you remove it from your archive. Are you sure you want to proceed?" :
          "If you leave the project you cannot rejoin unless invited by the owner again. Are you sure you want to proceed?"
          }
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button  isLoading={archiving || leaving} backgroundColor='#E74C3C' onClick={() => owner ? handleArchive() : handleLeave()} ml={3}>
            {owner ? "Archive" : "Leave"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
}

export default ArchiveProject;