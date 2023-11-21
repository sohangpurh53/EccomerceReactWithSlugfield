import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
 
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import PageLoadingAnimation from '../utils/LoadingAnimation';

const UserSignin = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const Navigate = useNavigate()




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };

  const signInForm = async (e) => {
    e.preventDefault();
    setIsLoading(false)
    try {
      const response = await axiosInstance.post('token/', userLoginData);
  
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        Navigate('/');
        window.location.reload();
      } else {
        // Handle other status codes
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const responseData = error.response.data;
        if (responseData && responseData.code === 'token_not_valid') {
          console.error('Token is invalid or expired.');
          // Handle the token expiration, e.g., redirect to login page or show an error message
        } else {
          // console.error('Unauthorized access. Invalid login credentials.');
          toast({
        title: "Unauthorized access. Invalid login credentials.",
        status: 'error',
        position:'top',
        duration: 3000,
        isClosable: true,
      });
          // Handle unauthorized access, e.g., redirect to login page or show an error message
        }
      } else {
        console.error('An error occurred:', error.message);
      }
      
    }
  };
  const bgColor = useColorModeValue('gray.50', 'gray.800');

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
    isLoading? <PageLoadingAnimation/> :(<Flex
      minH={'100vh'}
      // align={'center'}
      justify={'center'}
      bg={bgColor}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={bgColor}
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
              {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack> */}
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
    
    </Flex>) 
  );
};

export default UserSignin;
