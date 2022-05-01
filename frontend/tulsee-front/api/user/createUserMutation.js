import {useMutation} from 'react-query'
import axios from 'axios'


const createUser = async(payload) => {
    const {data} = await axios.post('http://localhost:3001/user/signup',payload)
    return data;
}

export const useCreateUser = () => {
    return useMutation(payload => createUser(payload))
}