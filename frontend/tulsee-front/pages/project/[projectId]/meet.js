import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';
// import TopNavBar from '../../../Components/Common/TopNavBar';
// import "bootstrap/dist/css/bootstrap.min.css";// import "./App.css"; 
import {FiExternalLink } from 'react-icons/fi'
import React, { useState, useContext } from "react";
import axios from "axios";
import {Button, Input} from "@chakra-ui/react"
import { UserContext } from '../../../Components/Contexts/UserContext';
// import { useRouter } from 'next/router';

const Meet = () => {
    // const [username, setUsername] = useState("");
    const [urlState, setUrl] = useState("");
    const {UserDetails} = useContext(UserContext)
    // const {push} = useRouter()
    const zoomMeeting = () => {
      const data = {
        email: "saurabhmane7120@outlook.com",
      };
      axios.post(`http://localhost:3001/meet`, data)
        .then((response) => {
          console.log(UserDetails.displayName,"MEET RESPONSE===================")
          let URL =
            response.data.join_url.replaceAll(
              "https://us04web.zoom.us/j/",
              "http://localhost:9996/?"
            ) + `?role=0?name=${UserDetails.displayName}`;
          console.log(URL);
          let result = URL.slice(URL.length-UserDetails.displayName.length);
          if(result===UserDetails.displayName){
            console.log(result,"TRUE")
            setUrl(URL);
          }else{
            console.log(result,"else")
            setUrl("Please enter username for zoomMeeting")
          }
          //window.location.replace(`${URL}`);
        })
        .catch((err) => console.error(err));
    };
    
    return (
        <Layout>
          <ProjectLayout activePage={'meet'}>
            <div className="zoomApp">
                <header className="App-header">
                  <h1>
                    {/* <img src='\ZoomTu.png'/> */}
                  Zoom Meeting</h1>
                </header>
                    <h5>
                    {/* Name&nbsp;&nbsp; */}
                    {/* <Input
                        type="name"
                        placeholder={UserDetails} && {UserDetails.displayName}
                        aria-label="Name"
                        name='firstName'
                        style={{
                            width: "300px",
                            borderRadius: "5px",
                            padding: "8px 12px",
                            fontSize: "18px",
                            }}
                        onChange={(e) => {setUsername(e.target.value); setUrl("")}}
                        value={username}
                    /> */}
                    </h5>
                    <div className="column">
                        <div style={{ margin: "10px", padding: "10px" }}>
                        <Button
                            className="btn btn-info"
                            onClick={zoomMeeting}
                        >
                            Create Meeting Link
                        </Button>
                        <h2>{urlState ? `${UserDetails.displayName} : ${urlState}` : '  '}</h2>
                        {urlState.length !== 0? <Button onClick={() => window.open(urlState,'popUpWindow','height=400,width=600,left=10,top=10,scrollbars=yes,menubar=no')} rightIcon={<FiExternalLink />}>Connect 
                        </Button> : ''}
                        {/* <Button onClick={()=>{urlState}}>
                          Connect
                        </Button> */}
                        </div>
                        <img
                        src="\meeting.png"
                        height="230px"
                        width="200px"
                        style={{
                            margin: "10px",
                            borderRadius: "50px",
                        }}
                        alt=""
                        />
                    </div>
            </div>
            </ProjectLayout>
      </Layout>
    );
};

export default Meet;