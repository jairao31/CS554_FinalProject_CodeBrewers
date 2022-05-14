import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import {
  Box,
  Image,
  Input,
  IconButton,
  Flex,
  VStack,
  HStack,
  Divider,
  FormLabel,
  InputGroup,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserContext } from "../Contexts/UserContext";
import { useUploadMedia } from "../../api/media/uploadMedia";
import { useDeleteMedia } from "../../api/media/deleteMedia";
import { useGetAllMedia } from "../../api/media/getAllMedia";
import { MdDownload, MdUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const MediaContainer = () => {
  const [mediaList, setMediaList] = useState([]);

  const { query, push } = useRouter();
  const {projectId} = query
  const { UserDetails } = useContext(UserContext);
  const {
    data: Media,
    isLoading,
  } = useGetAllMedia(projectId, !!projectId);

  const { mutate: uploadMd } = useUploadMedia();
  const { mutate: deleteMedia } = useDeleteMedia();

  useEffect(() => {
    if(!Media) return
    setMediaList(Media)
  }, [Media]);

  const uploadFile = (file) => {
  
    if(!file) return
    const form = new FormData();
    form.append("uploadData", file);
    form.append("projectId", query.projectId);
    form.append("uploadedBy", UserDetails.publicId);
    uploadMd(form, {
      onSuccess: (d) => {
        alert("Media Uploaded!");
        console.log(d)
        setMediaList(prev => {
          return [d,...prev]
        })
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
          setMediaList(prev => {
            return prev.filter(i => i.publicId !== mediaId)
          })
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  return (
    <Box maxH={"88%"} overflowY="auto" pt={3} pb={3}>
      <Flex px={"100px"} justifyContent={"flex-end"}>
        <Input
          id="media-upload-input"
          display={"none"}
          type="file"
          onChange={(e) => {
            uploadFile(e.target.files[0]);
          }}
        />
        <FormLabel
          display={"flex"}
          color={"white"}
          borderRadius={"md"}
          p={2}
          bg={"brand.500"}
          for="media-upload-input"
        >
          <MdUpload style={{ marginTop: "5px" }} />
          Upload
        </FormLabel>
      </Flex>

      <VStack px={"100px"} mt={2}>
        {Media && !isLoading ? (
          mediaList.map((img) => (
            <Box w={"100%"}>
              <Flex my={2} w={"100%"} justifyContent={"space-between"}>
                {img.name.split(".")[1] === "jpeg" ||
                img.name.split(".")[1] === "jpg" ||
                img.name.split(".")[1] === "png" ||
                img.name.split(".")[1] === "webp" ? (
                  <Image w={"80px"} src={img.url} borderRadius={"md"} />
                ) : (
                  <Image w={"80px"} src={"/docpdf.png"} borderRadius={"md"} />
                )}
                <Text style={{ textAlign: "center", margin: "auto" }}>
                  {img.name}
                </Text>
                <HStack gap={2}>
                  <IconButton
                    variant={"outline"}
                    size="sm"
                    onClick={() => push(img.url)}
                    icon={<MdDownload />}
                  />
                  <IconButton
                    variant={"outline"}
                    size="sm"
                    onClick={() => deleteFile(img.publicId)}
                    icon={<RiDeleteBin6Fill />}
                  />
                </HStack>
              </Flex>
              <Divider />
            </Box>
          ))
        ) : isLoading ? (
          <>loading...</>
        ) : (
          <>No Media found!</>
        )}
      </VStack>
      {/* <Flex gap={2}>
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
      </Flex> */}
    </Box>
  );
}

export default MediaContainer;
