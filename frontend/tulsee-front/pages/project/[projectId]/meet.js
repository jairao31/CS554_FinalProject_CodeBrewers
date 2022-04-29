// import React from 'react';
import Layout from '../../../Components/Common/layout';
import ProjectLayout from '../../../Components/Common/ProjectLayout';
import TopNavBar from '../../../Components/Common/TopNavBar';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import {Button, Input} from "@chakra-ui/react"
const Meet = () => {
    const [username, setUsername] = useState("");
    
    const [urlState, setUrl] = useState();
    const zoomMeeting = () => {
      const data = {
        email: "saurabhmane7120@outlook.com",
      };
      console.log(username);
      axios.post(`http://localhost:3001/meet`, data)
        .then((response) => {
          console.log(response,"MEET RESPONSE===================")
          let URL =
            response.data.join_url.replaceAll(
              "https://us04web.zoom.us/j/",
              "http://localhost:9996/?"
            ) + `?role=0?name=${username}`;
          console.log(URL);
          setUrl(URL);
          //window.location.replace(`${URL}`);
        })
        .catch((err) => console.error(err));
    };
    return (
        <Layout>
            <ProjectLayout activePage={'meet'}>
            {/* Your coomponent here */}
            this is meet page
            </ProjectLayout>
        </Layout>
    );
};

export default Meet;