import {useMutation} from 'react-query'
import axios from 'axios'


const editUser = async(payload) => {
    const {id, details} = payload
    const {data} = await axios.patch(`http://localhost:3001/user/${id}`,details)
    return data;
}

export const useEditUser = () => {
    return useMutation(payload => editUser(payload))
}