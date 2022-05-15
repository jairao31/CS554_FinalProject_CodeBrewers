import React, { useContext, useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    HStack,
    Avatar,
    Text,
    IconButton,
    useToast,
    Flex,
  } from '@chakra-ui/react'
import CommonInput from '../Common/CommonInput'
import CommonTextarea from '../Common/CommonTextarea';
import UserAutocomplete from '../Common/UserAutocomplete';
import { RiCloseCircleFill } from 'react-icons/ri';
import CommonSelect from '../Common/CommonSelect';
import { useAddTask } from '../../api/task/addTask';
import { UserContext } from '../Contexts/UserContext';
import { ProjectContext } from '../Contexts/ProjectContext';

const TaskModal = ({isOpen, onClose, selected, mode , insertTask, updateTask, loading}) => {

    const [details, setDetails] = useState({})

    const {mutate: addTask, isLoading} = useAddTask()

    const {UserDetails} = useContext(UserContext)
    const {currentProject} = useContext(ProjectContext)

    const toast = useToast()

    useEffect(() => {
        if(!selected || !mode) {
            setDetails({})
        }else{
            if(mode === 'edit') {
                console.log(selected)
                setDetails(selected)
            }
        }
    },[mode,selected])

    const handleChange = (value,name) => {
        setDetails(prev => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    const handleSelect = value => {
        setDetails(prev => {
            let exist = false
            if(prev.assignees) {
                exist = prev.assignees.find(i => i.publicId === value.publicId);
            }
            if(!exist) {
                return {
                    ...prev,
                    assignees: prev.assignees ? [...prev.assignees,value] : [value]
                }
            }else{
                return prev
            }
           
        })
    }

    const handleRemove = id => {
        setDetails(prev => {
            return {
                ...prev,
                assignees: prev.assignees.filter(i => i.publicId !== id)
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const {title,description,status} = details

        if(title.trim().length === 0 || status.trim().length === 0) {
            toast({title:'Title or status missing!', status:"warning", duration: 2000});
            return;
        }

        if(mode !== 'edit') {
            addTask({
                projectId: currentProject.publicId,
                title,
                description,
                assignees: details.assignees ? details.assignees : 
                currentProject.type === 'Group'? [] : [{
                    publicId: UserDetails.publicId,
                    name: UserDetails.displayName,
                    profilePhotoUrl: UserDetails.profilePhotoUrl
                }],
                status,
                createdBy: {
                    publicId: UserDetails.publicId,
                    name: UserDetails.displayName,
                    profilePhotoUrl: UserDetails.profilePhotoUrl
                }
            },{
                onSuccess: d => {
                    console.log(d)
                    toast({title: "Task added successfully!", status:'success', duration: 2000})
                    setDetails({})
                    insertTask(d)
                    onClose()
                },
                onError: e => {
                    console.log(e);
                    toast({title: "Something went wrong!", status:'error', duration: 2000})
                }
            })
        }else{
            updateTask(details.publicId,{title,description,assignees:details.assignees,status})
        }    
    }

    return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{mode === 'edit' ? 'Edit' : 'Add'} Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
                <CommonInput
                    isRequired
                    label={'Title'}
                    value={details.title || ''}
                    name='title'
                    onChange={handleChange}
                />
                <CommonTextarea
                    label={'Description'}
                    value={details.description || ''}
                    name='description'
                    onChange={handleChange}
                />
                {currentProject && currentProject.type === "Group" && <UserAutocomplete label="Assignees" handleSelect={handleSelect} options={currentProject.participants}/>}
                {
                    details.assignees && details.assignees.map(i => 
                    {return <HStack key={i.publicId} w={'100%'} p={2} >
                        <Avatar size={'sm'} src={i.profilePhotoUrl}  name={i.displayName}/>
                        <Text>{i.displayName}</Text>
                        <IconButton variant={'ghost'} icon={<RiCloseCircleFill/>} onClick={() => handleRemove(i.publicId)}/>
                    </HStack>}
                    )
                }
                <CommonSelect
                    isRequired
                    label={'Status'}
                    options={['Open','In Progress','Under Review','Done']}
                    onSelect={handleChange}
                    name='status'
                    value={details.status || ''}
                />
                <Flex my={3} justifyContent={'flex-end'}>
                    <Button isLoading={isLoading || loading} type='submit' mt={2}>
                        {mode === 'edit' ? 'Update' : 'Add'}
                    </Button>
                </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
};

export default TaskModal;