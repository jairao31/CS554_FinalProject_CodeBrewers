import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const CommonAvatar = ({name,src,size,publicId,isOnline}) => {

    const {push} = useRouter()

    return (
        <Avatar
            onClick={() => publicId && push(`/user/${publicId}`)}
            cursor={'pointer'}
            size={size}
            name ={name}
            src={src}
        >
            {isOnline && <AvatarBadge boxSize='1.25em' bg='green.500'/>}
        </Avatar>
    );
};

export default CommonAvatar;