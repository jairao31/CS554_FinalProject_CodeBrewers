import {useQuery} from 'react-query'
import axios from 'axios'


const getTasks = async publicId => {
    const {data} = await axios.get(`http://localhost:3001/task/project/${publicId}`)
    return data
}

export const useGetTasksByProject = (publicId,isEnabled) => {
    return useQuery('getTasksByProject', () => getTasks(publicId), {
        enabled: isEnabled
    })
}
