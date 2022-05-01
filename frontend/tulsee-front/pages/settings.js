import React from 'react';
import Layout from '../Components/Common/layout';
import TopNavBar from '../Components/Common/TopNavBar';
import UserSettings from '../Components/UserSettings';

const Settings = () => {
    return (
        <Layout>
            <TopNavBar title={'User Settings'}/>
            <UserSettings/>
        </Layout>
    );
};

export default Settings;