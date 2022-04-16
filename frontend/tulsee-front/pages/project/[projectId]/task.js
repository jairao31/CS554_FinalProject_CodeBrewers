import React from 'react';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';

const Tasks = () => {
    return (
        <Layout>
            <TopNavBar activePage="task" title={'Project Name'}/>
            {/* Your coomponent here */}
            this is task page
        </Layout>
    );
};

export default Tasks;