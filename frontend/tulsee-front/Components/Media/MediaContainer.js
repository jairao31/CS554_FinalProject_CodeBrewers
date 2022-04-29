import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Image,
  useColorModeValue,
  Center,
  Input,
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

const MediaContainer = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // const [imageDelete, SetImageDelete] = useState(null);

  const { query } = useRouter();
  const { UserDetails } = useContext(UserContext);

  const { mutate: uploadMd } = useUploadMedia();
  const { mutate: deleteMedia } = useDeleteMedia();

  const uploadFile = () => {
    if (imageUpload == null) return;
    let uniqueName = imageUpload.name.split(".")[0] + v4();
    const imageRef = ref(storage, `projects/${query.projectId}/${uniqueName}`);
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
              publicId: metadata.name,
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
    getMetadata(deleteRef).then((metadata) => {
      let idToDelete = metadata.name;
      deleteMedia(
        {
          projectId: query.projectId,
          mediaId: idToDelete,
        },
        {
          onSuccess: (d) => {
            deleteObject(deleteRef).then(() => {
              alert("Image Deleted!");
            });
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
      let curr = imageUrls;
      curr = curr.filter((i) => i.name !== name);
      setImageUrls(curr);
    });
  };

  const downLoadFile = () => {};

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
        <Input
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
            <Button onClick={() => downLoadFile(img.name)}>Download</Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default MediaContainer;
