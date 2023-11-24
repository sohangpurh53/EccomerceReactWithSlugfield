import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Image, Flex } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import PageLoadingAnimation from '../utils/LoadingAnimation';

const HomePage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axiosInstance(`homepage/?page=${currentPage}`).then((response) => response.data);
        setProductDetails(products.results || []);
        setNextPage(products.next !== null);
        setPreviousPage(products.previous !== null);
        setIsLoading(false)
      } catch (error) {
        console.log(`error while fetch products homepage ${error}`);
        setIsLoading(false)
      }
    };
    fetchData();
  }, [currentPage]);

  const nextPageButton = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPageButton = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
    }
  };



  return (
    isLoading? <PageLoadingAnimation/> : (<Box bg={'gray.100'} minH={'100vh'} p={4}>
    <Flex direction={['column', 'row']} flexWrap={'wrap'} alignItems={'center'}  justify={'flex-start'}>
      {productDetails.map((product) => (
        <Box
          key={product.id}
          w={'200px'}
          h={'180px'}
         maxW={{base:'md',md:'md' , lg:'lg' }} 
          mx={2}
          my={4}
          borderWidth={'1px'}
          borderColor={'teal.300'}
          borderRadius={'md'}
          p={2}
          textAlign={'center'}
        >
          <Box h={'40px'} w={'40px'} mx={'auto'}>
            <Image
              objectFit={'contain'}
              mt={2}
              boxSize='100%'
              src={`http://localhost:8000/${product.first_image}`}
              alt=""
            />
          </Box>
          <Box mt={2} className="title-container">
            <Text fontSize={'14px'} color={'blue.700'}>
            {product.name.length > 30 ? `${product.name.substring(0, 20)}...` : product.name}
            </Text>
          </Box>
          <Text color={'blue.700'} fontSize={'sm'} mt={1} className="price">
            &#8377;{product.price}
          </Text>
          <Button
            mt={2}
            width={['100%', '50%', '45%', '40%']}
            colorScheme='teal'
            as={Link}
            to={`/product/${product.slug}/`}
          >
            View
          </Button>
        </Box>
      ))}
      <Box mt={4} w={'100%'} display="flex" alignItems="center" justifyContent="center">
        {previousPage && (
          <Button onClick={previousPageButton} colorScheme="teal" mr={2}>
            Previous
          </Button>
        )}
        <Box className="page-number">Page {currentPage}</Box>
        {nextPage && (
          <Button onClick={nextPageButton} colorScheme="teal" ml={2}>
            Next
          </Button>
        )}
      </Box>
    </Flex>
  </Box>)
    
  );
};

export default HomePage;
