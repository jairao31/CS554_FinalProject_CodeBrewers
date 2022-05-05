import {useQuery} from 'react-query'
import axios from 'axios'


const getUser = async publicId => {
    const {data} = await axios.get(`http://localhost:3001/user/login/${publicId}`)
    return data
}

export const useGetUser = (publicId,isEnabled) => {
    return useQuery(['getUser',publicId], () => getUser(publicId), {
        enabled: isEnabled
    })
}
