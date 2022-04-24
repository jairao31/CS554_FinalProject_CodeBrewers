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
import { useUploadMedia } from "../../api/media/uploadMedia";

const MediaContainer = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const { query } = useRouter();
  const { UserDetails } = useContext(UserContext);

  const { mutate: uploadMd } = useUploadMedia();

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `projects/${query.projectId}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        getMetadata(imageRef).then((metadata) => {
          uploadMd(
            {
              type: metadata.type,
              url: url,
              timeCreated: metadata.timeCreated,
              uploadedBy: UserDetails.publicId,
              projectId: query.projectId,
            },
            {
              onSuccess: (d) => {
                alert("Image Uploaded!");
              },
              onError: (e) => {
                console.log(e);
              },
            }
          );
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
