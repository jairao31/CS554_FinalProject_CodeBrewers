import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getProjectById = async projectId => {
    const {data} = await axios.get(`${getBaseUrl()}/project/${projectId}`)
    return data
}

export const useGetProjectById = (projectId,isEnabled) => {
    return useQuery('getProjectById', () => getProjectById(projectId), {
        enabled: isEnabled
    })
}
