import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const logoutUser = async(userId) => {
    const {data} = await axios.get(`${getBaseUrl()}/user/logout/${userId}`)
    return data;
}

export const useLogoutUser = () => {
    return useMutation(userId => logoutUser(userId))
}