import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getMessages = async projectId => {
    const {data} = await axios.get(`${getBaseUrl()}/messages/${projectId}`)
    return data
}

export const useGetMessages = (projectId,isEnabled) => {
    return useQuery('getMessages', () => getMessages(projectId), {
        enabled: isEnabled
    })
}
