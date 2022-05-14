import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const editUser = async(payload) => {
    const {id, details} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/user/${id}`,details)
    return data;
}

export const useEditUser = () => {
    return useMutation(payload => editUser(payload))
}