import { Flex, HStack,Text, Tooltip, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import {BiTask} from 'react-icons/bi'
import {IoMdChatboxes} from 'react-icons/io'
import {SiGooglemeet} from 'react-icons/si'
import {VscFileMedia} from 'react-icons/vsc'
import {MdArrowBackIosNew, MdHome} from 'react-icons/md'
import {MdSettings} from 'react-icons/md'
import { ProjectContext } from '../../Contexts/ProjectContext';
import IconButton from '../IconButton';
import { FaMoon, FaSun } from 'react-icons/fa';

const TopNavBar = ({activePage, title}) => {
    const [navs, setNavs] = useState([
        "task",
        "chat",
        "meet",
        "media"
    ])

    const {push, query, back} = useRouter()

    const {currentProject} = useContext(ProjectContext);

    const { colorMode, toggleColorMode } = useColorMode();

    const isDark = colorMode === "dark";

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
            case "setting":
                return <MdSettings/>
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
                <Tooltip hasArrow  label={'Home'} placement='bottom'>
                    <div>
                        <IconButton label={`home-btn`} onClick={() => push('/')} variant={'ghost'} icon={<MdHome size={'20px'}/>}/>
                    </div>
                </Tooltip>
                <IconButton label={`back-btn`} variant={'ghost'} icon={<MdArrowBackIosNew size={'20px'}/>} onClick={() => back()}/>
                <Text mt={'8px!important'} fontSize={'lg'} fontWeight={500} minW={'100px'} alignSelf={'flex-start'}>{title}</Text>
            </HStack>
            {query.projectId ? currentProject ? <HStack mx='auto'>
                {/* <Tooltip label='task' placement='bottom'>hover</Tooltip> */}
                {navs.map((i,idx) => <Tooltip key={idx} hasArrow  label={i} placement='bottom'>
                    <div>
                        <IconButton 
                            label={`top-nav-${i}`} 
                            active={activePage === i} 
                                icon={
                                    getIcon(i)
                            } 
                            variant='ghost'
                            onClick={() => push(`/project/${currentProject.publicId}/${i}`)}
                        />
                    </div>
                </Tooltip>)}
            </HStack> : <>loading</> :
            <></>
            }
            <HStack ms='auto'>
            {query.projectId && <Tooltip hasArrow  label={'setting'} placement='bottom'>
                <div>
                    <IconButton 
                        
                        active={activePage === 'setting'} 
                        label={'top-nav-settings'} 
                        icon={
                            getIcon('setting')
                        } 
                        variant='ghost'
                        onClick={() => push(`/project/${currentProject.publicId}/settings`)}
                    />
                </div>
            </Tooltip>   }  
                <Tooltip hasArrow  label={'Toogle mode'} placement='bottom'>
                    <div>
                    <IconButton
                    label={'toggle-btn'}
                    variant={isDark ? 'solid' : 'ghost'}
                    ml={"1px"}
               
                    boxShadow={isDark ? "0px 0px 16px 2px white" : "dark-lg"}
                    icon={isDark ? <FaSun size={'18px'} color='white'/> : <FaMoon size={'18px'} />}
                    isRound="true"
                    onClick={toggleColorMode}
                />
                    </div>
                </Tooltip> 
            </HStack>
                     
        </Flex>
    );
};

export default TopNavBar;