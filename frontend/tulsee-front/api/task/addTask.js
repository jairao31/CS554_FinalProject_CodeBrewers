import {useMutation} from 'react-query'
import axios from 'axios'


const addTask = async(payload) => {
    const {data} = await axios.post(`http://localhost:3001/task/`,payload)
    return data;
}

export const useAddTask = () => {
    return useMutation(payload => addTask(payload))
}