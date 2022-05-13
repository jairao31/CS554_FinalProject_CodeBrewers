import { Flex, Select, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';
import FormControlLayout from '../FormControlLayout';

const CommonSelect = ({isRequired, label, options, isError, onSelect, value, name,multiple, handleRemove, helperText, defaultValue, size, disabled}) => {
    return (
        <FormControlLayout
            label={label}
            isRequired={isRequired}
            isError={isError}
            helperText={helperText}
        >
            <Select
                disabled={disabled}
                size={size}
                name={name}
                value={
                    !multiple ?
                        value
                        :
                        value.length > 0 ?
                            value[value.length - 1]
                            :
                            ''
                }
                defaultValue={defaultValue}
                placeholder={`Select ${label}`}
                onChange={e => onSelect(e.target.value, e.target.name)}
            >
                {options.map((i,idx) => <option key={idx}  value={i}>{i}</option>)}
            </Select>
            {
                multiple && value &&
                <Flex>
                    {value.map(i => <Tag bg={'brand.100'} key={i} m={'8px 2px'}>
                        <TagLabel>{capitalize(i)}</TagLabel>
                        <TagCloseButton onClick={() => handleRemove(name, i)}/>
                    </Tag>)}
                </Flex>
            }
        </FormControlLayout>
    );
};

export default CommonSelect;