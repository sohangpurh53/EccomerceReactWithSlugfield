import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  Box,
 Stack,
  Button,
} from "@chakra-ui/react";

const ListProducts = () => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axiosInstance('list/product/').then(response => response.data);
      setProductDetails(product);
      } catch (error) {
        console.log(`error while fetch product ${error.message}`)
      }
    }
    fetchData();
  }, []);

  return (
    <Box >
    {productDetails.map((product, index) => (
      <Stack key={product.id} direction={{ base: 'column', md: 'row' }} spacing="2" borderBottom="1px solid #ccc" p="2">
        <Box flex="1">
          <strong>Index:</strong> {index + 1}
        </Box>
        <Box flex="2">
          <strong>Name:</strong> {product.name}
        </Box>
        <Box flex="2">
          <strong>Description:</strong> {product.description}
        </Box>
        <Box display={{ base: 'none', md: 'block' }} flex="1">
          <strong>Price:</strong> {product.price}
        </Box>
        <Box display={{ base: 'none', md: 'block' }} flex="1">
          <strong>Shipping Fee:</strong> {product.shipping_fee}
        </Box>
        <Box display={{ base: 'none', lg: 'block' }} flex="1">
          <strong>Stock:</strong> {product.stock}
        </Box>
        <Stack direction="row" flex="3" spacing="2" justify="flex-end">
          <Link to={`/product/update/${product.slug}`}>
            <Button colorScheme="teal" variant="outline" size="sm">
              Update
            </Button>
          </Link>
          <Link to={`/product/delete/${product.slug}`}>
            <Button colorScheme="red" variant="outline" size="sm">
              Delete
            </Button>
          </Link>
          <Link to={`/product/images/${product.slug}`}>
            <Button colorScheme="blue" variant="outline" size="sm">
              Images
            </Button>
          </Link>
        </Stack>
      </Stack>
    ))}
  </Box>
  )
}

export default ListProducts;
