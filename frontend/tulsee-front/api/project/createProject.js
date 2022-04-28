import {useMutation} from 'react-query'
import axios from 'axios'


const createProject = async(payload) => {
    const {data} = await axios.post(`http://localhost:3001/project/`,payload)
    return data;
}

export const useCreateProject = () => {
    return useMutation(payload => createProject(payload))
}