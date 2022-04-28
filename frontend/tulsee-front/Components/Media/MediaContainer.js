import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Image,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
  listAll,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { UserContext } from "../Contexts/UserContext";
import { useUploadMedia } from "../../api/media/uploadMedia";
import { useDeleteMedia } from "../../api/media/deleteMedia";
// import "../../styles/globals.css";

const MediaContainer = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  //   const [imageDelete, SetImageDelete] = useState(null);

  const { query } = useRouter();
  const { UserDetails } = useContext(UserContext);

  const { mutate: uploadMd } = useUploadMedia();
    const {mutate: deleteMedia } = useDeleteMedia();

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
          setImageUrls((prev) => [...prev, { ...metadata, url }]);
        });
      });
    });
  };

  const deleteFile = (name) => {
    if (name == null) return;
    const deleteRef = ref(storage, `projects/${query.projectId}/${name}`);
    deleteObject(deleteRef).then(() => {
      deleteMedia({})
      let curr = imageUrls;
      curr = curr.filter((i) => i.name !== name);
      setImageUrls(curr);
    });
  };

  useEffect(() => {
    if (!query) return;
    const imagesListRef = ref(storage, `projects/${query.projectId}`);
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          getMetadata(item).then((res) => {
            setImageUrls((prev) => [...prev, { ...res, url }]);
          });
        });
      });
    });
  }, [query]);

  return (
    <Box maxH={"100vh"} overflowY="auto">
      <Center>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <Button onClick={uploadFile}>Upload</Button>
      </Center>

      {imageUrls.map((img) => {
        return (
          <Box
            role={"group"}
            p={6}
            maxW={"330px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
            mb={2}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={img.url}
            />
            <Button onClick={() => deleteFile(img.name)}>Delete</Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default MediaContainer;
