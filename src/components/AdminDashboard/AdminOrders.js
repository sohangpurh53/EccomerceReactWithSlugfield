import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"

const OrderList = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  // order data fetched
  const fetchData = async () => {
    try {
      const orderData = await axiosInstance('list/order/').then(response => response.data);
      setOrderDetails(orderData);
    } catch (error) {
      console.log(`error while fetching order data ${error.message}`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <TableContainer maxW={'max-content'}>
    <Table variant="striped" colorScheme="blue">
      <Thead>
        <Tr>
          <Th>Customer</Th>
          <Th>Order Total</Th>
          <Th>Customer Address</Th>
          <Th display={{ base: 'none', md: 'table-cell' }}>Order Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orderDetails.map((order) => (
          <Tr key={order.id}>
            <Td>{order.user}</Td>
            <Td>{order.total_amount}</Td>
            <Td>{order.shipping_address}</Td>
            <Td display={{ base: 'none', md: 'table-cell' }}>
              {new Date(order.created_at).toLocaleTimeString()}{' '}
              {new Date(order.created_at).toLocaleDateString()}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
  )
}

export default OrderList;
