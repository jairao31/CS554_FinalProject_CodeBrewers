import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const editProject = async(payload) => {
    const {data} = await axios.put(`${getBaseUrl()}/project/${payload.publicId}`,payload)
    return data;
}

export const useEditProject = () => {
    return useMutation(payload => editProject(payload))
}