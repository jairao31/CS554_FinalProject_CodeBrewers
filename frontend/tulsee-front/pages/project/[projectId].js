import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

const SingleProject = () => {

    const {query} = useRouter()

    useEffect(() => {
        console.log(query)

    },[query])

    return (
        <div>
            this is single project
        </div>
    );
};

export default SingleProject;