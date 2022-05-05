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

const ArchiveProject = () => {

    const {currentProject,archiveProj} = useContext(ProjectContext)

    const {push} = useRouter()
    
    const {isOpen, onOpen, onClose} = useDisclosure()

    const {mutate: archive, isLoading} = useEditProject()

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

    return (
        <Box>
            <Text fontSize={'lg'} fontWeight='bold'  mt={4} mb={1}>Archive project</Text>
            <Text mb={4} maxW={'800px'}>Archiving the project removes it from your current projects and places it in your archive projects. 
                You will not have access to this project untill you remove it from your archive.</Text>
            <Button backgroundColor='#E74C3C' leftIcon={<FaArchive/>} onClick={() => onOpen()}>
                Archive
            </Button>
            <ArchiveDialog archiving={isLoading} handleArchive={handleArchive} name={currentProject && currentProject.name} isOpen={isOpen} onClose={onClose}/>
        </Box>
    );
};


const ArchiveDialog = ({name, isOpen,onClose, archiving, handleArchive}) => {


    const cancelRef = useRef()
    return <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => onClose()}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Archive {name}
        </AlertDialogHeader>

        <AlertDialogBody>
          If you archive the project, you will be redirected to home and 
          will not have access to this project until you remove it from your archive.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button  isLoading={archiving} backgroundColor='#E74C3C' onClick={() => handleArchive()} ml={3}>
            Archive
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
}

export default ArchiveProject;