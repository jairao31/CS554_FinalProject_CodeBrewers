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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useEditUser } from "../../api/user/editUser";
import CommonInput from "../Common/CommonInput";
import { UserContext } from "../Contexts/UserContext";
import ChangePassword from "./changePassword";
import { AiFillCamera } from "react-icons/ai";
import { useUploadProfilePhoto } from "../../api/user/uploadProfilePhoto";

const UserSettings = () => {
  const [details, setDetails] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const { UserDetails, setUserDetails } = useContext(UserContext);

  const { mutate: editUser, isLoading } = useEditUser();
  const { mutate: uploadProfilePic , isLoading:dpLoading} = useUploadProfilePhoto()

  const toast = useToast();

  useEffect(() => {
    if (!UserDetails) return;
    const { firstName, lastName, profilePhotoUrl, displayName } = UserDetails;
    setDetails({
      firstName: firstName.split("")[0].toUpperCase() + firstName.slice(1),
      lastName: lastName.split("")[0].toUpperCase() + lastName.slice(1),
      profilePhotoUrl,
      displayName
    });
  }, [UserDetails]);

  const profileImg = e => {
    const formData = new FormData();
    formData.append("profilePic", e.target.files[0]);
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
        },
        onError: e => {
          console.log(e)
          toast({title:"Something went wrong!", status:'error', duration: 2000});
        }
      }
    )
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
        <input id='profile_photo_input' type='file' style={{display:'none'}} onChange={profileImg}/>
        <Avatar size={'lg'} src={details.profilePhotoUrl} alt={`${details.firstName}_dp`} name={details.displayName}/>
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
        <Button type="submit" variant={"outline"} isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
      <Divider />
      <ChangePassword />
    </Box>
  );
};

export default UserSettings;
