import React from 'react';
import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';
import ProjectSettings from '../../../Components/Projects/projectSettings';

const Settings = () => {
    return (
        <Layout>
            <ProjectLayout activePage={'setting'}>
                <ProjectSettings/>
            </ProjectLayout>
        </Layout>
    );
};

export default Settings;