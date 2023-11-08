import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Image } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';
import Notification from '../utils/Notfication';

const SingleProductPage = () => {
  const [notification, setNotification] = useState('');
  const [SingleproductDetail, setSingleProductDetail] = useState({});
  const [productImage, setProductImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { slug } = useParams();
  const product_id = SingleproductDetail.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axiosInstance(`product/${slug}/`).then((response) => response.data);
        const image = await axiosInstance(`products/images/${slug}/`).then((response) => response.data);
        setProductImage(image);
        setSingleProductDetail(product);
      } catch (error) {
        console.log(`error while fetch products ${error}`);
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
      console.log(error);
    }
  };

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
          <Box flex="1" mb={{ base: 4, md: 0 }} maxW='400px' h='auto' objectFit={'contain'} textAlign="center">
            <Image src={productImage[currentImageIndex]?.image} boxSize="100%" alt="" />
            <Button onClick={handlePrevClick} mt={2} mr={2}>
              Previous
            </Button>
            <Button onClick={handleNextClick} mt={2}>
              Next
            </Button>
          </Box>
          <Box flex="1" ml={{ md: 4 }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{SingleproductDetail.name}</h2>
            <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>{SingleproductDetail.description}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              &#8377;{SingleproductDetail.price}
            </p>
            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
              <Button onClick={addToCart} mb={{ base: 2, md: 0 }} mr={{ md: 2 }}>
                <i className="fas fa-cart-plus"></i> Add to Cart
              </Button>
              <Button>Buy Now</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleProductPage;
