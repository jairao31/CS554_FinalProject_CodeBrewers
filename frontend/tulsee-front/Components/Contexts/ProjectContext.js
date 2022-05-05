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
    const [archivedProjects, setArchivedProjects] = useState([])
    const [currentProject, setCurrentProject] = useState()

    const toast = useToast()

    const {query,push} = useRouter()

    const {userID} = useContext(UserContext);
    
    const {data: Projects} = useGetAllProjects(userID, !!userID)

    const {mutate: createProject} = useCreateProject()

    useEffect(() => {
        if(!query) return
        const {projectId} = query;
        if(!projectId || !Projects) return
        const allProjects = [...groupProjects, ...personalProjects, ...archivedProjects]
        const exist = allProjects.find(i => i.publicId === projectId);
        console.log(exist);
        if(exist) {
            if(exist.archived) {
                toast({title: "Owner has archived this project!", status: 'warning', duration: 2000});
                push('/')
                return
            }
            let userExist = exist.participants.find(i => i.publicId === userID);
            if(!userExist) {
                toast({title: "You don't have access to this project!", status: 'error', duration: 2000});
                push('/')
                return
            }
            setCurrentProject(exist)
        }else{
            toast({title: "Either such a project don't exist or you don't have authorization to access it!", status: 'error', duration: 3000});
            push('/')
        }
    },[query,groupProjects,personalProjects, archivedProjects])

    useEffect(() => {
        if(!Projects) return
        let a = []
        let p = []
        let g = []
        Projects.forEach(project => {
            if(project.archived && project.createdBy.publicId === userID) {
                a.push(project)
            }else{
                if (project.type === 'Group') {
                    g.push(project)
                }else{
                    p.push(project)
                }
            }
        });
        setArchivedProjects(a)
        setGroupProjects(g)
        setPersonalProjects(p)
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
 
    const archiveProj = project => {
        if(project.type === 'Group') {
            setGroupProjects(prev => {
                return prev.filter(i => i.publicId !== project.publicId)
            })
        }else{
            setPersonalProjects(prev => {
                return prev.filter(i => i.publicId !== project.publicId)
            })
        }
        setArchivedProjects(prev =>  {
            return [project,...prev]
        })
    }

    const restoreProj = project => {
        if(project.type === 'Group') {
            setGroupProjects(prev => {
                return [...prev, project]
            })
        }else{
            setPersonalProjects(prev => {
                return [...prev, project]
            })
        }
        setArchivedProjects(prev =>  {
            return prev.filter(i => i.publicId !== project.publicId)
        })
    }

    return <ProjectContext.Provider 
        value={{
            groupProjects, 
            personalProjects, 
            archivedProjects,
            addProject, 
            currentProject, 
            setGroupProjects, 
            setCurrentProject, 
            setPersonalProjects,
            archiveProj,
            restoreProj
        }}>
        {children}
    </ProjectContext.Provider>
}

export default ProjectContextProvider