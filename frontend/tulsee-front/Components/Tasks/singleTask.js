import { Avatar, AvatarGroup, Flex, IconButton, Td, Text, Tooltip, Tr } from '@chakra-ui/react';
import React from 'react';
import { MdDelete, MdEdit, MdInfo } from 'react-icons/md';
import {BiCommentDetail} from 'react-icons/bi'
import CommonSelect from '../Common/CommonSelect';

const SingleTask = ({task, 
    handleStatus, 
    isLoading, 
    handleEdit, 
    handleInfo, 
    handleDelete,
    handleComment
}) => {
    return (
        task && <Tr>
           <Td>
              <Text minW='100px' maxW={'100px'} isTruncated>{task.title}</Text>
            </Td>
           <Td>
                <Text minW='200px' maxW={'200px'} isTruncated>{task.description}</Text>
            </Td>
           <Td maxW={'150px'}>
               <CommonSelect
                disabled={isLoading}
                defaultValue={task.status}
                options={['Open','In Progress', 'Under Review', 'Done']}
                onSelect={(value,name) => handleStatus(value)}
                di
               />
           </Td>
           <Td>
               <AvatarGroup size={'sm'} max={2}>
                    {
                        task.assignees.map(i => 
                            <Avatar  key={i.publicId} src={i.profilePhotoUrl} name={i.displayName}/>    
                        )
                    }
               </AvatarGroup>
           </Td>
           <Td>
               <Flex gap={2}>
                <Avatar size={'sm'} src={task.createdBy.profilePhotoUrl} name={task.createdBy.name}/>
                <Text mt={2} minW='80px' maxW={'80px'} isTruncated>{task.createdBy.name}</Text>
               </Flex>
            </Td>
           <Td>
               <Flex gap={2}>
                   <Tooltip label='Info' hasArrow>
                        <IconButton
                            onClick={() => handleInfo()}
                            disabled={isLoading}
                            icon={<MdInfo/>}
                            variant='outline'
                            size={'sm'}
                        />
                   </Tooltip>
                   <Tooltip label='Comment' hasArrow>
                        <IconButton
                            onClick={() => handleComment()}
                            disabled={isLoading}
                            icon={<BiCommentDetail/>}
                            variant='outline'
                            size={'sm'}
                        />
                   </Tooltip>
                   <Tooltip label='Edit' hasArrow>
                        <IconButton
                            disabled={isLoading}
                            icon={<MdEdit/>}
                            variant='outline'
                            size={'sm'}
                            onClick={() => handleEdit()}
                        />
                   </Tooltip>
 
                   <Tooltip label='Delete' hasArrow>
                        <IconButton
                            disabled={isLoading}
                            icon={<MdDelete/>}
                            variant='outline'
                            size={'sm'}
                            onClick={() => handleDelete()}
                        />
                   </Tooltip>
     
               </Flex>
           </Td>
       </Tr>
    );
};

export default SingleTask;