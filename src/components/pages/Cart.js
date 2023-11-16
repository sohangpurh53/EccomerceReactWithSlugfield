import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Notification from '../utils/Notfication';
import { useNavigate } from 'react-router-dom';
import { AddIcon, MinusIcon} from '@chakra-ui/icons'
import { BiCart } from 'react-icons/bi';

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
    <Flex className="cart-container"  justifyContent={'space-around'}>
      <Notification message={notification} />

      <Heading as="h1" mb="4">Cart</Heading>

      <Flex direction="column" justifyContent={'center'} alignItems={'center'}>
        {cart_items.length > 0 ? (cart_items.map(item => (
          <Box className="cart-item" key={item.id} mb="4">
            <Heading as="h3" size="md">Item name: {item.product.name}</Heading>
            <Box h='50px' w='50px'>
              <Image
              src={`http://127.0.0.1:8000${item.product.first_image}`}
              objectFit={'contain'}
              boxSize='100%'
              />

             
            </Box>
            <Text>Description: {item.product.description}</Text>
            <Text>Price: ₹{item.product.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Flex justify="space-between" mt="2">
              <Button colorScheme="teal" size="sm" onClick={(e) => reduceCartItem(e, item.id)}><MinusIcon/></Button>
              <Text>{item.quantity}</Text>
              <Button colorScheme="teal" size="sm" onClick={(e) => addToCart(e, item.product.id)}><AddIcon/></Button>
              <Button colorScheme="red" size="sm" onClick={(e) => removeCartItem(e, item.id)}>Remove</Button>
            </Flex>
          </Box>
        ))) : (
          <Box float={'left'}><Text  mt="4" color="red.500">
            Missing Cart items? 
            <BiCart fontSize={'50px'}/>
            
          </Text><Button as={Link} to={'/'}>Add Product to cart </Button>
          </Box>
          
        )}
      </Flex>

      {cart_items.length > 0 ? (
        <Box className="order-summary" mt="4" >
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
    </Flex>
  );
};

export default Cart;
