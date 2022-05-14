import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getUsers = async query => {
    const {data} = await axios.get(`${getBaseUrl()}/user/autoComplete/${query}`)
    console.log(data)
    return data
}

export const useAutocompleteUser = (query,isEnabled) => {
    return useQuery('getUsers', () => getUsers(query), {
        enabled: isEnabled
    })
}
