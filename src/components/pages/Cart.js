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
import PageLoadingAnimation from '../utils/LoadingAnimation';

const Cart = () => {
  const [cartDetails, setCartDetails] = useState({ cart_items: [] });
  const [notification, setNotification] = useState('')
  const usenavigation = useNavigate()
  const [isLoading, setIsLoading] = useState(true)


  const fetchData = async () => {
    try {
      const cart = await axiosInstance('create/cart/').then(response => response.data);
      
      setCartDetails(cart);
      setIsLoading(false)
    } catch (error) {
      console.log(`error while fetching cart details ${error.request.status}`)
      setIsLoading(false)
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
      console.log(`error while adding product ${error.request.status}`)
    
    }

  }

  const removeCartItem = async (e, cart_item_id) => {
    e.preventDefault()
    try {
      await axiosInstance.delete(`remove_cart_item/${cart_item_id}/`);
      
    } catch (error) {
      console.log(error)
    }
     usenavigation(0)
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
      console.log(`error while reduce product ${error.request.status}`);
    }
  }

  useEffect(() => {
    fetchData()
   

  }, [])

  return (
   isLoading? <PageLoadingAnimation/> :(<Flex className="cart-container"  justifyContent={'space-around'}  wrap={'wrap'}>
      <Notification message={notification} />
      <Flex direction="column" justifyContent={'flex-start'} alignItems={'center'}>
      <Text mx={'auto'} fontSize={'1.5rem'} fontWeight={'bold'}>Cart</Text>
        {cart_items.length > 0 ? (cart_items.map(item => (
          <Box width={'200px'} maxW={{base:'md', md:'md', lg:'lg'}} className="cart-item" key={item.id} mb="4">
            <Heading as="h3" size="sm">Item name: {item.product.name}</Heading>
            <Box h='50px' w='50px'>
              <Image
              src={`http://127.0.0.1:8000${item.product.first_image}`}
              objectFit={'contain'}
              boxSize='100%'
              />

             
            </Box>
            {/* <Text>Description: {item.product.description}</Text> */}
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
        <Flex direction={{base:'column', md:'column', lg:'row'}} >
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
        </Flex>
      ) : ('')}
    </Flex>)
  );
};

export default Cart;
