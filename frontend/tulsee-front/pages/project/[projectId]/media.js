import React from 'react';
import { useState, useEffect } from "react";
import { Input, Button, Flex, Text, VStack, Box } from "@chakra-ui/react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import Layout from "../../../Components/Common/layout";
import TopNavBar from "../../../Components/Common/TopNavBar";

const Media = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const { query } = useRouter();


  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `projects/${query.projectId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded!");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    if (!query) return;
    const imagesListRef = ref(storage, `projects/${query.projectId}`);
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [query]);

  return (
    <Layout>
      <TopNavBar activePage="media" title={"Project Name"} />
      <Box maxH={"100vh"} overflowY="auto">
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
          return <img src={url} />;
        })}
      </Box>
    </Layout>
  );
};;;

export default Media;