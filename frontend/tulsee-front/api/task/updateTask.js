import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const updateTask = async(payload) => {
    const {id,request} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/task/${id}`,request)
    return data;
}

export const useUpdateTask = () => {
    return useMutation(payload => updateTask(payload))
}