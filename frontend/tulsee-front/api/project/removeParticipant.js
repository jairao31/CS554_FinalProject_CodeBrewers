import {useMutation} from 'react-query'
import axios from 'axios'


const removeParticipant = async(payload) => {
    const {projectId, userId} = payload;
    const {data} = await axios.patch(`http://localhost:3001/project/participant/remove/${projectId}/${userId}`)
    return data;
}

export const useRemoveParticipant = () => {
    return useMutation(payload => removeParticipant(payload))
}