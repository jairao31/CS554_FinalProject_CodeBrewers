import React from 'react';
import Layout from '../../Components/Common/layout';
import TopNavBar from '../../Components/Common/TopNavBar';
import CreateNewForm from '../../Components/Projects/createNewForm';

const CreateNew = () => {
    return (
        <Layout>
            <TopNavBar title="Create New Project"/>
            <CreateNewForm/>
        </Layout>
    );
};

export default CreateNew;