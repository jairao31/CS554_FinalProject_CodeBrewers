import { Avatar, Box, Center, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Common/layout";
import { UserContext } from "../Components/Contexts/UserContext";
import { Input, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchQuery } from "../api/search/searchQuery";
import { MdClear } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ImPointLeft } from "react-icons/im";
import { GrOverview } from "react-icons/gr";
import { ImEnter } from "react-icons/im";
const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 3.4em;
  background-color: #fff;
  border-radius: 5px;
`;

const SearchInputContainer = styled.div`
  width: 100%;
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
  border-radius: 6px;
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
  font-size: 27px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: red;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    cursor: "pointer";
    color: red;
  }
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
  },
  collapsed: {
    height: "3.5em",
  },
};

const containerTransition = { type: "spring", damping: 40, stiffness: 150 };

const Home = () => {
  const { push } = useRouter();
  // const { query, push } = useRouter();
  const { userID } = useContext(UserContext);
  const [newCategory, setnew] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isdisable, setisDisable] = useState(false);
  const [searchResults, setSearchResults] = useState([])

  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading1, setLoading1] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);
  const isEmpty = !tvShows || tvShows.length === 0;

  const handleSearch = (e) => {
    if(e.target.value.trim().length === 0) {
      setSearchResults([]);
    }
    setSearchQuery(e.target.value);
  };
  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    var searchList = [];
    setExpanded(false);
    setSearchQuery("");
    setLoading1(false);
    setNoTvShows(false);
    setTvShows([]);
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

  console.log(searchQuery);

  useEffect(() => {
    if(searchList && typeof searchList === 'object' && searchList.length) {
      setSearchResults(searchList)
    }
  }, [searchList]);
 

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
          borderRadius={"0 5px 5px 0"}
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
                  disabled={"true"}
                  placeholder="Please select a category to search"
                ></SearchInput>
              )}
              <AnimatePresence>
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
              </AnimatePresence>
            </SearchInputContainer>
            {isExpanded && <LineSeperator />}
            {isExpanded && (
              <SearchContent>
                {/* {isLoading1 && (
                  <LoadingWrapper>
                    <MoonLoader loading color="#000" size={20} />
                  </LoadingWrapper>
                )}
                {!isLoading1 && isEmpty && (
                  <LoadingWrapper>
                    <WarningMessage>Start typing to Search</WarningMessage>
                  </LoadingWrapper>
                )}
                {!isLoading1 && (
                  <LoadingWrapper>
                    <WarningMessage>No Result!</WarningMessage>
                  </LoadingWrapper>
                )} */}
                {
                  newCategory === "project" &&
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
                          <Avatar
                            size={"sm"}
                            src={i.profilePhotoUrl}
                            name={i.displayName}
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
    <Box>
      <p>you are being logged out!</p>
    </Box>
  );
};

export default Home;
