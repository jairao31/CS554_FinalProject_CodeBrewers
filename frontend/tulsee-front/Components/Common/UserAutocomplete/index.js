import React, { useContext, useEffect, useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    useDisclosure,
    Input,
    HStack,
    Avatar,
    Text,
    VStack,
    Flex,
    Spinner,
    Button,
  } from '@chakra-ui/react'
import { useAutocompleteUser } from '../../../api/user/autocompleteUser';
import FormControlLayout from '../FormControlLayout';
import { UserContext } from '../../Contexts/UserContext';
import { SiMinutemailer } from 'react-icons/si';
import InviteUserModal from './inviteUserModal';

const UserAutocomplete = ({label, handleSelect, options}) => {

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const {UserDetails} = useContext(UserContext)

    const {isOpen, onOpen, onClose: onInviteClose} = useDisclosure()


    const {onClose} = useDisclosure()

    const {data: results,refetch, isLoading} = useAutocompleteUser(query, !!(query.length > 2 && !options))

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
        console.log(results);
        if(!results) return;
        console.log(results);
        setSearchResults(results.filter(i => i.publicId !== UserDetails.publicId))
    },[results])

    useEffect(() => {
        if(query.length > 2 && searchResults) {
            refetch()
        }
    },[query])



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
        isOpen={query.length > 2}
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
            {!isLoading && searchResults && <VStack>
                {searchResults.length === 0 && <Button onClick={() => onOpen()} w={'100%'} leftIcon={<SiMinutemailer/>} variant='ghost'>Invite {query}</Button>}
                {searchResults.map(i => 
                    <ResultEntry key={i.publicId} name={i.displayName} src={i.profilePhotoUrl} handleSelect={() => {handleSelect(i); setQuery('')}}/>
                )}
            </VStack>}
            {isLoading && <Flex justifyContent={'center'}>
                    <Spinner/>
                </Flex>}
            </PopoverContent>
            <InviteUserModal isOpen={isOpen} onClose={onInviteClose}/>
      </Popover>
    );
};

export default UserAutocomplete;