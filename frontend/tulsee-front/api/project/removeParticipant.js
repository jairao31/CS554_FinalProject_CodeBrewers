import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const removeParticipant = async(payload) => {
    const {projectId, userId} = payload;
    const {data} = await axios.patch(`${getBaseUrl()}/project/participant/remove/${projectId}/${userId}`)
    return data;
}

export const useRemoveParticipant = () => {
    return useMutation(payload => removeParticipant(payload))
}