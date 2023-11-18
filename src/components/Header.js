import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text,
   InputGroup, InputRightElement, Image,
   IconButton,  Flex, Input,
    Button, Link as ChakraLink } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useAuth } from './context/Authcontext';
import axiosInstance from './utils/axiosInstance'



const Header = () => {
  const { accessToken } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const inputRef = useRef()

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [accessToken]);



  const handleSearchResults = (e)=>{
    setSearchValue(e.target.value);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchResults(null);
    try {
      const response = await axiosInstance(`product/?search=${searchValue}`);
      const data = await response.data;
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault()
      handleSubmit(event);
    }
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
   <Box as="header" bg="blue.100" p={4}>
      <Flex justifyContent="space-between" alignItems="center" maxW="container.xl" mx="auto">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ display: 'inline-block', marginRight: '1rem' }}>
            <ChakraLink as={Link} to="/">
              Home
            </ChakraLink>
          </li>
          <li style={{ display: 'inline-block', marginRight: '1rem' }}>
            <ChakraLink as={Link} to="/cart/">
              Cart
            </ChakraLink>
          </li>
          <li style={{ display: 'inline-block', marginRight: '1rem' }}>
            <ChakraLink as={Link} to="/admin/dashboard/">
              Admin-Dashboard
            </ChakraLink>
          </li>
          <li style={{ display: 'inline-block', marginRight: '1rem' }}>
            <ChakraLink as={Link} to="/user/profile/">
              User-Profile
            </ChakraLink>
          </li>
         
        </ul>

        <Flex alignItems="center">
        <InputGroup maxW="180px" mt={'10px'}>
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
              onChange={handleSearchResults}
              onKeyDown={handleKeyPress}
              ref={inputRef}
            />
          </InputGroup>
        </Flex>

        {authenticated ? (
          <ChakraLink as={Link} to="/signout">
            Sign Out
          </ChakraLink>
        ) : (
          <ChakraLink as={Link} to="/signin">
            Sign In
          </ChakraLink>
        )}
      </Flex>
      <Box>
{searchResults && (
        <Box maxW={'400px'} mt="4" mx={'auto'} p="4" bgColor="#fff" borderRadius="md" boxShadow="md">
          <Text fontWeight="bold"  fontSize="lg">Search Results:</Text>
          {searchResults.map(result => (
            <Box key={result.id} m="2" p="2" borderWidth="1px" borderRadius="md">
              <Box h={'50px'} w={'50px'} >
                <Image boxSize={'100%'}  src={`http://127.0.0.1:8000${result.first_image}`} alt='result.name'/>
              </Box>
              <Text color={'black'} fontWeight="bold" fontSize="md">{result.name}</Text>
              <Button size="sm" onClick={() => setSearchResults(null)}  as={Link} to={`/product/${result.slug}/`}>View Product</Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
    </Box>
   
    
   
  );
};

export default Header;
