import {useMutation} from 'react-query'
import axios from 'axios'


const updateTask = async(payload) => {
    const {id,request} = payload
    const {data} = await axios.patch(`http://localhost:3001/task/${id}`,request)
    return data;
}

export const useUpdateTask = () => {
    return useMutation(payload => updateTask(payload))
}