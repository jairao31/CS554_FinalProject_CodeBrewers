import { Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Components/Common/layout';
import { UserContext } from '../Components/Contexts/UserContext';
import { Input, InputGroup, InputLeftAddon , Select  } from '@chakra-ui/react';
import {BsSearch} from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'
const Home = () => {

  const {UserDetails} = useContext(UserContext);
  const [newCategory, setnew]=useState('')
  return (
    UserDetails ?
    <Layout>
      <Center>
      <InputGroup color='#357960' marginTop={'40px'} marginLeft={'20px'} width={'70%'}  outline={'1px solid'}>
        <InputLeftAddon children={<BsSearch />}  borderRadius={0}/>
        <Select variant='filled'  outline={'1px solid'} placeholder='Category' borderRadius={0}  size={'md'} width={'20%'} icon={<IoMdArrowDropdown />} onChange={e=>setnew(e.target.value)}>
          <option value='project'>Project</option>
          <option value='task'>Task</option>
        </Select>
        
        <Input color='#357960' borderRadius={0} placeholder={`${newCategory !== '' ? 'Search by' : 'Please select a category'} ${newCategory}`}
        _placeholder={{opacity:0.5, color:'inherit'}} aria-autoComplete='list' position={'relative'}
        />
      </InputGroup>
      </Center>
    </Layout> :
    <Box>
      <p>you are being logged out!</p>
    </Box>
  );
};

export default Home;