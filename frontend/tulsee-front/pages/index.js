import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Common/layout";
import { UserContext } from "../Components/Contexts/UserContext";
import { InputGroup, Select } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchQuery } from "../api/search/searchQuery";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { GrOverview } from "react-icons/gr";
import { ImEnter } from "react-icons/im";
import CommonAvatar from "../Components/Common/CommonAvatar";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 3.4em;
  border-radius: 0 5px 0 0;
  background-color: #fff;
  // border-radius: 5px;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  border-radius: 0 5px 0 0;
  min-height: 3.5em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #357960;
  font-weight: 500;
  border-radius: 0 5px 0 0;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0.5;
    }
  }

  &::placeholder {
    color: #357960;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #357960;
  border-radius: 0 5px 0 0;
  font-size: 27px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  // color: red;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  // cursor: pointer;

  // &:hover {
  //   cursor: "pointer";
  //   color: red;
  // }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // background-color: #cff6cf;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "30em",
    zIndex: "999",
  },
  collapsed: {
    height: "3.5em",
    zIndex: "999",
  },
};

const containerTransition = { type: "spring", damping: 40, stiffness: 150 };

const Home = () => {
  const { push } = useRouter();
  const { userID } = useContext(UserContext);
  const [newCategory, setnew] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading1, setLoading1] = useState(false);
  const isEmpty = !searchQuery || searchQuery.length === 0;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length === 0) {
      setSearchResults([]);
    }
  };
  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchResults([]);

    setSearchQuery("");
    setLoading1(false);

    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const {
    data: searchList,
    refetch,
    isLoading,
  } = useSearchQuery(
    searchQuery,
    newCategory,
    userID,
    !!(searchQuery.length > 1)
  );

  useEffect(() => {
    console.log(searchQuery, ":", searchList);
    if (
      searchList &&
      typeof searchList === "object" &&
      (searchList.length || searchList.length === 0)
    ) {
      console.log("searched");
      console.log(searchQuery, ":", searchList);
      setSearchResults(searchList);
    }
  }, [searchList]);

  useEffect(() => {
    if (searchQuery.length > 1 && searchResults) {
      console.log("fetching");
      refetch();
    }
  }, [searchQuery]);

  return userID ? (
    <Layout>
      <>
        <div>
          <Select
            // fontSize={'21px'}
            display={"flex"}
            style={{ boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)" }}
            color="#357960"
            fontWeight={"500"}
            marginLeft={"5.95%"}
            marginTop={"40px"}
            position={"fixed"}
            variant="filled"
            _hover={{ cursor: "pointer" }}
            outline={"1px solid"}
            placeholder="Category"
            borderRadius={"5px 0 0 5px"}
            size={"md"}
            width={"10%"}
            height={"3.5em"}
            icon={<IoMdArrowDropdown />}
            onChange={(e) => setnew(e.target.value)}
          >
            <option value="project">Project</option>
            <option value="user">User</option>
          </Select>
        </div>
        <InputGroup
          boxShadow={"0px 2px 12px 3px rgba(0, 0, 0, 0.14)"}
          color="#357960"
          marginTop={"40px"}
          marginLeft={"20%"}
          width={"70%"}
          outline={"1px solid"}
          borderRadius={"0 5px 0 0"}
          zIndex={2}
        >
          <SearchBarContainer
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
          >
            <SearchInputContainer>
              {newCategory !== "" ? (
                <>
                  <SearchIcon>
                    <IoSearch />
                  </SearchIcon>

                  <SearchInput
                    type="search"
                    placeholder={`${"Search by"} ${newCategory}`}
                    _placeholder={{ opacity: 0.5, color: "inherit" }}
                    onFocus={expandContainer}
                    ref={inputRef}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </>
              ) : (
                <SearchInput
                  disabled={true}
                  placeholder="Please select a category to search"
                ></SearchInput>
              )}
              {/* <AnimatePresence>
                {isExpanded && (
                  <CloseIcon
                    key="close-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={collapseContainer}
                    transition={{ duration: 0.2 }}
                  ></CloseIcon>
                )}
              </AnimatePresence> */}
            </SearchInputContainer>
            {isExpanded && <LineSeperator />}
            {isExpanded && (
              <SearchContent>
                {/* 
                {isLoading1 && (
                  <LoadingWrapper>
                    <WarningMessage>No Result!</WarningMessage>
                  </LoadingWrapper>
                )} */}
                {!isEmpty && isLoading && (
                  <LoadingWrapper>
                    <MoonLoader loading color="Green" size={40} />
                  </LoadingWrapper>
                )}
                {!isEmpty && searchResults.length === 0 && (
                  <LoadingWrapper>
                    <WarningMessage>
                      No results found for "{searchQuery}"
                    </WarningMessage>
                  </LoadingWrapper>
                )}
                {isEmpty && (
                  <LoadingWrapper>
                    <WarningMessage>Start typing to Search</WarningMessage>
                  </LoadingWrapper>
                )}
                {newCategory === "project" &&
                  searchResults.map((i) => {
                    return (
                      <div>
                        <HStack
                          _hover={{ cursor: "pointer" }}
                          bg={"brand.500"}
                          variant="solid"
                          key={i.publicId}
                          onClick={() => push(`/project/${i.publicId}/task`)}
                          w={"100%"}
                          margin={1}
                          height="3em"
                        >
                          <Text color={"white"} p={2}>
                            {i.name}
                          </Text>
                          <ImEnter color={"white"} size={"19px"} />
                        </HStack>
                        {/* <IconButton variant={'ghost'} icon={<RiCloseCircleFill/>} onClick={() => handleRemove(i.publicId)}/> */}
                      </div>
                    );
                  })}
                {!isLoading1 &&
                  newCategory === "user" &&
                  searchResults.map((i) => {
                    return (
                      <div>
                        {/* <Button
                          height="3em"
                          rightIcon={<GrOverview />}
                          bg={"brand.500"}
                          variant="solid"
                          width={"100%"}
                          margin={1}
                          value={i.publicId}
                          onClick={() => push(`/user/${i.publicId}`)}
                          key={i.publicId}

                          // style={{ textAlign: "left  !important" }}
                        > */}

                        <HStack
                          height="3em"
                          _hover={{ cursor: "pointer" }}
                          bg={"brand.500"}
                          variant="solid"
                          key={i.publicId}
                          onClick={() => push(`/user/${i.publicId}`)}
                          w={"100%"}
                          p={2}
                        >
                          <CommonAvatar
                            size={"sm"}
                            src={i.profilePhotoUrl}
                            name={i.displayName}
                            isOnline={i.isActive}
                          />
                          <Text color={"white"} p={2}>
                            {i.displayName}
                          </Text>
                          <GrOverview size={"19px"} />
                        </HStack>
                        {/* </Button> */}
                        {/* <IconButton variant={'ghost'} icon={<RiCloseCircleFill/>} onClick={() => handleRemove(i.publicId)}/> */}
                      </div>
                    );
                  })}
              </SearchContent>
            )}
          </SearchBarContainer>
        </InputGroup>
        <Flex h="100%" justifyContent={"center"} zIndex={1}>
          <Box py="15%">
            {isExpanded ? (
              <Button
                width={"170px"}
                isLoading
                colorScheme="blue"
                spinner={<BeatLoader size={18} color="white" />}
              >
                TULSEE
              </Button>
            ) : (
              <>
                <Image
                  position="fixed"
                  alt="home"
                  w="600px"
                  src={"/home.svg"}
                />{" "}
                <Text
                  textAlign={"center"}
                  fontSize={"2xl"}
                  fontWeight="bold"
                  mt={"40px"}
                >
                  Welcome! Let's get some work done!
                </Text>
              </>
            )}
          </Box>
        </Flex>
        {/* <Center>
        <InputGroup
          boxShadow={"0px 2px 12px 3px rgba(0, 0, 0, 0.14)"}
          color="#357960"
          marginTop={"40px"}
          marginLeft={"20px"}
          width={"70%"}
          outline={"1px solid"}
          borderRadius={"5px"}
        >
          <InputLeftAddon children={<BsSearch />} />
          <Select
            variant="filled"
            outline={"1px solid"}
            placeholder="Category"
            borderRadius={0}
            size={"md"}
            width={"20%"}
            icon={<IoMdArrowDropdown />}
            onChange={(e) => setnew(e.target.value)}
          >
            <option value="project">Project</option>
            <option value="user">User</option>
          </Select>
          {newCategory !== "" ? (
            <Input
              type="search"
              color="#357960"
              placeholder={`${"Search by"} ${newCategory}`}
              _placeholder={{ opacity: 0.5, color: "inherit" }}
              aria-autoComplete="list"
              position={"relative"}
              value={searchTerm}
              onChange={handleSearch}
              style={{ onInput: <MdClear /> }}
            />
          ) : (
            <Input
              color="#357960"
              disabled="true"
              placeholder="Please select a category to search"
              _placeholder={{ opacity: 1.5, color: "inherit" }}
            />
          )}
        </InputGroup>
        <br />
        <ul>
          {searchList &&
            searchList.map((i, idx) => {
              return <li key={idx}>{i.publicId}</li>;
            })}
        </ul>
      </Center> */}
      </>
    </Layout>
  ) : (
    <Flex direction="column" justifyContent={"center"} w="100vw" h="100vh">
      <Box mx="auto" textAlign={"center"}>
        <Spinner color="brand.500" />
        <Text>Authenticating, please wait....</Text>
      </Box>
    </Flex>
  );
};

export default Home;
