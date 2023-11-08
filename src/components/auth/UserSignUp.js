import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
 
} from '@chakra-ui/react'
import Notification from '../utils/Notfication';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';



const UserSignUp = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  });
  const [notification, setNotification] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const signUpForm = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('create/user/', userData).then((response) => {if(response.data){
        setNotification('Registered Successfully Login to Continue')
      }});
    } catch (error) {
      console.log(error);
    }
  };
console.log(userData)

return (
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
      <Notification message={notification}/>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'} textAlign={'center'}>
          Sign up
        </Heading>
      
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
       
              <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
             onClick={signUpForm}
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text  align={'center'}>
              Already a user? 
          <ChakraLink color={'blue.400'} as={Link} to="/signin/" _hover={{textDecoration:'none'}} >
            Login
          </ChakraLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
)
}

export default UserSignUp;
