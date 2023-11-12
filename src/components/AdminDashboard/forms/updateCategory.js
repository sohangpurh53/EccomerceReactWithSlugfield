import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Notification from '../../utils/Notfication';
import { useParams } from 'react-router-dom';
import { Box, Input, Button } from '@chakra-ui/react';

const UpdateCategoryForm = () => {
  const { slug } = useParams();

  const [notification, setNotification] = useState('');
  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosInstance(`update/category/${slug}/`).then((response) => response.data);
        setCategoryData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleCategoryForm = async (e) => {
    e.preventDefault();
    const data = {
      name: categoryData.name,
    };
    try {
      await axiosInstance.put(`update/category/${slug}/`, data).then((response) => {
        if (response.data) {
          setNotification(`Category Updated Successfully ${response.data.name}`);
          setTimeout(() => {
            setNotification('');
          }, 1500);
          setTimeout(() => {
            window.location.href = '/categories/';
          }, 2000);
        } else {
          console.log('Error while updating category');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <form>
        <Notification message={notification} />
        <Box mb={4}>
          <label htmlFor="category">Category</label>
          <Input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
          />
        </Box>
        <Button colorScheme="blue" onClick={handleCategoryForm} w="100%">
          Update Category
        </Button>
      </form>
    </Box>
  );
};

export default UpdateCategoryForm;
