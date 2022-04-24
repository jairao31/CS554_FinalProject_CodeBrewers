import React,{ createContext, useContext, useEffect, useState } from "react";
import { useGetAllProjects } from "../../api/project/getAllProjects";
import { UserContext } from "./UserContext";

export const ProjectContext = createContext()

const ProjectContextProvider = ({children}) => {

    const [groupProjects, setGroupProjects] = useState([])
    const [personalProjects, setPersonalProjects] = useState([])

    const {userID} = useContext(UserContext);
    
    const {data: Projects} = useGetAllProjects(userID, !!userID)

    useEffect(() => {
        if(!Projects) return
        console.log(Projects);
    },[Projects])
 
    return <ProjectContext.Provider>
        {children}
    </ProjectContext.Provider>
}

export default ProjectContextProvider