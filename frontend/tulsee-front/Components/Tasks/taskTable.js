import React, { createRef, useContext, useEffect, useMemo,  useState } from 'react';
import {Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    useToast,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Flex,
    HStack,
    Avatar,
    Box,
    Text,
    IconButton,
} from '@chakra-ui/react'
import SingleTask from './singleTask';
import { useUpdateTask } from '../../api/task/updateTask';
import TaskModal from './taskModal';
import TaskInfoModal from './taskInfoModal';
import { useDeleteTask } from '../../api/task/deleteTask';
import CommonInput from '../Common/CommonInput';
import { useAddComment } from '../../api/task/addComment';
import { useDeleteComment } from '../../api/task/deleteComment';
import { UserContext } from '../Contexts/UserContext';
import { MdDelete } from 'react-icons/md';

const TaskTable = ({tasks, updateTask, deleteTask}) => {
    
    const [selectedTask, setSelectedTask] = useState({})

    const {UserDetails} = useContext(UserContext)

    const {mutate: editTask, isLoading} = useUpdateTask()
    const {mutate: removeTask, isLoading:deleting} = useDeleteTask();

    const {mutate: addComment, isLoading: commenting} = useAddComment()
    const {mutate: deleteComment, isLoading: deletingComment} = useDeleteComment()

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose} = useDisclosure()
    const {isOpen: isCommentOpen, onOpen: onCommentOpen, onClose: onCommentClose} = useDisclosure()

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

    const handleComment = task => {
        setSelectedTask(task);
        onCommentOpen()
    }

    const handleAddComment = text => {
        if(!text || text.trim().length === 0) {
            toast({title:'Please enter some comment to send!', status: 'warning', duration: 2000 })
            return
        }
        const {publicId, displayName, profilePhotoUrl} = UserDetails
        addComment({
            taskId: selectedTask.publicId,
            comment: {
                text,
                createdBy: {
                    publicId,
                    displayName,
                    profilePhotoUrl
                }
            }
        },{
            onSuccess: d => {
                updateTask(d);
                setSelectedTask(d)
                // toast({title: "Comment added successfully!", status: "success", duration: 2000});
            },
            onError: e => {
                console.log(e);
                toast({title: "Something went wrong!", status: "error", duration: 2000});
            }
        })
    }

    const handleDeleteComment = commentId => {
        deleteComment({
            taskId: selectedTask.publicId,
            commentId
        },{
            onSuccess: d => {
                updateTask(d);
                setSelectedTask(d)
            },
            onError: e => {
                console.log(e);
                toast({title: "Something went wrong!", status: "error", duration: 2000});
            }
        })
    }

    const memoizedCommentSection = useMemo(() => {
        return <CommentSection 
        task={selectedTask} 
        isOpen={isCommentOpen} 
        onClose={() => onCommentClose()}
        handleSend={handleAddComment}
        commenting={commenting}
        handleDelete={handleDeleteComment}
        deleting={deletingComment}
    />
    },[selectedTask,isCommentOpen,commenting,onCommentClose,handleDeleteComment,deletingComment])

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
                        tasks && tasks.map((i,idx) => 
                            <SingleTask 
                                key={idx} 
                                task={i}
                                handleStatus={value => handleUpdate(i.publicId,{status: value})}
                                isLoading={isLoading || deleting}
                                handleEdit={() => handleEdit(i)}
                                handleInfo={() => handleInfo(i)}
                                handleDelete={() => handleDelete(i.publicId)}
                                handleComment={() => handleComment(i)}
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
            {memoizedCommentSection}
        </TableContainer>
    );
};

const CommentSection = ({task,isOpen, onClose, handleSend, commenting, handleDelete,deleting}) => {
    const [text, setText] = useState('');
    const [comments, setComments] = useState([])

    const last = createRef()

    useEffect(() => {
        if(!task || !task.comments) return
        setComments(task.comments);
        if(last.current){
            last.current.scrollIntoView({behavior:'smooth'})
        }
    },[task])

    useEffect(() => {
        if(last.current){
            last.current.scrollIntoView({behavior:'smooth'})
        }
    },[last])


    const handleChange = (value) => {
        setText(value)
    }

    const handleSubmit = e => {
        handleSend(text)
    }

 


    return <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={() => onClose()}
        isFullHeight={true}
        >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{task.title}</DrawerHeader>
        <DrawerBody  >
            <Flex h={'100%'} flexDirection='column' overflowY='auto' justifyContent={'flex-end'}>
                {comments.map(i => <SingleComment key={i.publicId} comment={i} handleDelete={() => handleDelete(i.publicId)} deleting={deleting}/>) }
                <div id='last-element' ref={last}>
                </div>
            </Flex>
        </DrawerBody>
        <DrawerFooter>
                <Flex gap={2}>
                    <CommonInput 
                        placeholder='Type here...' 
                        value={text}
                        onChange={handleChange}
                    />
                    <Button onClick={handleSubmit} isLoading={commenting}  mt={2} colorScheme='blue'>Send</Button>
                </Flex>
        </DrawerFooter>
        </DrawerContent>
        </Drawer>
}

const SingleComment = ({comment,handleDelete,deleting}) => {
    const {userID} = useContext(UserContext)
    const MemoizedComment = useMemo(() => {return <Box borderRadius={'md'} boxShadow='md' p={2} mb={2}>
    <HStack justifyContent={'space-between'} mb={2}>
        <Flex gap={2}>
            <Avatar size='sm' src={comment.createdBy.profilePhotoUrl} name={comment.createdBy.displayName}/>
            <Text fontWeight={600}>{comment.createdBy.displayName}</Text>
        </Flex>
        {comment.createdBy.publicId === userID && <IconButton isLoading={deleting} onClick={() =>handleDelete()} size={'sm'} variant='ghost' icon={<MdDelete/>}/>}
    </HStack>
    <Text fontSize={'md'} ml={'40px'}>{comment.text}</Text>
</Box>},[comment,handleDelete,deleting,userID])
    return MemoizedComment
}

export default TaskTable;