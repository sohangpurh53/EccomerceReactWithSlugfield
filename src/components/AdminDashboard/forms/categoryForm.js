import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Button, Input } from '@chakra-ui/react';
import Notification from '../../utils/Notfication';

const CategoryForm = () => {
  const [notification, setNotification] = useState('');
  const [categoryData, setCategoryData] = useState({
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: categoryData.name,
    };

    try {
      await axiosInstance.post('create/category/', data).then((response) => {
        if (response.data) {
          setNotification(`Category Created Successfully ${response.data.name}`);
          setTimeout(() => {
            setNotification('');
          }, 2000);
        } else {
          console.log('Error while creating category');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className="category-form-container" p={4} maxW="container.sm" mx="auto">
        <form>
          <Notification message={notification} />
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
            />
          </div>
          <Button mt={2.5} colorScheme="teal" onClick={handleSubmit}>
            Create Category
          </Button>
        </form>
      </Box>
    </>
  );
};

export default CategoryForm;
