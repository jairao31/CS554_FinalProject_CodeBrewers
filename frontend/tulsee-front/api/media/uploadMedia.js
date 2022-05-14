import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const upload = async(payload) => {
    const {data} = await axios.post(`${getBaseUrl()}/media/`,payload)
    return data;
}

export const useUploadMedia = () => {
    return useMutation(payload => upload(payload))
}