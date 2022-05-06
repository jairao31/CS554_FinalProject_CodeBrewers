import {useMutation} from 'react-query'
import axios from 'axios'


const deleteComment = async(payload) => {
    const {taskId, commentId} = payload
    const {data} = await axios.delete(`http://localhost:3001/task/comment/${taskId}/${commentId}`)
    return data;
}

export const useDeleteComment = () => {
    return useMutation(payload => deleteComment(payload))
}