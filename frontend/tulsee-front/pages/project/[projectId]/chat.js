import React from 'react';
import ChatBox from '../../../Components/Chat/ChatBox';
import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';

const Chat = () => {
    return (
        <Layout>
            <ProjectLayout activePage={'chat'}>
            {/* Your coomponent here */}
                <ChatBox/>
            </ProjectLayout>
        </Layout>
    );
};

export default Chat;