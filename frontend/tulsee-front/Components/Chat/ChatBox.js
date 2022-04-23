import { Button, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

const ChatBox = () => {

    const [text, setText] = useState();
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState('room1')
    const [userId, setUserId] = useState(uuidv4())

    // const socketRef = useRef();
    const socketRef = io.connect("http://localhost:3000");

    useEffect(() => {
        // socketRef.current = io('/');
        socketRef.emit('user_join', 'Saurabh', userId, room);
        return () => {
            socketRef.disconnect();
        };
    },[])

    // useEffect(() => {
        
    // },[room])

    useEffect(() => {
        socketRef.on('message', ({name, userId, message}) => {
          setChat(prev => {
            return [
                ...prev,
                {name, userId, message}
            ]
        });
        });
        socketRef.on('user_join', function (data) {
          setChat(prev => {
              return [
                  ...prev,
                  {name: 'ChatBot', userId: data.userId, message: `${data.name} has joined the chat`}
              ]
          });
        });
      }, [socketRef]);

      useEffect(() => {
        console.log(chat);
      },[chat])


      const onMessageSubmit = () => {
        socketRef.emit('message', {
          room: room,
          name: 'Saurabh',
          userId: userId,
          message: text
        });
        setText('');
      };

    return (
        <VStack w={'100%'} p={5} h={'90%'} justifyContent='flex-end'>
            <VStack w={'100%'} h={'100%'} justifyContent='flex-end'>
                {chat.map((i,idx) => 
                <Flex w='100%' justifyContent={i.userId === userId ? 'flex-end' : 'flex-start'}>
                    <Text 
                        key={idx} 
                        maxW='30%'
                        bg={i.userId === userId ? 'brand.700' : 'brand.500'}
                        p={2}
                        borderRadius='md'
                        color={'white'}
                        >{i.message}</Text>
                </Flex>
 )}
            </VStack>
            <HStack gap='10px' w={'100%'}>
                <Input
                    placeholder='type message here...'
                    value={text || ''}
                    onChange={e => setText(e.target.value)}
                />
                <Button onClick={onMessageSubmit}>Send</Button>
            </HStack>
        </VStack>
    );
};

export default ChatBox;