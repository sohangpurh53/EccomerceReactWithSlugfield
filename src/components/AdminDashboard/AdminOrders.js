import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Box, Stack } from "@chakra-ui/react"

const OrderList = () => {
  const [orderDetails, setOrderDetails] = useState([]);


  // order data fetched
  const fetchData = async () => {
    try {
      const orderData = await axiosInstance('list/order/').then(response => response.data);
      setOrderDetails(orderData);
      
    } catch (error) {
      console.log(`Error while fetching order data ${error.message}`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box >
  {orderDetails.map((order, index) => (
    <Stack
      key={order.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      borderBottom="1px solid #ccc"
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Order No:</strong> {index+1}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Product:</strong> {order.product.name}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Quantity:</strong> {order.quantity}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Customer:</strong> {order.order.user.username}
      </Box>
      <Box flex={{ base: '1', md: '1' }}>
        <strong>Order Total:</strong> {order.order.total_amount}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Customer Address:</strong> {order.order.shipping_address}
      </Box>
      <Box display={{ base: 'md', md: 'block' }} flex={{ base: '1', md: '1' }}>
        <strong>Order Date:</strong>{' '}
        {new Date(order.order.created_at).toLocaleTimeString()}{' '}
        {new Date(order.order.created_at).toLocaleDateString()}
      </Box>
    </Stack>
  ))}
</Box>
  )
}

export default OrderList;
