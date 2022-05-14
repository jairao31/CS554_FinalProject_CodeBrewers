import {useQuery} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const getUser = async publicId => {
    const {data} = await axios.get(`${getBaseUrl()}/user/login/${publicId}`)
    return data
}

export const useGetUser = (publicId,isEnabled) => {
    return useQuery(['getUser',publicId], () => getUser(publicId), {
        enabled: isEnabled
    })
}
