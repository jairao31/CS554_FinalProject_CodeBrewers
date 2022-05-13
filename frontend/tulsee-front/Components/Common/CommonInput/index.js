import { Input } from '@chakra-ui/react';
import React from 'react';
import FormControlLayout from '../FormControlLayout';

const CommonInput = ({label,onChange,type,helperText,value,name,isError,isRequired,size,placeholder}) => {
    return (
        <FormControlLayout
        label={label}
        isRequired={isRequired}
        isError={isError}
        helperText={helperText}
        >
            <Input
                id={label}
                type={type ? type : 'text'}
                value={value}
                onChange={e => onChange(e.target.value, e.target.name)}
                name={name}
                size={size}
                placeholder={placeholder}
            />
        </FormControlLayout>
    );
};

export default CommonInput;