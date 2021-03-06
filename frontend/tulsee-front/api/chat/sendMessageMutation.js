import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const sendMessage = async(payload) => {
    const {projectId, text,sender } = payload
    const {data} = await axios.post(`${getBaseUrl()}/messages/${projectId}`,{text,sender})
    return data;
}

export const useSendMessage = () => {
    return useMutation(payload => sendMessage(payload))
}