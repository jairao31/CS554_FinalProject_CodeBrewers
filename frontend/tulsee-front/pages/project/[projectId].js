import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import Layout from '../../Components/Common/layout';

const SingleProject = () => {

    const {query} = useRouter()

    useEffect(() => {
        console.log(query)

    },[query])

    return (
        <Layout>
            {/* Your coomponent here */}
        </Layout>
    );
};

export default SingleProject;