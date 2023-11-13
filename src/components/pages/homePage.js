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
      } catch (error) {
        console.log(`error while fetch products ${error}`);
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

  if(isLoading){
    <PageLoadingAnimation/>
  }else{
    setIsLoading(false)
  }

  return (
    <Box bg={'gray.100'} h={'100vh'}> 
    <Flex >
      {productDetails.map((product) => (
        <Box flexDirection={'column'} mx={3} mt={'2'} display={'flex'} alignItems={'center'}  maxW='100px' h='auto' borderWidth={'1px'} borderColor={'teal.300'} key={product.id} className="product-card">
          <Image mt={2} boxSize='50%' src={`http://localhost:8000/${product.first_image}`} alt="" />
          <Box className="title-container">
            <Text color={'blue.700'}> {product.name}</Text>
          </Box>
          <Text  color={'blue.700'} fontSize={'sm'} className="price">&#8377;{product.price}</Text>
       <Button mb={2} width={'50%'} colorScheme='teal'> <Link to={`/product/${product.slug}/`}>View</Link></Button>  
        </Box>
      ))}
      <Box className="pagination" mt={4} display="flex" alignItems="center" justifyContent="center">
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

    </Box>
  );
};

export default HomePage;
