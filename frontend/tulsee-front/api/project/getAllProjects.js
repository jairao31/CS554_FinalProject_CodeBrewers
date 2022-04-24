import {useQuery} from 'react-query'
import axios from 'axios'


const getProjects = async userId => {
    const {data} = await axios.get(`http://localhost:3001/project/byUser/${userId}`)
    return data
}

export const useGetAllProjects = (userId,isEnabled) => {
    return useQuery('getAllProjects', () => getProjects(userId), {
        enabled: isEnabled
    })
}
