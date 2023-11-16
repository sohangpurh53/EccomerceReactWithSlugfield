import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/Authcontext';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Badge,
  Image,
} from '@chakra-ui/react';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const[userOrderDetails, setUserOrderDetails] = useState([])
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const [user, useraddress, userOrderData] = await Promise.all([
             axiosInstance('user/profile/').then((response) => response.data),
             axiosInstance('user/shipping-address/').then((response) => response.data),
             axiosInstance('user/order/').then(response=> response.data),
          ])
         
          setUserDetails(user);
          setUserAddress(useraddress);
          setUserOrderDetails(userOrderData)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      window.location.href = '/signin';
    }
  }, [accessToken]);
console.log(userOrderDetails)
 
  return (
    <Box maxW="800px" mx="auto" p={4}>
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
        </Box>
      ))}

      <Heading mt={8} mb={4} size="md">
        Your Orders:
      </Heading>
      {userOrderDetails.map(order =>(
         <List key={order.id} styleType="none" pl={0}>
        {/* Replace these dummy values with actual order data */}
        <ListItem mb={4}>
        <Box h={'50px'} w={'50px'} ><Image src={`http://127.0.0.1:8000${order.product.first_image}`} alt="Product" objectFit={'contain'} boxSize="100%" mr={4} /></Box>  
          <Text display="inline-block" verticalAlign="top">
            Quantity: {order.quantity}
            <br />
            Product: {order.product.name}
            <br />
            {/* Order ID:  */}
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
        <List pl={0}>
          {/* Replace these dummy values with actual review data */}
          <ListItem>
            <Text>Product:</Text>
            <Text>Rating:</Text>
            <Text>Comment:</Text>
          </ListItem>
          <ListItem>No reviews yet.</ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default UserProfile;
