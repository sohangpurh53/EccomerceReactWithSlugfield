import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Box, Stack, Image,  Button } from '@chakra-ui/react';
import {Link,  useParams } from 'react-router-dom';

const ProductImageList = () => {
    const {slug} = useParams()
    const [ProductDetails, setProductDetails] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const product = await axiosInstance(`products/images/${slug}/`).then(response=> response.data);
                setProductDetails(product)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[slug])
    console.log(ProductDetails)
  return (
    <Box maxW="50%" mx="auto">
    {ProductDetails.map((product, index) => (
      <Stack key={product.id} direction="row" spacing="2" borderBottom="1px solid #ccc" p="2">
        <Box flex="1">
          <strong>Product:</strong> {product.product.name}
        </Box>
        <Box  flex="2">
          <strong>Image:{index+1}</strong> <Image src={product.image} alt="" />
        </Box>
        <Stack direction="row" flex="3" spacing="2" justify="flex-end">
          <Link to={`/product/images/delete/${product.id}/`} >
            <Button colorScheme="red" variant="outline" size="sm">
              Delete
            </Button>
          </Link>
        </Stack>
      </Stack>
    ))}
  </Box>
  )
}

export default ProductImageList