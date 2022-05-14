import Layout from "../../../Components/Common/layout";
import ProjectLayout from "../../../Components/Common/ProjectLayout";
// import TopNavBar from '../../../Components/Common/TopNavBar';
// import "bootstrap/dist/css/bootstrap.min.css";// import "./App.css";
import { FiExternalLink } from "react-icons/fi";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Image } from "@chakra-ui/react";
import { UserContext } from "../../../Components/Contexts/UserContext";
import { AiOutlineClear } from "react-icons/ai";
import { ImLink } from "react-icons/im";
import { MdOutlineDownloadDone } from "react-icons/md";
import copy from "copy-to-clipboard";
import ChatBox from "../../../Components/Chat/ChatBox";
// import { useRouter } from 'next/router';

const Meet = () => {
  // const [username, setUsername] = useState("");
  const [urlState, setUrl] = useState("");
  const { UserDetails } = useContext(UserContext);
  const [copyStatus, setCopyStatus] = useState(false);
  // const {push} = useRouter()
  const [copyText, setCopyText] = useState("");

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const zoomMeeting = () => {
    const data = {
      email: "saurabhmane7120@outlook.com",
    };
    axios
      .post(`http://localhost:3001/meet`, data)
      .then((response) => {
        console.log(
          UserDetails.displayName,
          "MEET RESPONSE==================="
        );
        let URL =
          response.data.join_url.replaceAll(
            "https://us04web.zoom.us/j/",
            "http://localhost:9996/?"
          ) + `?role=0?name=${UserDetails.displayName}`;
        console.log(URL);
        let result = URL.slice(URL.length - UserDetails.displayName.length);
        if (result === UserDetails.displayName) {
          console.log(result, "TRUE");
          setUrl(URL);
          setCopyText(URL);
        } else {
          console.log(result, "else");
          setUrl("Please enter username for zoomMeeting");
        }
        //window.location.replace(`${URL}`);
      })
      .catch((err) => console.error(err));
  };
  const copyToClipboard = () => {
    copy(copyText);
    setCopyStatus(true);
    // alert(`You have copied "${copyText}"`);
  };
  return (
    <Layout>
      <ProjectLayout activePage={"meet"}>
        <div className="zoomApp">
          <header
            className="App-header"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
            }}
          >
            {/* <img src='\ZoomTu.png'/> */}
            ZoomTu Meeting
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
              {urlState ? (
                <Button className="zoomButton" onClick={zoomMeeting}>
                  Create New Meeting
                </Button>
              ) : (
                <Button className="zoomButton" onClick={zoomMeeting}>
                  Create Meeting
                </Button>
              )}
              {urlState ? (
                <Button
                  onClick={() => {
                    setUrl("");
                    setCopyStatus(false);
                  }}
                  style={{ margin: "10px" }}
                  rightIcon={<AiOutlineClear size={"20px"} />}
                >
                  {" "}
                  Clear{" "}
                </Button>
              ) : (
                " "
              )}{" "}
              <br />
              <br />
              {urlState
                ? `${UserDetails.displayName} : ${urlState}`
                : "  "}{" "}
              <br />
              <br />
              {urlState.length !== 0 ? (
                <Button onClick={<ChatBox />}>Send to Chat</Button>
              ) : (
                ""
              )}
              {urlState.length !== 0 && !copyStatus ? (
                <Button onClick={copyToClipboard} rightIcon={<ImLink />}>
                  Copy Link
                </Button>
              ) : (
                ""
              )}
              {copyStatus ? (
                <Button
                  onClick={copyToClipboard}
                  rightIcon={<MdOutlineDownloadDone size={"20px"} />}
                >
                  Link Copied
                </Button>
              ) : (
                ""
              )}
              {urlState.length !== 0 ? (
                <Button
                  style={{ margin: "10px" }}
                  onClick={() =>
                    window.open(
                      urlState,
                      "popUpWindow",
                      "height=400,width=600,left=10,top=10,scrollbars=yes,menubar=no"
                    )
                  }
                  rightIcon={<FiExternalLink />}
                >
                  Connect
                </Button>
              ) : (
                ""
              )}{" "}
              <br />
            </div>
            <Image
              alt='zoom'
              mx='auto'
              mt='100px'
              width={'600px'}
              src='/zoomTu.svg'
            />
          </div>
        </div>
      </ProjectLayout>
    </Layout>
  );
};

export default Meet;
