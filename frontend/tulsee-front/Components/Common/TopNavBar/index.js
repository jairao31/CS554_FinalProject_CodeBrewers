import { Flex, HStack, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import {BiTask} from 'react-icons/bi'
import {IoMdChatboxes} from 'react-icons/io'
import {SiGooglemeet} from 'react-icons/si'
import {VscFileMedia} from 'react-icons/vsc'
import {MdArrowBackIosNew} from 'react-icons/md'
import { ProjectContext } from '../../Contexts/ProjectContext';
import IconButton from '../IconButton';

const TopNavBar = ({activePage, title}) => {
    const [navs, setNavs] = useState([
        "task",
        "chat",
        "meet",
        "media"
    ])

    const {push, query, back} = useRouter()

    const {currentProject} = useContext(ProjectContext);

    useEffect(() => {
        if(!currentProject || !query.projectId) return
        if(currentProject.type === "Group") {
            setNavs([
                "task",
                "chat",
                "meet",
                "media"
            ])
        }else{
            setNavs([
                "task",
                "media"
            ])
        }
    },[currentProject,query])



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
            <HStack>
                <IconButton variant={'ghost'} icon={<MdArrowBackIosNew size={'20px'}/>} onClick={() => back()}/>
                <Text mt={'8px!important'} fontSize={'lg'} fontWeight={500} minW={'100px'} alignSelf={'flex-start'}>{title}</Text>
            </HStack>
            {query.projectId && <HStack ml='30%'>
                {/* <Tooltip label='task' placement='bottom'>hover</Tooltip> */}
                {navs.map((i,idx) => <Tooltip key={idx} hasArrow  label={i} placement='bottom'>
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
            </HStack>}
        </Flex>
    );
};

export default TopNavBar;