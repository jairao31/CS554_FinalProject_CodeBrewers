import {
  Box,
  Image,
  Button,
  Divider,
  Text,
  useToast,
  IconButton,
  Avatar,
  FormLabel,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useEditUser } from "../../api/user/editUser";
import CommonInput from "../Common/CommonInput";
import CommonTextarea from '../Common/CommonTextarea';
import { UserContext } from "../Contexts/UserContext";
import ChangePassword from "./changePassword";
import { AiFillCamera } from "react-icons/ai";
import { useUploadProfilePhoto } from "../../api/user/uploadProfilePhoto";
import PhotoCropModal from "./photoCropModal";
import Cropper from "react-easy-crop";

const UserSettings = () => {
  const [details, setDetails] = useState({});
  const [profilePic, setProfilePic] = useState(null);


  const { UserDetails, setUserDetails } = useContext(UserContext);

  const { mutate: editUser, isLoading } = useEditUser();
  const { mutate: uploadProfilePic , isLoading:dpLoading} = useUploadProfilePhoto()

  const {isOpen, onOpen, onClose} = useDisclosure()

  const toast = useToast();

  useEffect(() => {
    if (!UserDetails) return;
    setDetails(UserDetails);
  }, [UserDetails]);

  const profileImg = e => {
    // const formData = new FormData();
    // formData.append("profilePic", e.target.files[0]);
    // onOpen()
    if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener("load", () => {
				setProfilePic(reader.result);
        onOpen()
			});
		}
    // uploadProfilePic({
    //     userId: UserDetails.publicId, 
    //     formData
    //   },
    //   {
    //     onSuccess: d => {
    //       setUserDetails(prev => {
    //         return {
    //           ...prev,
    //           profilePhotoUrl: d
    //         }
    //       })
    //       toast({title:"profile photo uploaded successfully", status:'success', duration: 2000});
    //     },
    //     onError: e => {
    //       console.log(e)
    //       toast({title:"Something went wrong!", status:'error', duration: 2000});
    //     }
    //   }
    // )
  };

  const handleChange = (value, name) => {
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      details.firstName.trim().length === 0 ||
      details.lastName.trim().length === 0
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 2000,
      });
      return;
    }
    editUser(
      {
        id: UserDetails.publicId,
        details,
      },
      {
        onSuccess: (d) => {
          setUserDetails(d);
          toast({
            title: "Changes saved successfully",
            status: "success",
            duration: 2000,
          });
        },
        onError: (e) => {
          console.log(e);
          toast({
            title: "Something went wrong!",
            status: "error",
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <Box p={'20px 20px 50px 20px'} maxH='100vh' overflowY={'auto'}> 
      <Text fontSize={"lg"} fontWeight="bold" mb={4}>
        Basic Details
      </Text>
      <Box mb={4} w='fit-content' position={'relative'}>
        <input id='profile_photo_input' type='file' style={{display:'none'}} accept='.jpg,.png,.webp,.jpeg' onChange={profileImg}/>
        <Avatar size={'lg'} src={details.profilePhotoUrl} alt={`${details.firstName}_dp`} name={details.displayName}/>
        {/* Write user crop feature */}
        <Box 
          w={'64px'} 
          h='64px' 
          transition={'1s'} 
          _hover={{backgroundColor:'rgba(0,0,0,0.2)'}}  
          position={'absolute'} 
          top={0} 
          borderRadius={'full'}
          display='flex'
          justifyContent={'center'}
          pt={4}
        >
          {!dpLoading ? <FormLabel 
            style={{width:'100%', height:'64px'}} 
            for="profile_photo_input" 
            borderRadius={'full'}
            cursor='pointer'
          /> :
          <Spinner size={'lg'} />
          }
        </Box>
      </Box>
      {/* <IconButton
        onClick={() => profileImg(img.publicId)}
        icon={<AiFillCamera />}
      /> */}

      <form
        style={{ width: "40%", paddingBottom: "20px" }}
        onSubmit={handleSubmit}
      >
        <CommonInput
          label="First Name"
          name="firstName"
          value={details.firstName || ""}
          onChange={handleChange}
          isRequired
        />
        <CommonInput
          label="Last Name"
          name="lastName"
          value={details.lastName || ""}
          onChange={handleChange}
          isRequired
        />
        <CommonTextarea
          label={'Bio'}
          name="description"
          placeholder={"Write something about yourself..."}
          value={details.description || ''}
          onChange={handleChange}
        />
        <Button type="submit" variant={"outline"} isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
      <Divider />
      {details.type !== 'google' && <ChangePassword />}
    
      <PhotoCropModal isOpen={isOpen} onClose={onClose} photo={profilePic}/>
    </Box>
  );
};

export default UserSettings;
