import {useMutation} from 'react-query'
import axios from 'axios'
import { getBaseUrl } from '../base';


const createProject = async(payload) => {
    const {data} = await axios.post(`${getBaseUrl()}/project/`,payload)
    return data;
}

export const useCreateProject = () => {
    return useMutation(payload => createProject(payload))
}