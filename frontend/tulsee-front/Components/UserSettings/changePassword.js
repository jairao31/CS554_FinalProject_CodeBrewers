import { Button, Text, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import CommonInput from '../Common/CommonInput';
import { UserContext } from '../Contexts/UserContext';

const ChangePassword = () => {

    const [details,setDetails] = useState({})

    const {changePassword} = useContext(UserContext)

    const toast = useToast()

    const handleChange = (value,name) => {
        setDetails(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const {currentPassword, newPassword, confirmPassword} = details
        if(currentPassword.trim().length === 0 ||
            newPassword.trim().length === 0 ||
            confirmPassword.trim().length === 0
        ) {
            toast({title: "Please fill all the fields", status: "warning", duration: 2000});
            return
        }
        if(newPassword.length < 6) {
            toast({title: "password should be of atleast 6 characters", status: "warning", duration: 2000});
            return
        }
        if(newPassword !== confirmPassword) {
            toast({title: "password and confirm password does not match", status: "warning", duration: 2000});
            return
        }
        changePassword(details.currentPassword, newPassword)
        setDetails({})
    }

    return (
        <form style={{width:'40%', paddingBottom:'20px'}} onSubmit={handleSubmit}>
            <Text mt={5} fontSize={'lg'} fontWeight='bold' mb={4}>Change Password</Text>
                <CommonInput
                    label="Current Password"
                    name="currentPassword"
                    value={details.currentPassword || ''}
                    onChange={handleChange}
                    type='password'
                    isRequired
                    helperText={'If account created using google signIn, your password must be <firstName>1234'}
                />
                <CommonInput
                    label="New Password"
                    name="newPassword"
                    value={details.newPassword || ''}
                    onChange={handleChange}
                    type='password'
                    isRequired
                    helperText={'atleast 6 characters long'}
                />
                <CommonInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={details.confirmPassword || ''}
                    onChange={handleChange}
                    type='password'
                    isRequired
                />
                <Button type='submit' variant={'outline'} >Change Password</Button>
            </form>
    );
};

export default ChangePassword;