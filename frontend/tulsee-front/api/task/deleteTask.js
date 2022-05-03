import {useMutation} from 'react-query'
import axios from 'axios'


const deleteTask = async(id) => {
    const {data} = await axios.delete(`http://localhost:3001/task/${id}`)
    return data;
}

export const useDeleteTask = () => {
    return useMutation(id => deleteTask(id))
}