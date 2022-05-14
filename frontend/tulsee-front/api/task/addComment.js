import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const addComment = async(payload) => {
    const {taskId, comment} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/task/comment/${taskId}`,comment)
    return data;
}

export const useAddComment = () => {
    return useMutation(payload => addComment(payload))
}