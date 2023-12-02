import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Input,
  InputGroup,
  Text,
  Image,
  InputRightElement,
  IconButton,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  // useColorMode ,
  Link,
  Button,
  // Switch,
  Center,
  Stack,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink} from 'react-router-dom';
import axiosInstance from './utils/axiosInstance'
import { FaHome } from "react-icons/fa";
import { useAuth } from './context/Authcontext';
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const inputRef = useRef();
  const {accessToken} = useAuth()

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchResults(null);
  
    if (searchValue.trim() === '') {
      // console.log('Input is empty, cannot search.');
      return; // Do not proceed with the API call if the input is empty
    }
  
    try {
      const response = await axiosInstance.get(`product/?search=${searchValue}`);
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error(`Error fetching data ${error.message}`, );
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault()
      handleSubmit(event);
    }
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchResults(null);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Box as="header" p="4" bgColor="blue.300" color="white">
      <Flex alignItems="center">
        <Box mx={0}>
          <Link as={RouterLink} to="/">
            <Center>
            <FaHome   size={'25px'} />              
            </Center>
          </Link>
        </Box>

        <Spacer />

        <Center>
          <InputGroup ml={4} maxW={{base:'175px' , md:'md', lg:'lg'}} mt={'10px'}>
            <InputRightElement >
              <IconButton
                bg={'white'}
                color={'black'}         
                fontSize={'x-small'}
                aria-label="Search"
                variant="ghost"
                icon={<SearchIcon color="gray.300" />}
                size="sm"
                onClick={handleSubmit}
              />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search..."
              borderRadius="md"
              _focus={{ borderColor: '#00A4EF' }}
              py={2}
              pr={4}
              pl={10}
              color="black"
              borderColor="#fff"
              bg={'#fff'}
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              ref={inputRef}
            />
          </InputGroup>
         
        </Center>
        
        

        <Spacer /> 
        {isSmallerThanMd ?  <>
          <Stack ml={3} mr={-4} spacing={0} direction='row' align={'center'}>
        <Link  color={'white'} fontWeight={'normal'} fontSize={{base:'27px', md:'md', lg:'lg'}}  variant="ghost" as={RouterLink} to="/cart/"><CiShoppingCart /></Link>
        {accessToken? <Button color={'white'} fontWeight={'bold'} fontSize={{base:'14px', md:'md', lg:'lg'}} variant="ghost" as={RouterLink} to="/signout/" onClick={handleDrawerClose}>SignOut</Button>:
                      <Button color={'white'} fontWeight={'normal'} fontFamily={'serif'} fontSize={{base:'14px', md:'md', lg:'lg'}} variant="ghost" as={RouterLink} to="/signin/" onClick={handleDrawerClose}>SignIn</Button>}
        </Stack>
        
        {/* <Stack spacing={5}>
          
        </Stack> */}
         </>:'' }
      

        {isSmallerThanMd ? (
          <>
            <IconButton
              aria-label="Menu"
              variant="ghost"
              icon={<HamburgerIcon color="white" />}
              size="lg"
              onClick={handleDrawerOpen}
            />
            <Drawer placement="right" onClose={handleDrawerClose} isOpen={isDrawerOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Menu</DrawerHeader>
                  <DrawerBody>
                    <Stack spacing={3}>
                    
                      <Button  variant="ghost" as={RouterLink} to="/about-us/" onClick={handleDrawerClose}>About Us</Button>
                      <Button variant="ghost" as={RouterLink} to="/contact-us/" onClick={handleDrawerClose}>Contact</Button>
                  
                      {accessToken? <Button  variant="ghost" as={RouterLink} onClick={handleDrawerClose} to="/user/profile/"> User-Profile </Button>:''} 

                     {accessToken? <Button variant="ghost" as={RouterLink} to="/signout/" onClick={handleDrawerClose}>SignOut</Button>:
                      <Button variant="ghost" as={RouterLink} to="/signin/" onClick={handleDrawerClose}>SignIn</Button>}

                    </Stack>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={3}>
 
           
            <Button  variant="ghost" as={RouterLink} to="/cart/"><CiShoppingCart fontSize={'25px'}/> Cart </Button>
           {accessToken? <Button  variant="ghost" as={RouterLink} to="/user/profile/"> User-Profile </Button>:''} 
           

            {accessToken? <Button variant="ghost" as={RouterLink} to="/signout/" >SignOut</Button>:
                      <Button variant="ghost" as={RouterLink} to="/signin/" >SignIn</Button>}
          </Stack>
        )}
      </Flex>
      <Box>
  {searchResults !== null && (
    <Box  maxW={'400px'} mt="4" mx={'auto'} p="4" bgColor="#fff" borderRadius="md" boxShadow="md">
      {searchResults && searchResults.length > 0 ? (
        <>
          <Text fontWeight="bold" fontSize="lg">Search Results:</Text>
          {searchResults.map(result => (
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} key={result.id} m="2" p="2" borderWidth="1px" borderRadius="md">
              <Text color={'black'} fontWeight="bold" fontSize="md">{result.name}</Text>
              <Box h={'50px'} w={'50px'}>
                <Image boxSize={'100%'} objectFit={'contain'} src={`http://127.0.0.1:8000${result.first_image}`} alt={result.name} />
              </Box>
              <Button size="sm" onClick={() => setSearchResults(null)} as={RouterLink} to={`/product/${result.slug}/`}>View Product</Button>
            </Box>
          ))}
        </>
      ) : (
        <Box mt="4" mx="auto" p="4" borderRadius="md" boxShadow="md" textAlign="center">
          <Text color={'gray.600'}>No results found.</Text>
        </Box>
      )}
    </Box>
  )}
</Box>
    </Box>
  );
};

export default Header;