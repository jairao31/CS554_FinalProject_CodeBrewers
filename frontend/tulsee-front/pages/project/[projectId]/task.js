import React from 'react';
import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';
import TopNavBar from '../../../Components/Common/TopNavBar';

const Tasks = () => {
    return (
        <Layout>
            <ProjectLayout activePage={'task'}>
                {/* Your coomponent here */}
                this is task page
            </ProjectLayout>
        </Layout>
    );
};

export default Tasks;