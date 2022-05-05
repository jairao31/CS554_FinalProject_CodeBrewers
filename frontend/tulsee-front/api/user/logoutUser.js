import {useMutation} from 'react-query'
import axios from 'axios'


const logoutUser = async(userId) => {
    const {data} = await axios.get(`http://localhost:3001/user/logout/${userId}`)
    return data;
}

export const useLogoutUser = () => {
    return useMutation(userId => logoutUser(userId))
}