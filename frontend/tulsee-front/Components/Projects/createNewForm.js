import { Flex,
    IconButton,
    HStack,
    Avatar,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CommonInput from '../Common/CommonInput';
import CommonRadio from '../Common/CommonRadio';
import UserAutocomplete from '../Common/UserAutocomplete';
import {RiCloseCircleFill} from 'react-icons/ri'
import { useCreateProject } from '../../api/project/createProject';
import { UserContext } from '../Contexts/UserContext';
import { ProjectContext } from '../Contexts/ProjectContext';



const CreateNewForm = () => {
    const [payload, setPayload] = useState({
    });

    const {UserDetails} = useContext(UserContext);
    const {addProject} = useContext(ProjectContext)

    const {isLoading} = useCreateProject();

    const toast = useToast();
    

    useEffect(() => {
        if(!UserDetails) return
        console.log(UserDetails)
        const {publicId, displayName, profilePhotoUrl} = UserDetails
        setPayload(prev => {
            return {
                ...prev,
                createdBy: {
                    publicId,
                    displayName,
                    profilePhotoUrl
                }
            }
        })
    },[UserDetails])

    const handleChange = (value,name) => {
        setPayload(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSelect = user => {
        setPayload(prev => {
            return {
                ...prev,
                requested : prev.requested ? [...prev.requested,user] : [user]
            }
        })
    }

    const handleRemove = id => {
        setPayload(prev => {
            return {
                ...prev,
                requested : prev.requested.filter(i => i.publicId !== id)
            }
        })
    }

    const handleCreate = e => {
        e.preventDefault()
        const {name,createdBy,type} = payload
        if(!name || !createdBy || !type) {
            toast({title: "Insufficient fields", status:'warning', duration: 2000})
            return
        }
        addProject(payload)
        setPayload(prev => {
            return {createdBy: prev.createdBy}
        })
    }

    return (
        <Flex justifyContent={'left'} pt={'50px'} px={5}>
            <form onSubmit={handleCreate}>
                <CommonInput
                    label='Project Name'
                     name='name'
                     value={payload.name || ''}
                     onChange={handleChange}
                />
                <CommonRadio
                    label="Type of project"
                    onChange={handleChange}
                    name="type"
                    value={payload.type || ""}
                    options={["Personal", "Group"]}
                />
                {payload.type === "Group" && <UserAutocomplete label="Invite Users" handleSelect={handleSelect}/>}
                {
                    payload.requested && payload.requested.map(i => 
                    {return <HStack key={i.publicId} w={'100%'} p={2} >
                        <Avatar size={'sm'} src={i.profilePhotoUrl}  name={i.displayName}/>
                        <Text>{i.displayName}</Text>
                        <IconButton variant={'ghost'} icon={<RiCloseCircleFill/>} onClick={() => handleRemove(i.publicId)}/>
                    </HStack>}
                    )
                }
                <Button type='submit' isLoading={isLoading}>
                    Create Project
                </Button>
            </form>
        </Flex>
    );
};


export default CreateNewForm;