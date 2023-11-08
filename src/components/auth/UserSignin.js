import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';

const UserSignin = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };

  const signInForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('token/', userLoginData);

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        window.location.href = '/';
      } else {
        throw new Error('Invalid login details'); // Throw an error for incorrect credentials
      }
    } catch (error) {
      console.error(error.message); // Log the error message
    }
  };

  return (
    // <Box className="auth-container" p={4} maxW="container.sm" mx="auto">
    //   <form>
    //     <div className="form-group">
    //       <label htmlFor="username">Username</label>
    //       <Input
    //         type="text"
    //         name="username"
    //         value={userLoginData.username}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Password</label>
    //       <Input
    //         type="password"
    //         name="password"
    //         value={userLoginData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <Button colorScheme="teal" type="submit" onClick={signInForm}>
    //       SignIn
    //     </Button>
    //   </form>
    //   <Link to={'/signup'}>Signup</Link>
    // </Box>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
            type="text"
            name="username"
             value={userLoginData.username}
             onChange={handleChange}
            required
           />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
            type="password"
            name="password"
            value={userLoginData.password}
            onChange={handleChange}
             required  />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
               onClick={signInForm}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
          
        </Box>
          <Text>Don't have account ?<ChakraLink color={'blue.400'} as={Link} to="/signup/" _hover={{textDecoration:'none'}}> Signup  </ChakraLink> 
          </Text>
        
      </Stack>
    
    </Flex>
  );
};

export default UserSignin;
