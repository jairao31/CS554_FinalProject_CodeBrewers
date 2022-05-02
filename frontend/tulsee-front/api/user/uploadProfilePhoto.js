import {useMutation} from 'react-query'
import axios from 'axios'


const uploadPhoto = async(payload) => {
    const {userId, formData} = payload
    const {data} = await axios.patch(`http://localhost:3001/user/profileImage/${userId}`,formData)
    return data;
}

export const useUploadProfilePhoto = () => {
    return useMutation(payload => uploadPhoto(payload))
}