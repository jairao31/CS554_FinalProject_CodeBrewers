import React from 'react';
import ArchiveContainer from '../Components/Archive/archiveContainer';
import Layout from '../Components/Common/layout';
import TopNavBar from '../Components/Common/TopNavBar';

const Archive = () => {
    return (
       <Layout>
           <TopNavBar title='Archive'/>
           <ArchiveContainer/>
       </Layout>
    );
};

export default Archive;