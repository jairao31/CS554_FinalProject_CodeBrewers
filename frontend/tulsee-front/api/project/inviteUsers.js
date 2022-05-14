import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const inviteUsers = async(payload) => {
    const {users,projectId} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/project/invite/${projectId}`,{users})
    return data;
}

export const useInviteUsers = () => {
    return useMutation(payload => inviteUsers(payload))
}