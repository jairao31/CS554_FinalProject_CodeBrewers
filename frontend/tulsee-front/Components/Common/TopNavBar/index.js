import { Flex, HStack, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import {BiTask} from 'react-icons/bi'
import {IoMdChatboxes} from 'react-icons/io'
import {SiGooglemeet} from 'react-icons/si'
import {VscFileMedia} from 'react-icons/vsc'
import IconButton from '../IconButton';

const TopNavBar = ({activePage, title}) => {

    const {push} = useRouter()

    const navs = [
        "task",
        "chat",
        "meet",
        "media"
    ]

    const getIcon = label => {
        switch (label) {
            case "task":
                return <BiTask/>
            case "chat":
                return <IoMdChatboxes/>
            case "meet":
                return <SiGooglemeet/>
            case "media":
                return <VscFileMedia/>
        
            default:
                return <BiTask/>
        }
    }

    return (
        <Flex
            p={'5px 20px'}
            borderBottom={'1px solid #D5D8DC'}
        >
            <Text mt={'5px'} fontSize={'lg'} fontWeight={500} alignSelf={'flex-start'}>{title}</Text>
            <HStack ml='30%'>
                {/* <Tooltip label='task' placement='bottom'>hover</Tooltip> */}
                {navs.map((i,idx) => <Tooltip hasArrow  label={i} placement='bottom'>
                    <div>
                        <IconButton 
                            label={'top-nav-task'} 
                            active={activePage === i} 
                                icon={
                                    getIcon(i)
                            } 
                            variant='ghost'
                            onClick={() => push(`/project/123/${i}`)}
                        />
                    </div>
                </Tooltip>)}
            </HStack>
        </Flex>
    );
};

export default TopNavBar;