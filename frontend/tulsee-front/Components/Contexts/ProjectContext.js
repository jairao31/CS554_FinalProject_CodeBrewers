import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React,{ createContext, useContext, useEffect, useState } from "react";
import { useCreateProject } from "../../api/project/createProject";
import { useGetAllProjects } from "../../api/project/getAllProjects";
import { UserContext } from "./UserContext";

export const ProjectContext = createContext()

const ProjectContextProvider = ({children}) => {

    const [groupProjects, setGroupProjects] = useState([])
    const [personalProjects, setPersonalProjects] = useState([])
    const [currentProject, setCurrentProject] = useState()

    const toast = useToast()

    const {query} = useRouter()

    const {userID} = useContext(UserContext);
    
    const {data: Projects} = useGetAllProjects(userID, !!userID)

    const {mutate: createProject} = useCreateProject()

    useEffect(() => {
        if(!query) return
        const {projectId} = query;
        if(!projectId || !Projects) return
        const allProjects = [...groupProjects, ...personalProjects]
        const exist = allProjects.find(i => i.publicId === projectId);
        console.log(exist);
        if(exist) {
            setCurrentProject(exist)
        }else{
            console.log("No such project exists!");
        }
    },[query,groupProjects,personalProjects])

    useEffect(() => {
        if(!Projects) return
        setGroupProjects(Projects.filter(i => i.type === 'Group'))
        setPersonalProjects(Projects.filter(i => i.type === 'Personal'))
    },[Projects])

    const addProject = payload => {
        createProject(payload, {
            onSuccess: d => {
                console.log(d);
                if(d.type === "Group") {
                    setGroupProjects(prev => {
                        return [d,...prev]
                    })
                }else{
                    setPersonalProjects(prev => {
                        return [d,...prev]
                    })
                }
                toast({title:"Project created successfully", status:"success", duration: 2000});
            },
            onError: e => {
                console.log(e)
                toast({title:"Project could not be created", status:"error", duration: 2000});
            }
        })
    }
 
    return <ProjectContext.Provider value={{groupProjects, personalProjects, addProject, currentProject, setGroupProjects}}>
        {children}
    </ProjectContext.Provider>
}

export default ProjectContextProvider