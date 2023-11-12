import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Notfication from '../../utils/Notfication';
import { Box, Input, Button, Select, FormControl, FormLabel } from '@chakra-ui/react';

const ProductForm = () => {
  const [notification, setNotification] = useState('');
  const [categoryOption, setCategoryOption] = useState([]);
  const [sellerOption, setSellerOption] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    shipping_fee: '',
    stock: '',
    category: '',
    seller: '',
    uploaded_images: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, sellerData] = await Promise.all([
          axiosInstance('list/category/').then((response) => response.data),
          axiosInstance('list/seller/').then((response) => response.data),
        ]);
        setSellerOption(sellerData);
        setCategoryOption(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      uploaded_images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === 'uploaded_images') {
        productData[key].forEach((file) => {
          form.append('uploaded_images', file);
        });
      } else {
        form.append(key, productData[key]);
      }
    });

    try {
      await axiosInstance.post('create/product/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => { if(response.data){
        setNotification(`Product Created Successfully ${response.data.name}`);
        setTimeout(()=>{setNotification('')}, 2000)

    }else{setNotification('Error while create product')}});
     
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" p={4}>
      <Notfication message={notification} />
      <form>
        <FormControl mb={4}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Images</FormLabel>
          <Input
            type="file"
            name="uploaded_images"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="shippingfee">Shipping Fee</FormLabel>
          <Input
            type="number"
            name="shipping_fee"
            value={productData.shipping_fee}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <Input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          >
            <option value="" default>
              Select Category
            </option>
            {categoryOption.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="seller">Seller</FormLabel>
          <Select
            name="seller"
            value={productData.seller}
            onChange={handleChange}
            required
          >
            <option value="" default>
              Select Seller
            </option>
            {sellerOption.map((seller, index) => (
              <option key={index} value={seller.id}>
                {seller.company_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} w="100%">
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
