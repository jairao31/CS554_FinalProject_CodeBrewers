import {useQuery} from 'react-query'
import axios from 'axios'


const getTasks = async publicId => {
    try {
        const {data} = await axios.get(`http://localhost:3001/task/project/${publicId}`)
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
