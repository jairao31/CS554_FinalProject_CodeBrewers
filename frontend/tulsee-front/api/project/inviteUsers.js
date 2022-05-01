import {useMutation} from 'react-query'
import axios from 'axios'


const inviteUsers = async(payload) => {
    const {users,projectId} = payload
    const {data} = await axios.patch(`http://localhost:3001/project/invite/${projectId}`,{users})
    return data;
}

export const useInviteUsers = () => {
    return useMutation(payload => inviteUsers(payload))
}