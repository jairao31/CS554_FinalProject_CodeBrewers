import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react';
import React from 'react';

const FormControlLayout = ({isError,isRequired, label, helperText,children}) => {
    return (
        <FormControl isInvalid={isError} isRequired={isRequired} mb={3}>
            <FormLabel htmlFor={label}>{label}</FormLabel>
            {children}
            {isError &&
                <FormErrorMessage>This is required</FormErrorMessage>
            }
            {
            helperText &&
                <FormHelperText>{helperText}</FormHelperText>
            }
        </FormControl>
    );
};

export default FormControlLayout;