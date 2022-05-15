import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { MdAdd, MdPerson, MdGroups } from "react-icons/md";
import { ProjectContext } from "../../Contexts/ProjectContext";
import { UserContext } from "../../Contexts/UserContext";
import { GoRequestChanges } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";



const Sidebar = () => {
  const { logout, UserDetails, loggingOut } = useContext(UserContext);
  const { groupProjects, personalProjects, currentProject } =
    useContext(ProjectContext);

  const { push } = useRouter();

  return (
    <Box p={2} h={"100%"}>
      <Flex justifyContent={"space-between"}>
        {/* <Text
          fontSize={"xl"}
          fontWeight="bold"
          mb={2}
          color="#ffff"
          bg="brand.700"
          w={"fit-content"}
          p={2}
          borderRadius={5}
        >
          TULSEE.io
        </Text> */}
        <Image
          cursor={'pointer'}
          onClick={() => push(`/`)}
          w={"80px"}
          src={"/Logo1.png"}
          width={"70px"}
          marginLeft={"5px"}
          alt='tulsee-logo'
        />
        <Button isLoading={loggingOut} variant="ghost" onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text pt={2} marginLeft={"10px"} verticalAlign={"middle"}>
          Hi, {UserDetails ? UserDetails.firstName : ""}
        </Text>
        {/* <IconButton onClick={() => push("/invites")} fontWeight={'bold'} variant={'ghost'} size={'sm'} icon={<GoRequestChanges size={'18px'}/>}/> */}
        <Menu>
          <MenuButton aria-label="sidebar-menu" as={IconButton} icon={<HiMenu />} variant="ghost" />
          <MenuList>
            <MenuItem
              onClick={() => push("/invites")}
              icon={<GoRequestChanges size={"18px"} />}
            >
              Project invites
            </MenuItem>
            <MenuItem
              onClick={() => push("/settings")}
              icon={<RiUserSettingsLine size={"18px"} />}
            >
              User settings
            </MenuItem>
            <MenuItem
              onClick={() => push("/archive")}
              icon={<FiArchive size={"18px"} />}
            >
              Archive
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction={"column"} h={"100%"}>
        <Box
          textAlign={"left"}
          py={4}
          px={4}
          borderBottom="1px solid #DBDBDB"
        >
          <Button
            variant={"outline"}
            w="100%"
            leftIcon={<MdAdd />}
            mb={"10px!important"}
            onClick={() => push("/project/createNew")}
          >
            New Project
          </Button>
          <Text w={"100%"} fontWeight={"semibold"} mb={2} fontSize="lg">
            Personal
          </Text>
          <VStack maxH={'150px'} overflowY='auto'>
          {personalProjects.map((i) => (
            <Box  w='100%'>
            <Button
              backgroundColor={
                currentProject &&
                currentProject.publicId === i.publicId ?
                "transparent":
                "brand.700"
              }
              onClick={() => push(`/project/${i.publicId}/task`)}
              key={i.publicId}
              variant={
                currentProject && currentProject.publicId === i.publicId
                  ? "outline"
                  : "solid"
              }
              w="100%"
              leftIcon={<MdPerson />}
            >
              {i.name}
            </Button>
            </Box>
            
          ))}
          </VStack>
        </Box>
        <Box textAlign={"left"} py={4} px={4} h={"100%"}>
          <Text w={"100%"} fontWeight={"semibold"} mb={2} fontSize="lg">
            Group
          </Text>
          <VStack maxH={'300px'} overflowY='auto'>
            {groupProjects.map((i) => (
              <Box w='100%'>
              <Button
                backgroundColor={
                  (currentProject &&
                  currentProject.publicId === i.publicId) ?
                  "transparent":
                  "brand.700"
                }
                onClick={() => push(`/project/${i.publicId}/task`)}
                key={i.publicId}
                variant={
                  currentProject && currentProject.publicId === i.publicId
                    ? "outline"
                    : "solid"
                }
                w="100%"
                leftIcon={<MdGroups />}
              >
                {i.name}
              </Button>
              </Box>

          ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
