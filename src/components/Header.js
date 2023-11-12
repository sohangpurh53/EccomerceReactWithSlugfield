import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Input, Button, Link as ChakraLink } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useAuth } from './context/Authcontext';

const Header = () => {
  const { accessToken } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [accessToken]);

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
         
        </ul>

        <Flex alignItems="center">
          <Input
            type="text"
            placeholder="Search"
            variant="filled"
            size="sm"
            mr={2}
          />
          <Button
            
            colorScheme="teal"
            size="sm"
          >
          <SearchIcon />
          </Button>
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
    </Box>
  );
};

export default Header;
