import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getTasks = async publicId => {
    try {
        const {data} = await axios.get(`${getBaseUrl()}/task/project/${publicId}`)
        return data
    } catch (error) {
        throw new Error('something went wrong')
    }

}

export const useGetTasksByProject = (publicId,isEnabled) => {
    return useQuery(['getTasksByProject',publicId], () => getTasks(publicId), {
        enabled: isEnabled
    })
}
