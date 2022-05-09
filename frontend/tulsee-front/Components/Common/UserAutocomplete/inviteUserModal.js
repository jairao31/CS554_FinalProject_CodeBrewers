import React, { useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    useToast,
  } from '@chakra-ui/react'
import CommonInput from '../CommonInput';
import { useSendInviteMail } from '../../../api/user/sendInviteMail';
import { UserContext } from '../../Contexts/UserContext';

const InviteUserModal = ({isOpen,onClose}) => {

    const [reciever, setReciever] = useState('');

    const {UserDetails} = useContext(UserContext)

    const {mutate: sendMail, isLoading} = useSendInviteMail()

    const toast = useToast()

    const handleSubmit = () => {
        const {displayName, email} = UserDetails
        sendMail({
            sender: {
                displayName,
                email
            },
            reciever
        },{
            onSuccess: d => {
                toast({title:'Invite sent successfully', status: 'success', duration: 2000})
                onClose()
            },
            onError: e => {
                console.log(e);
                toast({title:'Something went wrong', status: 'error', duration: 2000})
            }
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send an invite</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                    <CommonInput
                        label="Email Address"
                        placeholder={'Enter the email of your friend'}
                        value={reciever}
                        onChange={value => setReciever(value)}
                        type='email'
                        helperText={"We will send an invitation to your friend to join TULSEE on youre behalf"}
                    />
          </ModalBody>

          <ModalFooter>
            <Button isLoading={isLoading} onClick={handleSubmit} >Send Invite</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default InviteUserModal;