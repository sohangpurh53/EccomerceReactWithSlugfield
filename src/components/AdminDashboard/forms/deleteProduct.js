import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Button } from '@chakra-ui/react';

const DeleteProduct = () => {
  const { slug } = useParams();
  const [deleteProduct, setDeleteProduct] = useState(null);
  const Navigate = useNavigate()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const product = await axiosInstance(`delete/product/${slug}/`);
        setDeleteProduct(product);
      } catch (error) {
        console.log(`error while fetch product ${error}`);
      }
    };
    fetchdata();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`delete/product/${slug}/`).then((response) => {
        if (response) {
          setTimeout(() => {
            Navigate('/products/');
          }, 250);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        className="confirmation-box"
        p={4}
        maxW="container.sm"
        mx="auto"
        textAlign="center"
      >
        {deleteProduct && (
          <>
            <p>Are you sure you want to delete?</p>
            <Button
              className="delete"
              onClick={handleDelete}
              colorScheme="red"
              mr={2}
            >
              Delete
            </Button>
            <Button
              className="cancel"
              onClick={() => (Navigate(`/products/`))}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default DeleteProduct;
