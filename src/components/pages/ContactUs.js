import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';
import LoadingComponent from '../utils/LoadingAnimation';
import { FaEnvelope, FaFacebook,  FaInstagram,  FaWhatsapp,  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    enquiry: '',
  });
  const [isLoading, setIsLoading] = useState(true)
  const [successAlert, setSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('contact-us/', formData);
      setSuccessAlert(true);
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        enquiry: '',
      });

      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000); // Hide the alert after 5 seconds (adjust as needed)
    } catch (error) {
      console.log(`error while submit contact form: ${error}`);
    }
  };
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);
 ;
  return (
    <>
   
    {isLoading? (<LoadingComponent />):(
      <Box m={'5% auto'} maxW={'400px'} p={4} bg="white" borderRadius="lg" boxShadow="lg">
      {successAlert && (
        <Alert status="success" mb={4} variant="solid" position="relative" top="0" left="50%" transform="translateX(-50%)">
          <AlertIcon />
          Message sent successfully!
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setSuccessAlert(false)}
          />
        </Alert>
      )}

      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
          <Input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="enquiry">Enquiry</FormLabel>
          <Textarea
            id="enquiry"
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>

    
    </Box>
    )}
    <Flex  wrap={'wrap'} gap={'20px'} alignItems={'center'} justifyContent={'center'}>
      <Text fontWeight={'bold'} color={'gray.500'} fontSize={'1rem'}>
        Connect Us On Social Media
      </Text>
         <IconButton color={'green.400'}  borderRadius={'50%'} as={Link} target='_blank' fontSize={'30px'} label={'Whatsapp'} to={'https://whatsapp.com/channel/0029Va5Dzkw9sBIHtVNaHY44'}>
                <FaWhatsapp />
              </IconButton>
              
              <IconButton color={'blue.400'}  borderRadius={'50%'} as={Link} target='_blank' fontSize={'30px'} label={'Facebook'}  to={'https://www.facebook.com/rajengineering72'}>
                <FaFacebook />
              </IconButton>
              <IconButton color={'pink.400'}  borderRadius={'50%'} as={Link} target='_blank' fontSize={'30px'} label={'Instagram'}  to={'https://www.instagram.com/rajengineering__/'}>
                <FaInstagram />
              </IconButton>

             <Box>
               
              <Button  as={Link} to={'mailto:ecommerce@digitaltek.co.in'}>
             <FaEnvelope/>  <Text ml={2} fontWeight={'bold'} color={'gray.500'} fontSize={'1rem'}>  Get In Touch</Text> 
                </Button> 
             </Box>
            
              
      </Flex>
    </>
  );
};

export default ContactForm;