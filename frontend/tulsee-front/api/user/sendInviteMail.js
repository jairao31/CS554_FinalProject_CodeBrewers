import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const sendInviteMail = async(payload) => {
    const {data} = await axios.post(`${getBaseUrl()}/user/invite/email`,payload)
    return data;
}

export const useSendInviteMail = () => {
    return useMutation(payload => sendInviteMail(payload))
}