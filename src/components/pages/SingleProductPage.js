import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box,Text, Button, Image, useToast, Stack, Avatar, HStack, VStack, Spacer, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import axiosInstance from '../utils/axiosInstance';
import Notification from '../utils/Notfication';
import PageLoadingAnimation from '../utils/LoadingAnimation';
import ReviewForm from '../AdminDashboard/forms/reviewForm';
import { useAuth } from '../context/Authcontext';


const SingleProductPage = () => {
  const [notification, setNotification] = useState('');
  const [SingleproductDetail, setSingleProductDetail] = useState({});
  const [productImage, setProductImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { slug } = useParams();
  const product_id = SingleproductDetail.id;
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true);
  const [productReview, setProductReview] = useState([])
  const [userData, setUserData] = useState({})
  const {accessToken} = useAuth()

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

    const fetchReview = async ()=>{
      try {
        const review = await axiosInstance(`products/${slug}/reviews/`).then(response=> response.data);
       
        setProductReview(review)
      } catch (error) {
           console.log(`error while fetch review ${error.request.status}`)
      }
    }
    fetchReview()
    const fetchUser = async ()=>{
      try {
         const userResponse = await axiosInstance('user/profile/').then(response=> response.data)
        setUserData(userResponse)
      } catch (error) { 
        console.log(`error while fetch user ${error.request.status}`)
        
      }
      
    }
    fetchUser()
  }, [slug]);



  const hasSubmittedReview = () => {
    // Assuming you have user information available in your context or state
    const userId = userData.id; // Replace 'user-id' with the actual user ID

    return productReview.some((review) => review.user.id === userId);
  };

  const addToCart = async (e) => {
    e.preventDefault();
   
    try {
      if (accessToken){
      const response = await axiosInstance.post(`add_to_cart/${product_id}/`)
        if (response.data) {
          setNotification('Item Added Successfully');
          setTimeout(() => {
            setNotification('');
          }, 2000);
        } else {
          console.log('Error occur while adding, something went wrong');
        }
   }else{
    toast({
          title: `Please login to continue`,
          description: "Please login to proceed cart or signup",
          status: 'warning',
          position:'top-right',
          duration: 5000,
          isClosable: true,
        })
   }
     
    } catch (error) {
      console.log(`Error while product add to cart ${error.message}`)
    //  if(error.request.status===401){ 
    //   toast({
    //     title: `Please login to continue`,
    //     description: "Please login to proceed cart or signup",
    //     status: 'warning',
    //     position:'top-right',
    //     duration: 5000,
    //     isClosable: true,
    //   })
    //  }else{
    //   console.log(error.request.status)
    //  }

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
        <Box>
          <Box textAlign="center">
          <Box
      maxW={{base:'md', md:'md', lg:'lg'}} 
      
    >
      <Image
      mx={'auto'}
        src={productImage[currentImageIndex]?.image}
        objectFit="contain"
        w="350px"
        h="350px"
        alt=""
      />
    </Box>
    {productImage.length > 1? <> 
             <Button onClick={handlePrevClick} mt={2} mr={2}>
              Previous
            </Button>
            <Button onClick={handleNextClick} mt={2}>
              Next
            </Button> </>:'' }
           
          </Box>
          <Box flex="1" ml={{ md: 4 }}>
            <Text fontWeight={'bold'} fontSize={'16px'}>{SingleproductDetail.name}</Text>
        
           
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              &#8377;{SingleproductDetail.price}
            </p>
            <Box maxW={{base:'200px', md:'md', lg:'lg'}} display="flex" flexDirection={{ base: 'column', md: 'row' }}>
              <Button onClick={addToCart} mb={{ base: 2, md: 0 }} maxW={{base:'200px', md:'md', lg:'lg'}} mr={{ md: 2 }}>
                <i className="fas fa-cart-plus"></i> Add to Cart
              </Button>
              <Button as={Link} to={'/cart/'}> Proceed to Cart</Button>
            </Box>
            <Text mt={5}>
            {SingleproductDetail.description}
            </Text>
          </Box>
        </Box>
      </Box>
<Flex mx={2} ml={10} justifyContent={'flex-end'} w={{base:'250px', md:'md', lg:'lg '}}>
      <Stack spacing={4}>
            {productReview.map((review) => (
                <Box key={review.id} p={4} shadow="md" borderWidth="1px">
                    <HStack>
                        <Avatar name={review.user.username} />
                        <VStack align="start" spacing={0} ml={3}>
                            <Text fontWeight="bold">{review.user.username}</Text>
                            <HStack>
                                {[...Array(review.rating)].map((_, index) => (
                                    <StarIcon key={index} color="yellow.400" />
                                ))}
                            </HStack>
                            <Text>{review.comment}</Text>
                        </VStack>
                        <VStack align="start" spacing={0} ml={3}> <Text color={'blackAlpha.600'} fontSize='sm'>{new Date(review.created_at).toDateString()} </Text></VStack>   
                        <Spacer />
                       
                    </HStack>
                </Box>
            ))}
        </Stack>
      </Flex> 
      {accessToken? <Box mx={'auto'} w={{base:'300px', md:'md', lg:'lg '}}>
        {!hasSubmittedReview() && <ReviewForm />}
        </Box>:''}
      
    </>
  );
};

export default SingleProductPage;
