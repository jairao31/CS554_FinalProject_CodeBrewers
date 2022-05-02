import { Avatar, Box, Button, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../Contexts/UserContext';
import { useRouter } from 'next/router';
import { useSendMessage } from '../../api/chat/sendMessageMutation';
import { useGetMessages } from '../../api/chat/getMessages';
import { get24TimeFormat } from '../../helpers/dateFormat';

const ChatBox = () => {

    const [text, setText] = useState();
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState('room1')
    const [userId, setUserId] = useState()

    const {UserDetails} = useContext(UserContext)

    const {query} = useRouter();

    // const socketRef = useRef();
    const socketRef = io.connect("http://localhost:3001");

    const {data: messages} = useGetMessages(query.projectId, !!query.projectId)
    const {mutate: sendMessage, isLoading} = useSendMessage();

    

    useEffect(() => {
        // socketRef.current = io('/');
        if(!socketRef || !UserDetails) return
        setUserId(UserDetails.publicId)
        setRoom(query.projectId)
        console.log(query)
        socketRef.emit('user_join', {sender:{
            publicId: UserDetails.publicId,
            name: UserDetails.displayName,
            profilePhotoUrl: UserDetails.profilePhotoUrl
        }, room: query.projectId});
        return () => {
            socketRef.disconnect();
        };
    },[UserDetails])

    // useEffect(() => {
        
    // },[room])

    useEffect(() => {
        socketRef.on('message', ({sender, createdAt, text}) => {
          setChat(prev => {
            return [
                ...prev,
                {sender, createdAt, text}
            ]
        });
        });
        socketRef.on('user_join', function (data) {
            console.log(data);
            const{sender, createdAt} = data
          setChat(prev => {
              return [
                  ...prev,
                  {sender, createdAt, text: `${sender.name} has joined the chat`}
              ]
          });
        });
      }, [socketRef]);

      useEffect(() => {
        if(!messages) return
        setChat(messages)
      },[messages])


      const onMessageSubmit = () => {
        sendMessage({projectId: room, text, sender: {
            publicId: userId,
            name: UserDetails.displayName,
            profilePhotoUrl: UserDetails.profilePhotoUrl
        }}, {
            onSuccess: d => {
                console.log(d)
                socketRef.emit('message', {
                    room: room,
                    sender: {
                        publicId: userId,
                        name: UserDetails.displayName,
                        profilePhotoUrl: UserDetails.profilePhotoUrl
                    },
                    createdAt: d.createdAt,
                    text: text
                  });
                  setText('');
            },
            onError: e => {
                console.log(e)
            }
        })

      };

    return (
        <VStack w={'100%'} p={5} h={'90%'} justifyContent='flex-end'>
            <VStack w={'100%'} h={'100%'} justifyContent='flex-end'>
                {chat.map((i,idx) => 
                <Flex key={idx} gap={2}  w='100%' justifyContent={i.sender.publicId === userId ? 'flex-end' : 'flex-start'}>
                    {i.sender.publicId !== userId && <Avatar size={'sm'} src={i.sender.profilePhotoUrl} name={i.sender.name} alt={`${i.sender.name}_dp`}/>}
                    <Box>
                        <Text 
                            bg={i.sender.publicId === userId ? 'brand.700' : 'brand.500'}
                            p={2}
                            borderRadius='md'
                            color={'white'}
                            w={'fit-content'}
                            maxW='400px'
                            >{i.text}</Text>
                        <Text fontSize={'xs'} color={'#99A3A4 '}>{i.sender.name} | {get24TimeFormat(i.createdAt)}</Text>
                    </Box>
                </Flex>
 )}
            </VStack>
            <HStack gap='10px' w={'100%'}>
                <Input
                    placeholder='type message here...'
                    value={text || ''}
                    onChange={e => setText(e.target.value)}
                />
                <Button onClick={onMessageSubmit} isLoading={isLoading}>Send</Button>
            </HStack>
        </VStack>
    );
};

export default ChatBox;