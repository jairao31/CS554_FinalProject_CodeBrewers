import React from 'react';
import { useState, useEffect } from "react";
import { Input, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import Layout from "../../../Components/Common/layout";
import TopNavBar from "../../../Components/Common/TopNavBar";

const Media = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "projects/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `projects/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <Layout>
      <TopNavBar activePage="media" title={"Project Name"} />
      this is media page
      <center>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <Button onClick={uploadFile}>Upload</Button>
      </center>
      {imageUrls.map((url) => {
        return <img className="media" src={url} />;
      })}
    </Layout>
  );
};;;

export default Media;