import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getProjects = async userId => {
    const {data} = await axios.get(`${getBaseUrl()}/project/byUser/${userId}`)
    return data
}

export const useGetAllProjects = (userId,isEnabled) => {
    return useQuery('getAllProjects', () => getProjects(userId), {
        enabled: isEnabled
    })
}
