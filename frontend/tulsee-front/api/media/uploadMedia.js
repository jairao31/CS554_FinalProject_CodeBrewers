import {useMutation} from 'react-query'
import axios from 'axios'


const upload = async(payload) => {
    const {data} = await axios.post(`http://localhost:3001/media/`,payload)
    return data;
}

export const useUploadMedia = () => {
    return useMutation(payload => upload(payload))
}