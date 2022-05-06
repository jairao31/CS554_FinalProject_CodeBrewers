import {useMutation} from 'react-query'
import axios from 'axios'


const addComment = async(payload) => {
    const {taskId, comment} = payload
    const {data} = await axios.patch(`http://localhost:3001/task/comment/${taskId}`,comment)
    return data;
}

export const useAddComment = () => {
    return useMutation(payload => addComment(payload))
}