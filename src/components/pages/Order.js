import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {  useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Image,
  FormLabel,
  Select,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react"

import Notification from '../utils/Notfication';
import { Container } from 'reactstrap';
import PageLoadingAnimation from '../utils/LoadingAnimation';
import SuccessPage from './successPage';



function PlaceOrder() {
  const [addressChoice, setAddressChoice] = useState(''); // Track user's choice of address
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    mobile_no: '',
  }); // Track new shipping address
  const navigate  = useNavigate()
  const [shippingAddresses, setShippingAddresses] = useState([]); // Track existing shipping addresses
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notification, setNotification] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState([])
 


  useEffect(()=>{

    const fetchOrder = async ()=>{
     const data = await axiosInstance.get('list/cart-item/').then(response=> response.data)
     setOrderDetails(data)
    }
    fetchOrder()

  },[])

 
  const orderTotalAmount = orderDetails.reduce(
    (total, order) => total + order.product.price * order.quantity,
    0
  );
 const orderTotalWithShipping = orderTotalAmount + orderDetails.reduce(
    (totalShipping, order) => totalShipping + order.product.shipping_fee * order.quantity,
    0
  );

  const createShippingAddress = (e) => {
    e.preventDefault();
    const data = {
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      country: shippingAddress.country,
      postal_code: shippingAddress.postal_code,
      mobile_no: shippingAddress.mobile_no,
    }
   
    try {
      axiosInstance.post('create/shipping-address/', data).then(response => {
        if (response.data) {
          setNotification('New Shipping Address Added Successfully');
          navigate(0)
        }
      })
    } catch (error) {
      console.log(`error while create shipping address ${error.request.status}`)
    }
  }

  
  useEffect(() => {
    // Fetch user's existing shipping addresses
    axiosInstance.get('list/shipping-address/')
      .then(response => {
        setShippingAddresses(response.data);
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching shipping addresses:', error);
      });
      
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleAddressChange = (event) => {
    setAddressChoice(event.target.value);
  };

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handlePlaceOrder = () => {
    const data = {
      address_choice: addressChoice,
      shipping_address: shippingAddress,
      // Add any other data you need to send to the backend for placing the order
    };

    axiosInstance.post('create/order/', data)
      .then(response => {if(response.data){
        setOrderPlaced(true);
        // navigate('/success/')
      
      }else{
        console.log('something went wrong')
      }
        
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });
  };


  if (orderPlaced) {
    <Notification message='Order Places successfully' />
  }

  return (
    orderDetails.length > 0 ? (
    isLoading? (
      <PageLoadingAnimation />
    ) : orderPlaced ? (
      <SuccessPage />
    ):
    (<Box my={25} mx={'auto'} maxW={{base: 'md', md: 'md', lg: 'lg'}}>
        <Text textAlign={'center'} fontSize="xl">Place Your Order</Text>
     
        <Container >    
          {orderDetails.map(order=>(  
    <Box key={order.id} borderWidth="1px" borderRadius="lg" p="4" m="4">
        <VStack spacing="4" align="start">
          <Box mx={'auto'} w={'50px'} maxW={{base:'md', md:'md', lg:'lg'}} >
            <Image boxSize={'100%'} src={`https://api.eccomerce.digitaltek.co.in${order.product.first_image}`} />
          </Box>
          <Text fontWeight="bold">{order.product.name}</Text>
          <HStack>
            <Text>Quantity: {order.quantity}</Text>
            <Text>Price: ₹{order.product.price}</Text>
            
          </HStack>
          <Text>Shipping Fee: ₹{order.product.shipping_fee}</Text>
          <Text>Total: ₹{order.product.price*order.quantity}</Text>
        </VStack>
      </Box>  
          ))}
          <Text fontSize={'16px'} fontStyle={'oblique'} textAlign={'center'}> Order Total Amount {orderTotalWithShipping}</Text>
            </Container>

        
      


      <Notification message={notification} />
      <VStack spacing={4}>
        
        <FormControl>
          
          <FormLabel>Select Address:</FormLabel>
          <Select value={addressChoice} onChange={handleAddressChange}>
            <option value="">-- Select an address --</option>
            {shippingAddresses.map(address => (
              <option key={address.id} value={address.id}>{address.address}</option>
            ))}
            <option value="new">New Address</option>
          </Select>
        </FormControl>
        {addressChoice === 'new' && (
          <VStack spacing={2} className='address-container'>
            <Input type="text" placeholder="Please Write Your Address" name='address' value={shippingAddress.address} onChange={handleShippingAddressChange} />
            <Input type="text" placeholder="Please Write Your City" name='city' value={shippingAddress.city} onChange={handleShippingAddressChange} />
            <Input type="text" placeholder="Please Write Your State" name='state' value={shippingAddress.state} onChange={handleShippingAddressChange} />
            <Input type="text" placeholder="Please Write Your Country" name='country' value={shippingAddress.country} onChange={handleShippingAddressChange} />
            <Input type="text" placeholder="Please Write Your Postal Code" name='postal_code' value={shippingAddress.postal_code} onChange={handleShippingAddressChange} />
            <Input type="number" placeholder="Please Write Your Mobile Number" name='mobile_no' value={shippingAddress.mobile_no} onChange={handleShippingAddressChange} />
            <Button colorScheme="teal" onClick={createShippingAddress}>Create Address</Button>
          </VStack>
        )}
        {addressChoice === 'new' ? ('') : (<Button colorScheme="teal" onClick={handlePlaceOrder}>Place Order</Button>)}
      </VStack>
    </Box>)) : null
  );
}

export default PlaceOrder;
