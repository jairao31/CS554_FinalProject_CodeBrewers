import React from 'react';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';

const Chat = () => {
    return (
        <Layout>
            <TopNavBar activePage="chat" title={'Project Name'}/>
            {/* Your coomponent here */}
            this is chat page
        </Layout>
    );
};

export default Chat;