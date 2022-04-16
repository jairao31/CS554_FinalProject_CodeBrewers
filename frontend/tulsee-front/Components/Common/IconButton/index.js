import React from 'react';
import { IconButton } from '@chakra-ui/react';

const IconBtn = ({label,active,variant,onClick,icon}) => {
    return (
        <IconButton
            aria-label={label}
            color={active ? 'white' : 'brand.700'} 
            onClick={() => onClick()} 
            icon={icon}
            fontSize={24}
            variant={variant}
            bg={active && 'brand.700'}
        />
    );
};

export default IconBtn;