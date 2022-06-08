import { Avatar, Box, Fade, Grid, GridItem, HStack, IconButton,  SlideFade, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import {BsGithub, BsLinkedin} from 'react-icons/bs'

const Team = () => {


    const members = [
        {
            name: "Saurabh Mane",
            skills:["Web Technologies Expert", "Python programming"],
            photo: "saurabh.jpg",
            description: "I am an enthusiastic, self-motivated, and creative student pursuing a Master's in Computer Science, also having a history of 2+ years of experience in the field of web development. Consistently learning and exploring the field of programming to one day have a great impact on the world.",
            social: {
                linkedIn: "https://www.linkedin.com/in/saurabh-m-7607608a/",
                github: "https://github.com/Saurabh7120"
            }
        },
        {
            name: "Pratik Patil",
            skills:["Python Scripting SME","Javascript"],
            photo: "pratik.jpeg",
            description: "I drove efficiency through automation as a Python Scripting Subject Matter Expert (SME).I like to solve complex problems, throughout my career. Experienced Software Developer with a demonstrated history of working in the information technology and services industry.",
            social: {
                linkedIn: "https://www.linkedin.com/in/pratikpatil7777/",
                github: "https://github.com/pratikpatil7777"
            }
        },
        {
            name: "Jaiganesh Rao",
            skills:["Python Programming","Javascript"],
            photo: "jai.jpg",
            description: "I worked as a Software Engineer for Cloud and Infra Services Business Unit at Larsen & Toubro Infotech for almost two years. I enjoy coding, especially in Python. Also, I like watching anime, playing football, and sometimes cooking.",
            social: {
                linkedIn: "https://www.linkedin.com/in/jaiganeshrao/",
                github: "https://github.com/jairao31"
            }
        },
        {
            name: "Akancha Banka",
            skills:["Java Programming","Javascript"],
            photo: "akancha.jpeg",
            description: "I love coding, it has helped me not only solve problems but sometimes express myself. I like to travel, play badminton, read and cook in my free time.",
            social: {
                linkedIn: "https://www.linkedin.com/in/akancha-banka-643422114/",
                github: "https://github.com/AkanchaBanka"
            }
        }
    ]

    

    
    const memoizedGrid = useMemo(() => {return <Grid templateColumns='repeat(2, 1fr)'>
        {
            members.map((i,idx) =>  <SingleFrame key={idx}  {...i}/>)
        }
    </Grid>
    })

    return (
        <Box w='100vw' h='100vh' position={'relative'}>
            <Text 
            position={'absolute'}
            fontSize={'6xl'}
            fontWeight='bold'
            color='white'
            w='fit-content'
            top='50%'
            left={'50%'}
            transform='translate(-50%,-50%)'
            zIndex={'999'}
            >Code
            <Text as='span' color='#45B39D'>Brewers</Text>
            </Text>
            {memoizedGrid}
        </Box>
    );
};


const SingleFrame = ({photo, name, skills, description, social}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return <GridItem
    w={'50vw'}
    h={'50vh'}
    backgroundImage={`url(${photo})`}
    backgroundPosition='center'
    backgroundSize='cover'
    position={'relative'}
    // onMouseOut={() => onClose()}
    onMouseEnter={() => {setTimeout(() => onOpen(),500)}}
    onMouseLeave={() => onClose()}
>
    <VStack 
        w='100%'
        h='100%'
        transition={'1s'}
        backgroundColor={isOpen ? 'rgba(0,0,0,0.8)' :'rgba(0,0,0,0.3)'}
        justifyContent='center'
        className='fadeIn'
    >
        {!isOpen && <SlideFade offsetY='10px' delay={0.2}  in={!isOpen} reverse={isOpen}>
            <Text fontWeight={'bold'} color='white' fontSize='4xl'>{name}</Text>
        </SlideFade>}
       {isOpen && <Fade delay={0.3} in={isOpen} unmountOnExit>
            <VStack transition={'3s'} p={'100px'} className='fadeIn' > 
            <Avatar
                mx='auto'
                src={photo}
                name={name}
                mb={4}
                size='lg'
            />
            <HStack>
            {
                skills.map((i,idx,arr) => idx === arr.length - 1 ? <Text key={idx} color='white'>{i}</Text> : <Text key={idx} color='white'>{`${i} | `}</Text>)
            }
            </HStack>
            <Text textAlign={'center'} className='fadeIn' color='white'>
                <Text as='span' fontSize={'4xl'}>"</Text>
                {description}
                <Text as='span' fontSize={'4xl'}>"</Text>
            </Text>
            <HStack>
                <IconButton 
                    aria-label='github' 
                    icon={<BsLinkedin size='20px'/>} 
                    color='#378fe9'
                    variant={'ghost'}
                    size='sm'
                    _hover={{backgroundColor:'transparent'}}
                    onClick={()=>window.open(social['linkedIn'],'_blank')}
                />
                <Text color='white'>|</Text>
                <IconButton 
                    aria-label='github' 
                    icon={<BsGithub size='20px'/>} 
                    color='#6e5494'
                    variant={'ghost'}
                    size='sm'
                    _hover={{backgroundColor:'transparent'}}
                    onClick={()=>window.open(social['github'],'_blank')}
                />
            </HStack>
        </VStack>
        </Fade>}
    </VStack>
</GridItem>
}


export default Team;