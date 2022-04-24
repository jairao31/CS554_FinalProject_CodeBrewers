import React from 'react';
import ChatBox from '../../../Components/Chat/ChatBox';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';

const Chat = () => {
    return (
        <Layout>
            <TopNavBar activePage="chat" title={'Project Name'}/>
            {/* Your coomponent here */}
            <ChatBox/>
        </Layout>
    );
};

export default Chat;