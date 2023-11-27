// SuccessPage.js
import { Box, Heading, Text, Circle } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const SuccessPage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Circle size="100px" bg="green.200" color="green.500" mb={6} mx="auto">
        <FaCheckCircle size={60} />
      </Circle>
      <Heading as="h1" size="xl" mb={4}>
        Order Successful!
      </Heading>
      <Text fontSize="lg" mb={6}>
        Thank you for your order. It's on its way!
      </Text>
      <Button as={Link} to="/">Go back to Home</Button>
    </Box>
  );
};

export default SuccessPage;
