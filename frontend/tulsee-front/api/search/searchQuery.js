import {useQuery} from 'react-query'
import axios from 'axios'


const searchQuery = async (query,type) => {
    const {data} = await axios.get(`http://localhost:3001/search/${query}/${type}`)
    return data
}

export const useSearchQuery = (query,type,isEnabled) => {
    return useQuery('searchQuery', () => searchQuery(query,type), {
        enabled: isEnabled
    })
}
