import {useMutation} from 'react-query'
import axios from 'axios'


const sendMessage = async(payload) => {
    const {projectId, text,sender } = payload
    const {data} = await axios.post(`http://localhost:3001/messages/${projectId}`,{text,sender})
    return data;
}

export const useSendMessage = () => {
    return useMutation(payload => sendMessage(payload))
}