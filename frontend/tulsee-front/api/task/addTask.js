import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const addTask = async(payload) => {
    const {data} = await axios.post(`${getBaseUrl()}/task/`,payload)
    return data;
}

export const useAddTask = () => {
    return useMutation(payload => addTask(payload))
}