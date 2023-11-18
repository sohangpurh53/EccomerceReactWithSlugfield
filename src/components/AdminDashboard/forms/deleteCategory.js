import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Button } from '@chakra-ui/react';

const DeleteCategory = () => {
  const { slug } = useParams();
  const [deleteCategory, setDeleteCategory] = useState(null);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await axiosInstance(`delete/category/${slug}/`);
        setDeleteCategory(category);
      } catch (error) {
        console.log(`error while fetch category ${error}`);
      }
    };
    fetchData();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`delete/category/${slug}/`).then((response) => {
        if (response) {
          setTimeout(() => {
            Navigate('/categories/');
          }, 250);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className="confirmation-box" p={4} maxW="container.sm" mx="auto" textAlign="center">
        {deleteCategory && (
          <>
            <p>Are you sure you want to delete {deleteCategory.name}?</p>
            <Button className="delete" onClick={handleDelete} colorScheme="red" mr={2}>
              Delete
            </Button>
            <Button className="cancel" onClick={() => (Navigate(`/categories/`))}>
              Cancel
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default DeleteCategory;
