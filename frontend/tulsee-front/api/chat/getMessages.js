import {useQuery} from 'react-query'
import axios from 'axios'


const getMessages = async projectId => {
    const {data} = await axios.get(`http://localhost:3001/messages/${projectId}`)
    return data
}

export const useGetMessages = (projectId,isEnabled) => {
    return useQuery('getMessages', () => getMessages(projectId), {
        enabled: isEnabled
    })
}
