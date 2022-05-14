import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ProjectContext } from '../../Contexts/ProjectContext';
import TopNavBar from '../TopNavBar';

const ProjectLayout = ({activePage, children}) => {

    const {currentProject} = useContext(ProjectContext)

    return (
        <Box h={'100%'}>
            <TopNavBar activePage={activePage} title={currentProject ? currentProject.name : ''}/>
            <Box h={'100%'}>
                {children}
            </Box>
        </Box>
    );
};

export default ProjectLayout;