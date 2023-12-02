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
  Image,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import PageLoadingAnimation from '../utils/LoadingAnimation'


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
console.log(userReviews)
 
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
      {userOrderDetails.map(order =>(
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
      ))}
     

      <Box mt={8}>
        <Heading size="md">Your Reviews:</Heading>
        {userReviews.map(review =>(
          review.length>0? (<Box pl={0}>
          {/* Replace these dummy values with actual review data */}
          <ListItem>
            <Text>Product:{review.product}</Text>
            <Text>Rating:{review.rating}</Text>
            <Text>Comment:{review.comment}</Text>
          </ListItem>
          
        </Box>):<ListItem>No reviews yet.</ListItem>
          
        ))}
        
      </Box>
    </Box>)
  );
};

export default UserProfile;
