import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const deleteTask = async(id) => {
    const {data} = await axios.delete(`${getBaseUrl()}/task/${id}`)
    return data;
}

export const useDeleteTask = () => {
    return useMutation(id => deleteTask(id))
}