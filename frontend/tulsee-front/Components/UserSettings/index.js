import {
  Box,
  Image,
  Button,
  Divider,
  Text,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useEditUser } from "../../api/user/editUser";
import CommonInput from "../Common/CommonInput";
import { UserContext } from "../Contexts/UserContext";
import ChangePassword from "./changePassword";
import { AiFillCamera } from "react-icons/ai";

const UserSettings = () => {
  const [details, setDetails] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const { UserDetails, setUserDetails } = useContext(UserContext);

  const { mutate: editUser, isLoading } = useEditUser();

  const toast = useToast();

  useEffect(() => {
    if (!UserDetails) return;
    const { firstName, lastName } = UserDetails;
    setDetails({
      firstName: firstName.split("")[0].toUpperCase() + firstName.slice(1),
      lastName: lastName.split("")[0].toUpperCase() + lastName.slice(1),
    });
  }, [UserDetails]);

  const profileImg = () => {
    const form = new FormData();
    form.append("profilePic", profilePic);
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
    <Box p={5}>
      <Text fontSize={"lg"} fontWeight="bold" mb={4}>
        Basic Details
      </Text>
      <Box style={{ float: "right" }} boxSize="200px">
        <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </Box>
      <IconButton
        style={{ float: "right" }}
        onClick={() => profileImg(img.publicId)}
        icon={<AiFillCamera />}
      />

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
