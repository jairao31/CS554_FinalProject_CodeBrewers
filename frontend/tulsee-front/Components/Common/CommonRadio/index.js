import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from '../../../helpers/capitalize';
import FormControlLayout from '../FormControlLayout';

const CommonRadio = ({options, isRequired, onChange, isError, label, value, name, helperText}) => {
    return (
        <FormControlLayout
            label={label}
            isRequired={isRequired}
            isError={isError}
            helperText={helperText}
        >
            <RadioGroup
                onChange={value => onChange(value, name)} 
                value={value} 
                name={name}
            >
                <Stack direction='row'>
                    {options.map((i,idx) => <Radio key={idx} value={i}>{capitalize(i)}</Radio>)}
                </Stack>
            </RadioGroup>
      </FormControlLayout>
    );
};

export default CommonRadio;