import {useMutation} from 'react-query'
import axios from 'axios'


const editProject = async(payload) => {
    const {data} = await axios.put(`http://localhost:3001/project/${payload.publicId}`,payload)
    return data;
}

export const useEditProject = () => {
    return useMutation(payload => editProject(payload))
}