import { Textarea } from '@chakra-ui/react';
import React from 'react';
import FormControlLayout from '../FormControlLayout';

const CommonTextarea = ({label,onChange,helperText,value,name,isError,isRequired,size,placeholder}) => {
    return (
        <FormControlLayout
            label={label}
            isRequired={isRequired}
            isError={isError}
            helperText={helperText}
        >
            <Textarea
                id={label}
                value={value}
                onChange={e => onChange(e.target.value, e.target.name)}
                name={name}
                size={size}
                placeholder={placeholder}
            />
        </FormControlLayout>
    );
};

export default CommonTextarea;