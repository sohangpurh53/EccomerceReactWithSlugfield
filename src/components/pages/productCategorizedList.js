import React, { useEffect, useState } from 'react'
import axiosInstace from '../utils/axiosInstance'
import { Box, Text, Button, Image, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCategoryList = () => {
    const [productDetails, setProductDetails] = useState({ product:[],
        category:[]
     })
  
    
 const fetchData = async ()=>{
            try {
                const productData = await axiosInstace('list/categories/product/')
                setProductDetails(productData.data)
               

            } catch (error) {
                console.log(error.message)
            }
        }
    useEffect(()=>{
       fetchData()
    },[])  
 const product = productDetails.product_data
 const category = productDetails.category_data
  
  return (
    <>
    <Flex wrap={'wrap'} >
    {category && category.map(item => (
    <Box key={item.id}>
        <Text fontWeight={'bold'}>
            {item.name}
       </Text>
        {product && product.map(data => (
            (item.id === data.category) && (
                <Flex flexDir={'column'} alignItems={'center'} mx={4} mb={2} w={{base:'150px', md:'md', lg:'lg'}} boxShadow={'md'} key={data.id}>
                    <Box w={'40px'} h={'40px'}>
                        <Image
                         maxW={{base:'md', md:'md', lg:'lg'}}
                        boxSize={'100%'}
                        objectFit={'contain'}
                        src={`https://api.eccomerce.digitaltek.co.in${data.first_image}`}
                        />
                    </Box>
                    
                    <Text color={'blackAlpha.600'}>
                        {data.name}
                    </Text>
                    <Button color={'white'} bg={'teal.500'} as={Link} to={`/product/${data.slug}/`}>
                        View
                    </Button>
                </Flex>
            )
        ))} 
    </Box>
))}
       

    </Flex>
    
    </>
  )
}

export default ProductCategoryList