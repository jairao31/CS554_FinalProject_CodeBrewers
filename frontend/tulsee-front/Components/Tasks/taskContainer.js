import { Box, 
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Flex,
    Text,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoIosSquare } from 'react-icons/io';
import { MdAdd } from 'react-icons/md';
import { useGetTasksByProject } from '../../api/task/getTasksByProject';
import TaskModal from './taskModal';
import TaskTable from './taskTable';

const TaskContainer = () => {

    const [taskList, setTaskList] = useState([])

    const {query} = useRouter()

    const {projectId} = query

    const {data: tasks} = useGetTasksByProject(projectId, !!projectId)

    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(() => {
        if(!tasks) return
        setTaskList(tasks)
    },[tasks])

    const updateTask = task => {
        if(!task) return
        setTaskList(prev => {
            return prev.map(i => i.publicId === task.publicId ? task : i)
        })
    }

    const deleteTask = id => {
        if(!id) return
        console.log(id);
        setTaskList(prev => {
            return prev.filter(i => i.publicId !== id)
        })
    }

    const addTask = task => {
        if(!task) return
        setTaskList(prev => {
            return [...prev, task]
        })
    }

    const AccordionSingle = ({title,icon}) => {
        return <AccordionItem>
        <AccordionButton>
            <Box flex='1' textAlign='left'>
                <Flex gap={2}>
                    <Box pt={1}>
                        {icon}
                    </Box>
                    <Text fontWeight={'600'}>
                        {title}
                    </Text>
                </Flex>
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
            {taskList && <TaskTable
                tasks={
                    title === 'Done' ?
                    taskList.map(i => i.status === 'Done' && i) :
                    title === 'Under Review' ?
                    taskList.map(i => i.status === 'Under Review' && i) :
                    title === 'In Progress' ?
                    taskList.map(i => i.status === 'In Progress' && i) :
                    taskList.map(i => i.status === 'Open' && i)
                }
                updateTask={updateTask}
                deleteTask={deleteTask}
            />}
        </AccordionPanel>
    </AccordionItem>
    }

    return (
        <Box p={5}>
            <Flex justifyContent={'flex-end'}>
                <Button onClick={onOpen} mb={2} size={'sm'} leftIcon={<MdAdd/>}>
                    Task
                </Button>
            </Flex>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionSingle
                    title="Done"
                    icon={<IoIosSquare color='green'/>}
                />
                <AccordionSingle
                    title="Under Review"
                    icon={<IoIosSquare color='orange'/>}
                />
                <AccordionSingle
                    title="In Progress"
                    icon={<IoIosSquare color='#F1C40F'/>}
                />
                <AccordionSingle
                    title="Open"
                    icon={<IoIosSquare color='#3498DB' />}
                />
            </Accordion>
            <TaskModal isOpen={isOpen} onClose={onClose} insertTask={addTask}/>
        </Box>
    );
};

export default TaskContainer;