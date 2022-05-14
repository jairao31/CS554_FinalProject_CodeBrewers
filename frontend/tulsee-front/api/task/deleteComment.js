import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const deleteComment = async(payload) => {
    const {taskId, commentId} = payload
    const {data} = await axios.delete(`${getBaseUrl()}/task/comment/${taskId}/${commentId}`)
    return data;
}

export const useDeleteComment = () => {
    return useMutation(payload => deleteComment(payload))
}