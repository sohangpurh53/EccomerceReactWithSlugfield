import React from 'react';
import {

  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  // Input,
  // IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaFacebook,  FaInstagram,  FaWhatsapp,  } from 'react-icons/fa';
// import { BiMailSend } from 'react-icons/bi';
import { Link } from 'react-router-dom';




const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      // target='_blank'
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
}

function Footer() {

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
   
            </Box>
            <Text fontSize={'sm'}>© 2023 Eccomerce. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              
              <SocialButton label={'Whatsapp'} href={'#'}>
                <FaWhatsapp />
              </SocialButton>
              
              <SocialButton label={'Facebook'}  href={'#'}>
                <FaFacebook />
              </SocialButton>
              <SocialButton label={'Instagram'}  href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Eccomerce</ListHeader>
            <Box>
             <Link to={'#'}> About us</Link>
            </Box>
            <Box >
              <Link to={'#'}> Blog</Link>
            
            </Box>
            <Box >
            <Link to={'/contact-us/'}>Contact us</Link>   
            </Box>
            <Box >
            <Link to={'#'}>Pricing</Link> 
            </Box>
            <Box >
            <Link to={'#'}>Testimonials</Link>  
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Box >
            <Link to={'#'}>Help Center</Link> 
            </Box>
            <Box >
            <Link to={'#'}> Terms of Service</Link>
            </Box>
            <Box >
                <Link to={'#'}>Legal</Link>
            </Box>
            <Box >
            <Link to={'#'}>Privacy Policy</Link> 
            </Box>
            <Box  >
              <Link to={'#'}>  Satus</Link>
            </Box>
          </Stack>
          {/* <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
             
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack> */}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Footer;