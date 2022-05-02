import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Image,
  useColorModeValue,
  Center,
  Input,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserContext } from "../Contexts/UserContext";
import { useUploadMedia } from "../../api/media/uploadMedia";
import { useDeleteMedia } from "../../api/media/deleteMedia";
import { useGetAllMedia } from "../../api/media/getAllMedia";
import { MdSimCardDownload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const MediaContainer = () => {
  const [fileUpload, setFileUpload] = useState(null);

  const { query, push } = useRouter();
  const { UserDetails } = useContext(UserContext);
  const {
    data: Media,
    refetch,
    isLoading,
  } = useGetAllMedia(query.projectId, !!query.projectId);

  const { mutate: uploadMd } = useUploadMedia();
  const { mutate: deleteMedia } = useDeleteMedia();

  useEffect(() => {
    // console.log(Media);
  }, [Media]);

  const uploadFile = () => {
    if (fileUpload == null) return;
    const form = new FormData();
    form.append("uploadData", fileUpload);
    form.append("projectId", query.projectId);
    form.append("uploadedBy", UserDetails.publicId);
    uploadMd(form, {
      onSuccess: (d) => {
        alert("Media Uploaded!");
        refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const deleteFile = (mediaId) => {
    if (mediaId == null) return;
    deleteMedia(
      {
        projectId: query.projectId,
        mediaId: mediaId,
      },
      {
        onSuccess: (d) => {
          alert("Media Deleted!");
          refetch();
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  return (
    <Box maxH={"100vh"} overflowY="auto">
      <Center>
        <Input
          type="file"
          onChange={(e) => {
            setFileUpload(e.target.files[0]);
          }}
        />
        <Button onClick={uploadFile}>Upload</Button>
      </Center>
      <Flex gap={2}>
        {Media && !isLoading ? (
          Media.map((img) => {
            return (
              <Box
                role={"group"}
                p={6}
                maxW={"330px"}
                maxH={"350px"}
                w={"full"}
                height={"310px"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                mb={5}
              >
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={img.url}
                />

                <IconButton
                  style={{ float: "left" }}
                  onClick={() => push(img.url)}
                  icon={<MdSimCardDownload />}
                />
                <IconButton
                  style={{ float: "right" }}
                  onClick={() => deleteFile(img.publicId)}
                  icon={<RiDeleteBin6Fill />}
                />
              </Box>
            );
          })
        ) : (
          <>loading...</>
        )}
      </Flex>
    </Box>
  );
};;;;;;;;;;;;

export default MediaContainer;
