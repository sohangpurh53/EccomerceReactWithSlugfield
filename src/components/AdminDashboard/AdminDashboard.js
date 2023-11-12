import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { BiSidebar } from 'react-icons/bi';

import ProductForm from './forms/productForm';
import CategoryForm from './forms/categoryForm';
import OrderList from './AdminOrders';
import { CloseIcon } from '@chakra-ui/icons';

const AdminDashboard = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState('TableDisplay');

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
    onToggle();
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductForm':
        return <ProductForm />;
      case 'CategoryForm':
        return <CategoryForm />;
      case 'OrderDetails':
        return <OrderList />;
      default:
        return '';
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="row" height="100vh" >

        <HStack p="4" bg="gray.700" color="white" w={'50px'} >
          <IconButton
            icon={isOpen ? <CloseIcon />: <BiSidebar />}
            onClick={onToggle}
            aria-label="Toggle Navigation Bar"
           
          />
          <Center flex="1">
            <Button onClick={onToggle} visibility={'hidden'}>
              {isOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          </Center>
        </HStack>


        <VStack
          spacing={4}
          align="start"
          bg="gray.700"
          color="white"
          width={isOpen ? '10%' : '0'}
          p="4"
          transition="width 0.3s ease"
          overflow="hidden"
        >
          {isOpen && (
            <>
              <Button onClick={() => handleClick('ProductForm')}>Create Product</Button>
              <Button onClick={() => handleClick('CategoryForm')}>Create Category</Button>
              <Button onClick={() => handleClick('OrderDetails')}>Orders Received</Button>
            </>
          )}
        </VStack>

        {/* Main Content */}
        <Box flex="1" p={{ base: '4', md: '4' }}>
          {renderComponent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
