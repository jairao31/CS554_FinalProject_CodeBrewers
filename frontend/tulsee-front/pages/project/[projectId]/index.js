import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';

const SingleProject = () => {

    const {query} = useRouter()

    useEffect(() => {
        console.log(query)

    },[query])

    return (
        <Layout>
            <TopNavBar/>
            {/* Your coomponent here */}
            this is specific project
        </Layout>
    );
};

export default SingleProject;