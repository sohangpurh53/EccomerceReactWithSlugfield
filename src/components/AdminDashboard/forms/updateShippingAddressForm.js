import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useToast,Input, FormControl,FormLabel,Button, Flex } from '@chakra-ui/react'

const UpdateShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    mobile_no: '',
  })
  const {id} = useParams()
  const toast = useToast()
  const Navigate = useNavigate()

  useEffect(()=>{
    const fetcData = async ()=>{
      try {
      const  shippingAddress = await axiosInstance(`update/shipping-address/${id}/`)
      setShippingAddress(shippingAddress.data)
      } catch (error) {
        console.log(`Error while update shipping address ${error.message}`)
      }
    }
    fetcData()
  },[id])
const handleShippingAddress = (e)=>{
      const {name, value} = e.target;
      setShippingAddress({
        ...shippingAddress,
        [name]:value,
      })
     }
  const UpdateShippingAddress = (e) => {
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
      axiosInstance.put(`update/shipping-address/${id}/`, data).then(response => {
        if (response.data) {
          toast({
            title: 'Updated Shipping Address.',
            description: "Shipping Address Updated Successfully.",
            status: 'success',
            position:'top-right',
            duration: 4000,
            isClosable: true,
          })
          setTimeout(()=>{Navigate('/user/profile/')},2000)
         
        }
      })
    } catch (error) {
         console.log(`error while update shipping address ${error.request.status}`)
           
    }
  }

  return (
    <>
    <Flex alignItems={'center'} flexDir={'column'} boxShadow={'md'} mt={5} mx={'auto'} w={{base:'300px', md:'md', lg:'lg'}}>
<FormControl w={'90%'}>
    <FormLabel>Address</FormLabel>
    <Input type="text" placeholder="Please Write Your Address" name='address' value={shippingAddress.address} onChange={handleShippingAddress} />
    </FormControl>

    <FormControl w={'90%'}>
    <FormLabel>City</FormLabel> 
    <Input type="text" placeholder="Please Write Your City" name='city' value={shippingAddress.city} onChange={handleShippingAddress} />
    </FormControl>

    <FormControl w={'90%'}>
    <FormLabel>State</FormLabel> 
    <Input type="text" placeholder="Please Write Your State" name='state' value={shippingAddress.state} onChange={handleShippingAddress} />
    </FormControl>

    <FormControl w={'90%'}>
    <FormLabel>Country</FormLabel> 
    <Input type="text" placeholder="Please Write Your Country" name='country' value={shippingAddress.country} onChange={handleShippingAddress} />
    </FormControl>

    <FormControl w={'90%'}>
    <FormLabel>Postal Code</FormLabel>
     <Input type="text" placeholder="Please Write Your Postal Code" name='postal_code' value={shippingAddress.postal_code} onChange={handleShippingAddress} />
    </FormControl>

    <FormControl w={'90%'}>
    <FormLabel>Mobile No</FormLabel> 
    <Input type="number" placeholder="Please Write Your Mobile Number" name='mobile_no' value={shippingAddress.mobile_no} onChange={handleShippingAddress} />
    </FormControl >
      <Button mt={2} mb={4} colorScheme="teal" onClick={UpdateShippingAddress}>Update Address</Button>
           
    </Flex>
    
           
           
           
           
          
   
    </>
  )
}

export default UpdateShippingAddress