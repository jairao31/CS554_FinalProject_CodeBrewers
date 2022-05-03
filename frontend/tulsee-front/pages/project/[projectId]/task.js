import React from 'react';
import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';
import TopNavBar from '../../../Components/Common/TopNavBar';
import TaskContainer from '../../../Components/Tasks/taskContainer';

const Tasks = () => {
    return (
        <Layout>
            <ProjectLayout activePage={'task'}>
                {/* Your coomponent here */}
                <TaskContainer/>
            </ProjectLayout>
        </Layout>
    );
};

export default Tasks;