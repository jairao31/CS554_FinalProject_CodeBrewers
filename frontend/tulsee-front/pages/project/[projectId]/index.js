import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';
import { ProjectContext } from '../../../Components/Contexts/ProjectContext';

const SingleProject = () => {

    const {currentProject} = useContext(ProjectContext)

    return (
        <Layout>
            <TopNavBar title={currentProject ? currentProject.name : ''}/>
            {/* Your coomponent here */}
            this is specific project
        </Layout>
    );
};

export default SingleProject;