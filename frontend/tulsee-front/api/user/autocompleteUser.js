import {useQuery} from 'react-query'
import axios from 'axios'


const getUsers = async query => {
    const {data} = await axios.get(`http://localhost:3001/user/autoComplete/${query}`)
    console.log(data)
    return data
}

export const useAutocompleteUser = (query,isEnabled) => {
    return useQuery('getUsers', () => getUsers(query), {
        enabled: isEnabled
    })
}
