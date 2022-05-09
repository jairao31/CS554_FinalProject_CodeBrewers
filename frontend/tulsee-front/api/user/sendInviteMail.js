import {useMutation} from 'react-query'
import axios from 'axios'


const sendInviteMail = async(payload) => {
    const {data} = await axios.post(`http://localhost:3001/user/invite/email`,payload)
    return data;
}

export const useSendInviteMail = () => {
    return useMutation(payload => sendInviteMail(payload))
}