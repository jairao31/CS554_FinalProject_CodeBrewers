import React, { useCallback, useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    useToast,
    Text,
  } from '@chakra-ui/react'
  import Cropper from 'react-easy-crop'
import getCroppedImg, { dataUrlToFile } from '../../helpers/cropImage';
import { useUploadProfilePhoto } from '../../api/user/uploadProfilePhoto';
import { UserContext } from '../Contexts/UserContext';

const PhotoCropModal = ({isOpen,onClose,photo}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [zoom, setZoom] = useState(1)

    const {UserDetails, setUserDetails} = useContext(UserContext);

    const { mutate: uploadProfilePic , isLoading:dpLoading} = useUploadProfilePhoto()

    const toast = useToast()

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])
    
      const getImage = useCallback(async() => {
          const file = await getCroppedImg(photo, croppedAreaPixels)
          const formData = new FormData();
          formData.append("profilePic", file);
          uploadProfilePic({
            userId: UserDetails.publicId, 
            formData
          },
          {
            onSuccess: d => {
              setUserDetails(prev => {
                return {
                  ...prev,
                  profilePhotoUrl: d
                }
              })
              toast({title:"profile photo uploaded successfully", status:'success', duration: 2000});
              onClose()
            },
            onError: e => {
              console.log(e)
              toast({title:"Something went wrong!", status:'error', duration: 2000});
            }
          }
        )
      })

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Crop profile picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box h={'400px'} w={"400px"} position='relative'>
                {photo && 
                    <Cropper
                        image={photo}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    /> 
                }
            </Box>
            <Text fontSize={'sm'} color='#ABABAB'>Scroll to zoom</Text>
            <Text fontSize={'sm'} color='#ABABAB'>Click and move the cursor to select area</Text>
            </ModalBody>

            <ModalFooter>
                <Button isLoading={dpLoading}  onClick={getImage}>Save</Button>
            </ModalFooter>
            </ModalContent>
      </Modal>
    );
};

export default PhotoCropModal;