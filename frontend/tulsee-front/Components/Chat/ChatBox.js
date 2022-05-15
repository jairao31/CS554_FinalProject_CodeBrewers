import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../Contexts/UserContext";
import { useRouter } from "next/router";
import { useSendMessage } from "../../api/chat/sendMessageMutation";
import { useGetMessages } from "../../api/chat/getMessages";
import { get24TimeFormat } from "../../helpers/dateFormat";
import { getBaseUrl } from "../../api/base";
import CommonAvatar from "../Common/CommonAvatar";
import { ProjectContext } from "../Contexts/ProjectContext";
import Linkify from 'react-linkify'

const ChatBox = () => {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("room1");
  const [userId, setUserId] = useState();
  const [socket, setSocket] = useState(null)

  const { UserDetails } = useContext(UserContext);
  const {currentProject} = useContext(ProjectContext);

  const { query } = useRouter();

  const toast = useToast()
  // const socketRef = useRef();

  const lastMessage = useRef()
  

  const { data: messages } = useGetMessages(query.projectId, !!query.projectId);
  const { mutate: sendMessage, isLoading } = useSendMessage();

  useEffect(() => {

    if ( !UserDetails) return;
    const socketRef = io.connect(getBaseUrl());
    setUserId(UserDetails.publicId);
    setRoom(query.projectId);
    console.log(query);
    socketRef.emit("user_join", {
      sender: {
        publicId: UserDetails.publicId,
        name: UserDetails.displayName,
        profilePhotoUrl: UserDetails.profilePhotoUrl,
      },
      room: query.projectId,
    });
    setSocket(socketRef)
    return () =>  socketRef.disconnect()
  }, [UserDetails]);

  useEffect(() => {
    if(lastMessage) {
      lastMessage.current.scrollIntoView({behavior:'smooth'})
    }
  },[chat])


  useEffect(() => {
    if(!socket) return
    socket.on("message", ({ sender, createdAt, text }) => {  
      setChat((prev) => {
        return [...prev, { sender, createdAt, text }];
      });
    });
    socket.on("user_join", function (data) {
      console.log(data);
      const { sender, createdAt } = data;
      setChat((prev) => {
        return [
          ...prev,
          { sender, createdAt, text: `${sender.name} has joined the chat` },
        ];
      });
    });
    if(lastMessage) {
      lastMessage.current.scrollIntoView({behavior:'smooth'})
    }
  }, [socket]);

  useEffect(() => {
    if (!messages) return;
    setChat(messages);
  }, [messages]);

  const onMessageSubmit = () => {

    if(text.trim().length === 0) {
      toast({title: 'Enter a message to send', status: 'warning', duration: 2000});
      return
    }

    sendMessage(
      {
        projectId: room,
        text,
        sender: {
          publicId: userId,
          name: UserDetails.displayName,
          profilePhotoUrl: UserDetails.profilePhotoUrl,
        },
      },
      {
        onSuccess: (d) => {
          console.log(d);
          socket.emit("message", {
            room: room,
            sender: {
              publicId: userId,
              name: UserDetails.displayName,
              profilePhotoUrl: UserDetails.profilePhotoUrl,
            },
            createdAt: d.createdAt,
            text: text,
          });
          setText("");
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
    </a>
  );

  return (
    <HStack h='100%'>
        <VStack borderRight={'1px solid #D5D8DC'} gap={2} px={2} py={5} h='100%'>
          {currentProject && currentProject.participants.map(i => 
            <CommonAvatar 
              size={'sm'}
              key={i.publicId}
              src={i.profilePhotoUrl}
              name={i.displayName}
              publicId={i.publicId}
            />
          )}
        </VStack>
        <Box display={'flex'} justifyContent='end' w={"100%"} p={5} h={"90%"} >
          <Flex h='100%' w={'100%'} direction='column' justifyContent={'space-between'}>
          <VStack mb='auto'  w={"100%"} minH={'calc(100% - 280px)'} maxH={'calc(100vh - 140px)'} overflowY='auto'>
            {chat.map((i, idx) => (
              <Flex
                minW={0}
                key={idx}
                gap={2}
                w="100%"
                justifyContent={
                  i.sender.publicId === userId ? "flex-end" : "flex-start"
                }
              >
                {i.sender.publicId !== userId && (
                  <CommonAvatar
                    size={"sm"}
                    src={i.sender.profilePhotoUrl}
                    name={i.sender.name}
                    publicId={i.sender.publicId}
                  />
                )}
                <Box>
                  <Linkify componentDecorator={componentDecorator}>
                      <Text
                      ml={i.sender.publicId === userId && 'auto'}
                      mr={i.sender.publicId !== userId ? 'auto':'20px'}
                      bg={i.sender.publicId === userId ? "brand.700" : "brand.300"}
                      p={2}
                      borderRadius="md"
                      color={i.sender.publicId === userId ?"white":'black'}
                      w={"fit-content"}
                      maxW="400px"
                    >
                      {i.text}
                    </Text>
                  </Linkify>
                  <Text    
                    w={'fit-content'}            
                    ml={i.sender.publicId === userId && 'auto'}
                    mr={i.sender.publicId !== userId ? 'auto':'20px'} 
                    fontSize={"xs"} 
                    color={"brand.900"}>
                    {i.sender.name} | {get24TimeFormat(i.createdAt)}
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={lastMessage}>
            </div>
          </VStack>
          <HStack gap="10px">
            <Textarea
              minH='50px'
              placeholder="type message here..."
              value={text || ""}
              onChange={(e) => setText(e.target.value)}
              onKeyUp={e => e.keyCode === 13 && !e.shiftKey ? onMessageSubmit() : setText(e.target.value)}
            />
            <Button onClick={onMessageSubmit} backgroundColor='brand.700' isLoading={isLoading}>
              Send
            </Button>
          </HStack>
          </Flex>
        </Box>
    </HStack>

  );
};

export default ChatBox;
