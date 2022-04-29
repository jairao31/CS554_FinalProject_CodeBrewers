import {useMutation} from 'react-query'
import axios from 'axios'


const acceptRejectInvite = async(payload) => {
    const {userId,projectId,status} = payload
    const {data} = await axios.patch(`http://localhost:3001/project/invite/update/${userId}/${projectId}/${status}`,payload)
    return data;
}

export const useAcceptRejectInvite = () => {
    return useMutation(payload => acceptRejectInvite(payload))
}