import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/Authcontext';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Badge,
  Flex,
  Stack,
  HStack,
  VStack,
  // Avatar,
  Image,
  Spacer,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import PageLoadingAnimation from '../utils/LoadingAnimation'
import { StarIcon } from '@chakra-ui/icons';


const UserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const[userOrderDetails, setUserOrderDetails] = useState([])
  const[userReviews, setUserReviews] = useState([])
  const { accessToken } = useAuth();
  const Navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const [user, useraddress, userOrderData, usereview] = await Promise.all([
             axiosInstance('user/profile/').then((response) => response.data),
             axiosInstance('user/shipping-address/').then((response) => response.data),
             axiosInstance('user/order/').then(response=> response.data),
             axiosInstance('user/review/').then(response=> response.data),
             
            
          ])
          
         
         
          setUserDetails(user);
          setUserAddress(useraddress);
          setUserOrderDetails(userOrderData)
          setUserReviews(usereview)
          
          setIsLoading(false)
        } catch (error) {
          console.log(`error while fetch user profile ${error.message}`);
          setIsLoading(false)
        }
      };
      fetchData();
    } else {
      Navigate('/signin');
    }
  }, [accessToken, Navigate]);
 
  return (

    isLoading? <PageLoadingAnimation/>:
    (<Box maxW="800px" mx="auto" p={4}>
      <Heading mb={4}>Welcome, {userDetails.username}!</Heading>
      <Text>
        {userDetails.first_name} {userDetails.last_name}
        <br />
        Email: {userDetails.email}
      </Text>

      {userAddress.map((address) => (
        <Box key={address.id} mt={8} border="1px" borderColor="gray.200" p={4}>
          <Heading size="md">Shipping Address</Heading>
          <Text>
            <strong>Address:</strong> {address.address}
            <br />
            <strong>City:</strong> {address.city}
            <br />
            <strong>State:</strong> {address.state}
            <br />
            <strong>Country:</strong> {address.country}
            <br />
            <strong>Postal Code:</strong> {address.postal_code}
          </Text>
          <Button as={Link} to={`/update/shipping-address/${address.id}/`}>Update</Button>
        </Box>
        
      ))}

      <Heading mt={8} mb={4} size="md">
        Your Orders:
      </Heading>
      {userOrderDetails.length>0? (userOrderDetails.map(order =>(
         <List key={order.id} styleType="none" pl={0}>
        {/* Replace these dummy values with actual order data */}
        <ListItem mb={4}>
        <Box h={'50px'} w={'50px'} ><Image src={`https://api.eccomerce.digitaltek.co.in${order.product.first_image}`} alt="Product" objectFit={'contain'} boxSize="100%" mr={4} /></Box>  
          <Text display="inline-block" verticalAlign="top">
            Quantity: {order.quantity}
            <br />
            Product: {order.product.name}
            <br />
            {/* Order ID:  */} 
            Date: {new Date(order.order.created_at).toDateString()}
            <br />
            Time: {new Date(order.order.created_at).toLocaleTimeString()}
            <br />
            Order Status:
           
            <Badge
              ml={2}
              colorScheme={order.order.is_paid ? 'green' : 'red'}
              variant="solid"
            >
              {order.order.is_paid ? 'Order Successful' : 'Order Pending'}
            </Badge>
          </Text>
        </ListItem>
      </List>
      ))):(<Text>No Order Yet</Text>)}
     

     {/* <Box mt={8}>
  <Heading size="md">Your Reviews:</Heading>
  {userReviews.length > 0 ? (
    userReviews.map(review => (
      <Box  key={review.id} pl={0}>
       
          <Text>Product: {review.product}</Text>
          <Text>Rating: {review.rating}</Text>
          <Text>Comment: {review.comment}</Text>
        
      </Box>
    ))
  ) : (
    <Text>No reviews yet.</Text>
  )}
</Box> */}
  <Flex mx={2} ml={10}  w={{ base: '250px', md: 'md', lg: 'lg' }}>
  <Heading textAlign={'justify'} size={'md'}> Your Reviews:</Heading>
  {userReviews.length > 0 ? (
    <Stack spacing={4}>
      {/* <Text  fontSize={{base:'16px', md:'md', lg:'lg'}}></Text> */}
      {userReviews.map((review) => (
        <Box key={review.id} p={4} shadow="md" borderWidth="1px">
          <HStack>
            {/* <Avatar name={review.user.username} /> */}
            <VStack align="start" spacing={0} ml={3}>
              <Box w={{base:'30px', md:'50px'}}>
                <Image objectFit={'contain'} src={`https://api.eccomerce.digitaltek.co.in${review.product.first_image}`}/>
              </Box> 
              <Text fontSize={{base:'14px', md:'md'}} fontStyle={'oblique'}>{review.product.name}</Text>
             
              <HStack>
                {[...Array(review.rating)].map((_, index) => (
                  <StarIcon key={index} color="yellow.400" />
                ))}
              </HStack>
              <Text>{review.comment}</Text>
            </VStack>
            <VStack align="start" spacing={0} ml={3}>
              <Text color={'blackAlpha.600'} fontSize="sm">
                {new Date(review.created_at).toDateString()}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
          <Button as={Link} to={`/update/review/${review.id}/`}>Update</Button>
        </Box>
      ))}
    </Stack>
  ) : (
    <Text>No reviews yet.</Text>
  )}
</Flex>
    </Box>)
  );
};

export default UserProfile;
