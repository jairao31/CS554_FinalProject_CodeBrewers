import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const deleteMedia = async(payload) => {
    const {projectId, mediaId} = payload
    const {data} = await axios.delete(`${getBaseUrl()}/media/project/${projectId}/${mediaId}`)
    return data;
}

export const useDeleteMedia = () => {
    return useMutation(payload => deleteMedia(payload))
}