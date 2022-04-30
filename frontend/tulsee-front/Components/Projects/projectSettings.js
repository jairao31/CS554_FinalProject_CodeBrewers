import { Avatar, Box, Button, Divider, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useEditProject } from '../../api/project/editProject';
import CommonInput from '../Common/CommonInput';
import UserAutocomplete from '../Common/UserAutocomplete';
import { ProjectContext } from '../Contexts/ProjectContext';
import ManageParticipants from './manageParticipants';

const ProjectSettings = () => {

    const [details, setDetails] = useState({})

    const {currentProject, setGroupProjects, setCurrentProject, setPersonalProjects} = useContext(ProjectContext)

    const {mutate: editProject, isLoading} = useEditProject()

    const toast = useToast()

    useEffect(() => {
        if(!currentProject) return;
        setDetails(currentProject)
    },[currentProject])

    const handleChange = (value,name) => {
        setDetails(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editProject(details,{
            onSuccess: d=> {
                setCurrentProject(d)
                if(d.type === 'Group') {
                    setGroupProjects(prev => {
                        return prev.map(i => i.publicId === d.publicId ? d : i)
                    })
                }else{
                    setPersonalProjects(prev => {
                        return prev.map(i => i.publicId === d.publicId ? d : i)
                    })
                }
                toast({title:"Changes saved successfully", status:'success', duration: 2000});
            },
            onError: e => {
                console.log(e);
                toast({title:"Changes could not be saved", status:'error', duration: 2000});
            }
        })
    }

    const handleSelect = user => {

    }

    return (
        <Box  p={5}>
            <Text fontSize={'lg'} fontWeight='bold' mb={4}>Basic Details</Text>
            <form style={{width:'40%', paddingBottom:'20px'}} onSubmit={handleSubmit}>
                <CommonInput
                    label="Project Name"
                    placeholder={'Project Name'}
                    name='name'
                    value={details.name || ''}
                    onChange={handleChange}
                />
                <Button type='submit' variant='outline' mt={2} isLoading={isLoading}>Save Changes</Button>
            </form>
            <Divider/>
            <ManageParticipants/>
            <Divider/>

            <Text fontSize={'lg'} fontWeight='bold'  my={4}>Invite participants</Text>
            <form style={{width:'40%', paddingBottom:'20px'}}>
                <UserAutocomplete label="Invite Users" handleSelect={handleSelect}/>
            </form>
        </Box>
    );
};

export default ProjectSettings;