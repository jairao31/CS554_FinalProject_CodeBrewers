import {useMutation} from 'react-query'
import axios from 'axios'


const deleteMedia = async(payload) => {
    const {projectId, mediaId} = payload
    const {data} = await axios.delete(`http://localhost:3001/media/project/${projectId}/${mediaId}`)
    return data;
}

export const useDeleteMedia = () => {
    return useMutation(payload => deleteMedia(payload))
}