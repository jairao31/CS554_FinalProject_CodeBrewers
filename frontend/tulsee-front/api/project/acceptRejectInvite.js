import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const acceptRejectInvite = async(payload) => {
    const {userId,projectId,status} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/project/invite/update/${userId}/${projectId}/${status}`,payload)
    return data;
}

export const useAcceptRejectInvite = () => {
    return useMutation(payload => acceptRejectInvite(payload))
}