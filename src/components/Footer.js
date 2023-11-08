import React from 'react';
import { Link } from 'react-router-dom';
import { Box, UnorderedList, ListItem, Link as ChakraLink } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" py={4} bg="gray.200">
      <Box maxW="container.lg" mx="auto" textAlign="center">
        <UnorderedList listStyleType="none" p={0} m={0}>
          <ListItem display="inline" mx={2}>
            <Link to="/" as={ChakraLink}>HomePage</Link>
          </ListItem>
          <ListItem display="inline" mx={2}>
            <Link to="/signin" as={ChakraLink}>SignIn</Link>
          </ListItem>
          <ListItem display="inline" mx={2}>
            <Link to="/signout" as={ChakraLink}>SignOut</Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Footer;
