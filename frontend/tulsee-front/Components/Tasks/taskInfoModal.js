import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Avatar,
    Flex,
    Button,
    Box,
    Divider,
  } from '@chakra-ui/react'
import { IoIosSquare } from 'react-icons/io';

const TaskInfoModal = ({isOpen, onClose, task}) => {

    const InfoSingle = ({title,children}) => {
        return <Box my={2}>
            <Text fontWeight={'bold'} mb={2}>{title}</Text>
            {children}
        </Box>
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{task.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <InfoSingle
                    title={'Description'}
                >
                    <Text>{task.description}</Text>
                </InfoSingle>
                <Divider/>
                <InfoSingle
                    title='Status'
                >
                    <Flex gap={2}>
                        <Box pt={1}>
                            <IoIosSquare color={
                               task.status === 'Done' ? 'green' :
                               task.status === "Under Review" ? 'orange' :
                               task.status === "In Progress" ? '#F1C40F' :
                               '#3498DB'
                                }/>
                        </Box>
                        <Text>{task.status}</Text>
                    </Flex>
                       
                </InfoSingle>
                <Divider/>
                <InfoSingle
                    title='Assignees'
                >
                   { task.assignees &&  <Box>
                        {
                           task.assignees.map(i => 
                                <Flex key={i.publicId} gap={2} mb={2}>
                                    <Avatar size={'sm'} src={i.profilePhotoUrl} name={i.displayName}/>
                                    <Text>{i.displayName}</Text>
                                </Flex>
                            )
                        }
                    </Box>}
                </InfoSingle>
                <Divider/>
                <InfoSingle
                    title='Created By'
                >
                     {task.createdBy && <Flex gap={2}>
                        <Avatar size={'sm'} src={task.createdBy.profilePhotoUrl} name={task.createdBy.name}/>
                        <Text>{task.createdBy.name}</Text>
                    </Flex>}
                </InfoSingle>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => onClose()}>OK</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TaskInfoModal;