import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base'


const uploadPhoto = async(payload) => {
    const {userId, formData} = payload
    const {data} = await axios.patch(`${getBaseUrl()}/user/profileImage/${userId}`,formData)
    return data;
}

export const useUploadProfilePhoto = () => {
    return useMutation(payload => uploadPhoto(payload))
}