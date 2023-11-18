import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box,Heading,Text, Button, Image, useToast } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';
import Notification from '../utils/Notfication';
import PageLoadingAnimation from '../utils/LoadingAnimation';

const SingleProductPage = () => {
  const [notification, setNotification] = useState('');
  const [SingleproductDetail, setSingleProductDetail] = useState({});
  const [productImage, setProductImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { slug } = useParams();
  const product_id = SingleproductDetail.id;
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axiosInstance(`product/${slug}/`).then((response) => response.data);
        const image = await axiosInstance(`products/images/${slug}/`).then((response) => response.data);
        setProductImage(image);
        setSingleProductDetail(product);
        setIsLoading(false)
      } catch (error) {
        console.log(`error while fetch products ${error}`);
        setIsLoading(false)
      }
    };
    fetchData();
  }, [slug]);

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`add_to_cart/${product_id}/`).then((response) => {
        if (response.data) {
          setNotification('Item Added Successfully');
          setTimeout(() => {
            setNotification('');
          }, 2000);
        } else {
          console.log('Error occur while adding, something went wrong');
        }
      });
    } catch (error) {
     if(error.request.status===401){ 
      toast({
        title: `Please login to continue`,
        description: "Please login to proceed cart or signup",
        status: 'warning',
        position:'top-right',
        duration: 5000,
        isClosable: true,
      })
     }else{
      console.log(error)
     }

    }
  };

  if (isLoading) {
    return <PageLoadingAnimation />
  }


  function handlePrevClick() {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productImage.length - 1 : prevIndex - 1));
  }

  function handleNextClick() {
    setCurrentImageIndex((prevIndex) => (prevIndex === productImage.length - 1 ? 0 : prevIndex + 1));
  }

  return (
    <>
      <Box maxW="container.xl" mx="auto" p={4}>
        <Notification message={notification} />
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
          <Box flex="1" maxW={{ base: 'md', md: 'md', lg: 'lg' }} h={'md'}   textAlign="center">
          <Box
      maxW={['100%', '100%', '500px']} // Adjust width for different screen sizes
      h={['auto', 'auto', '500px']} // Adjust height for different screen sizes
    >
      <Image
        src={productImage[currentImageIndex]?.image}
        objectFit="contain"
        w="100%"
        h="100%"
        alt=""
      />
    </Box>
            <Button onClick={handlePrevClick} mt={2} mr={2}>
              Previous
            </Button>
            <Button onClick={handleNextClick} mt={2}>
              Next
            </Button>
          </Box>
          <Box flex="1" ml={{ md: 4 }}>
            <Heading style={{ fontSize: '2rem', marginBottom: '1rem' }}>{SingleproductDetail.name}</Heading>
        
           
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              &#8377;{SingleproductDetail.price}
            </p>
            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
              <Button onClick={addToCart} mb={{ base: 2, md: 0 }} mr={{ md: 2 }}>
                <i className="fas fa-cart-plus"></i> Add to Cart
              </Button>
              <Button as={Link} to={'/cart/'}> Checkout Now</Button>
            </Box>
            <Text mt={5}>
            {SingleproductDetail.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleProductPage;
