import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const createUser = async(payload) => {
    const {data} = await axios.post(`${getBaseUrl()}/user/signup`,payload)
    return data;
}

export const useCreateUser = () => {
    return useMutation(payload => createUser(payload))
}