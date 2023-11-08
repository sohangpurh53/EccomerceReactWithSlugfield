import React, { useState, useEffect } from 'react';
import { Box, Button, Image } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);

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

  return (
    <Box className="container" maxW="container.xl" mx="auto">
      {productDetails.map((product) => (
        <Box maxW='100px' h='auto'  key={product.id} className="product-card">
          <Image boxSize='100%' src={`http://localhost:8000/${product.first_image}`} alt="" />
          <Box className="title-container">
            <h3>{product.name}</h3>
          </Box>
          <p className="price">&#8377;{product.price}</p>
       <Button colorScheme='teal'> <Link to={`/product/${product.slug}/`}>View</Link></Button>  
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
    </Box>
  );
};

export default HomePage;
