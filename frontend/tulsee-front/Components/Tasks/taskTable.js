import React, { useState } from 'react';
import {Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    useToast,
    useDisclosure,} from '@chakra-ui/react'
import SingleTask from './singleTask';
import { useUpdateTask } from '../../api/task/updateTask';
import TaskModal from './taskModal';
import TaskInfoModal from './taskInfoModal';
import { useDeleteTask } from '../../api/task/deleteTask';

const TaskTable = ({tasks, updateTask, deleteTask}) => {
    
    const [selectedTask, setSelectedTask] = useState({})

    const {mutate: editTask, isLoading} = useUpdateTask()
    const {mutate: removeTask, isLoading:deleting} = useDeleteTask();

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose} = useDisclosure()

    const toast = useToast()

    const handleUpdate = (id,value) => {
        if(!id || !value) return
        editTask({
            id,
            request: value
            },
            {
                onSuccess: d => {
                    console.log(d);
                    updateTask(d);
                    toast({title: "Task updated successfully!", status: "success", duration: 2000});
                    if(isOpen) onClose()
                },
                onError: e => {
                    console.log(e)
                    toast({title: "Something went wrong!", status: "error", duration: 2000});
                }
            }
        )
    }

    const handleEdit = task => {
        setSelectedTask(task)
        onOpen()
    }

    const handleInfo = task => {
        setSelectedTask(task)
        onInfoOpen()
    }

    const handleDelete = id => {
        removeTask(id, {
            onSuccess: d => {
                deleteTask(id)
                toast({title: "Task deleted successfully!", status: "success", duration: 2000});
            },
            onError: e => {
                console.log(e)
                toast({title: "Something went wrong!", status: "error", duration: 2000});
            }
        })
    }

    return (
        <TableContainer minW={'800px'}>
            <Table variant='simple' size={'md'} >
                <Thead>
                <Tr>
                    <Th>title</Th>
                    <Th>description</Th>
                    <Th>status</Th>
                    <Th >Assignees</Th>
                    <Th>createdBy</Th>
                    <Th>actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        tasks && tasks.map(i => 
                            <SingleTask 
                                key={i.publicId} 
                                task={i}
                                handleStatus={value => handleUpdate(i.publicId,{status: value})}
                                isLoading={isLoading || deleting}
                                handleEdit={() => handleEdit(i)}
                                handleInfo={() => handleInfo(i)}
                                handleDelete={() => handleDelete(i.publicId)}
                            />)
                    }
                </Tbody> 
            </Table>
            <TaskModal 
                isOpen={isOpen} 
                onClose={onClose} 
                updateTask={handleUpdate} 
                selected={selectedTask}
                mode='edit'
                loading={isLoading}
            />
            <TaskInfoModal 
                isOpen={isInfoOpen}
                onClose={onInfoClose}
                task={selectedTask}
            />
        </TableContainer>
    );
};

export default TaskTable;