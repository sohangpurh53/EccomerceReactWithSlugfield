import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Notification from '../utils/Notfication';
import { useNavigate } from 'react-router-dom';
import { PlusSquareIcon, MinusIcon} from '@chakra-ui/icons'

const Cart = () => {
  const [cartDetails, setCartDetails] = useState({ cart_items: [] });
  const [notification, setNotification] = useState('')
  const usenavigation = useNavigate()

  const fetchData = async () => {
    try {
      const cart = await axiosInstance('create/cart/').then(response => response.data);
      setCartDetails(cart);
    } catch (error) {
      console.log(error)
    }
  }

  const cart_items = cartDetails.cart_items

  const addToCart = async (e, product_id) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`add_to_cart/${product_id}/`).then(response => {
        if (response.data) {
          setNotification('Item Added Successfully');
          setTimeout(() => { setNotification('') }, 2000)
          fetchData()

        } else {
          console.log('Error occur while adding, something went wrong')
        }
      });
    } catch (error) {
      console.log(error)
    }

  }

  const removeCartItem = async (e, cart_item_id) => {
    e.preventDefault()
    try {
      await axiosInstance.delete(`remove_cart_item/${cart_item_id}/`).then(
        usenavigation(0)
      );
    } catch (error) {
      console.log(error)
    }
  }

  const reduceCartItem = async (e, cart_item_id) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`reduce_quantity/${cart_item_id}/`);
      if (response.data) {
        setNotification('Item Quantity Reduced Successfully');
        setTimeout(() => { setNotification('') }, 2000);
        fetchData()
      } else {
        console.log('Error occurred while reducing quantity, something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()

  }, [])

  return (
    <Box className="cart-container">
      <Notification message={notification} />

      <Heading as="h1" mb="4">Cart</Heading>

      <Flex direction="column" align="stretch">
        {cart_items.length > 0 ? (cart_items.map(item => (
          <Box className="cart-item" key={item.id} mb="4">
            <Heading as="h3" size="md">Item name: {item.product.name}</Heading>
            <Text>Description: {item.product.description}</Text>
            <Text>Price: ₹{item.product.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Flex justify="space-between" mt="2">
              <Button colorScheme="teal" size="sm" onClick={(e) => reduceCartItem(e, item.id)}><MinusIcon/>Reduce Quantity</Button>
              <Button colorScheme="teal" size="sm" onClick={(e) => addToCart(e, item.product.id)}><PlusSquareIcon/>Add to Cart</Button>
              <Button colorScheme="red" size="sm" onClick={(e) => removeCartItem(e, item.id)}>Remove</Button>
            </Flex>
          </Box>
        ))) : (
          <Text className="missing-message" mt="4" color="red.500">
            Missing Cart items? <Link to={'/'}>Add Product to cart</Link>
          </Text>
        )}
      </Flex>

      {cart_items.length > 0 ? (
        <Box className="order-summary" mt="4">
          <Heading as="h2" size="md" mb="2">Order Summary</Heading>
          <Flex justify="space-between" mb="2">
            <Text>Subtotal:</Text>
            <Text>₹{cartDetails.subtotal}</Text>
          </Flex>
          <Flex justify="space-between" mb="2">
            <Text>Shipping:</Text>
            <Text>₹{cartDetails.shipping_fee}</Text>
          </Flex>
          <Flex justify="space-between" mb="2">
            <Text>Total:</Text>
            <Text>₹{cartDetails.total_amount}</Text>
          </Flex>
          <Link to={'/order/'}>
            <Button colorScheme="teal">Proceed to Checkout</Button>
          </Link>
        </Box>
      ) : ('')}
    </Box>
  );
};

export default Cart;
