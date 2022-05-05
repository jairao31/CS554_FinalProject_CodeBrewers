import React, { useContext, useEffect, useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Input,
    Box,
    HStack,
    Avatar,
    Text,
    VStack,
    Portal,
  } from '@chakra-ui/react'
import { useAutocompleteUser } from '../../../api/user/autocompleteUser';
import FormControlLayout from '../FormControlLayout';
import { UserContext } from '../../Contexts/UserContext';

const UserAutocomplete = ({label, handleSelect, options}) => {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const {UserDetails} = useContext(UserContext)


    const {onClose} = useDisclosure()

    const {data: results} = useAutocompleteUser(query, !!(query.length > 2 && !options))

    const handleChange = e => {
        const {value} = e.target;
        setQuery(value)
        if(value.length < 2) {
            onClose()
        }else{
            if(options) {
                console.log(options)
                setSearchResults(options.filter(i => i.displayName.toLowerCase().includes(value.toLowerCase()) && i.publicId !== UserDetails.publicId))
            }
        }
    }

    useEffect(() => {
        if(!results) return;
        setSearchResults(results.filter(i => i.publicId !== UserDetails.publicId))
    },[results])



    const ResultEntry = ({name, src, handleSelect}) => {
        console.log(name)
        return <HStack onClick={() => handleSelect()} w={'100%'} p={2} _hover={{bg:'rgba(0,0,0,0.05)',cursor:'pointer'}}>
            <Avatar size={'sm'} src={src} name={name}/>
            <Text>{name}</Text>
        </HStack>
    }

    return (
        <Popover
        isLazy
        autoFocus={false}
        isOpen={query.length > 2 && searchResults.length > 0}
        placement='bottom'
        closeOnBlur={false}
      ><FormControlLayout label={label}>
            <PopoverTrigger>
            {/*  */}
                <Input placeholder="Type user name here..." onChange={handleChange}/>
            {/* */}
            </PopoverTrigger>
        </FormControlLayout>
            <PopoverContent minW={'200px'} width='fit-content' px={3} py={1}>
            {searchResults && <VStack>
                {searchResults.map(i => 
                    <ResultEntry key={i.publicId} name={i.displayName} src={i.profilePhotoUrl} handleSelect={() => {handleSelect(i); setQuery('')}}/>
                )}
            </VStack>}
            </PopoverContent>

      </Popover>
    );
};

export default UserAutocomplete;