import React from "react";
import { useState, useEffect, useContext } from "react";
import { Button, Box } from "@chakra-ui/react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
} from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { UserContext } from "../Contexts/UserContext";

const MediaContainer = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const { query } = useRouter();
  const { UserDetails } = useContext(UserContext);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `projects/${query.projectId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded!");
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        getMetadata(imageRef).then((metadata) => {
          console.log(metadata);
        });
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
  );
};

export default MediaContainer;
