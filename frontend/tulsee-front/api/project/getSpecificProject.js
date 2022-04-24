import {useQuery} from 'react-query'
import axios from 'axios'


const getProjectById = async projectId => {
    const {data} = await axios.get(`http://localhost:3001/project/${projectId}`)
    return data
}

export const useGetProjectById = (projectId,isEnabled) => {
    return useQuery('getProjectById', () => getProjectById(projectId), {
        enabled: isEnabled
    })
}
