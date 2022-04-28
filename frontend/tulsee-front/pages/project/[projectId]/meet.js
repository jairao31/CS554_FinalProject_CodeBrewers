// import React from 'react';
import Layout from '../../../Components/Common/layout';
import TopNavBar from '../../../Components/Common/TopNavBar';

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const Meet = () => {
    const [username, setUsername] = useState("");
    
    const [urlState, setUrl] = useState(0);
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
            <TopNavBar activePage="meet" title={'Project Name'}/>
            {/* Your coomponent here */}
            this is meet page
        
            <div className="App">
                <header className="App-header">
                {/* <Student /> */}
                <h1>Zoom Meeting</h1>
                <div className="card">
                    <h5>
                    Name&nbsp;&nbsp;
                    <input
                        type="text"
                        name="name"
                        style={{
                        width: "300px",
                        borderRadius: "5px",
                        padding: "8px 12px",
                        fontSize: "18px",
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </h5>
        
                    <div className="row" style={{ margin: "10px" }}>
                    <div className="column">
                        <div
                        className="row"
                        style={{ margin: "10px", marginTop: "120px" }}
                        >
                        <button
                            className="btn btn-info"
                            style={{
                              width: "290px",
                              height: "80px",
                              fontSize: "20px",
                              fontFamily: "cursive",
                            }}
                            onClick={zoomMeeting}
                        >
                            Create Meeting
                        </button>
                        <h2>{username}:{urlState}</h2>
                        </div>
                    </div>
                    <div className="column" style={{ float: "right" }}>
                        <img
                        src="\meeting.png"
                        height="330px"
                        width="400px"
                        style={{
                            margin: "10px",
                            borderRadius: "50px",
                        }}
                        alt=""
                        />
                    </div>
                    </div>
                </div>
                </header>
            </div>
      </Layout>
    );
};

export default Meet;