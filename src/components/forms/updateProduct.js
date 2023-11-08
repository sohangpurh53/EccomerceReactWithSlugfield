import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import Notification from '../utils/Notfication';
import { useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const { slug } = useParams();
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, sellerData, product] = await Promise.all([
          axiosInstance('list/category/').then((response) => response.data),
          axiosInstance('list/seller/').then((response) => response.data),
          axiosInstance
            .get(`update/product/${slug}/`)
            .then((response) => response.data),
        ]);

        setSellerOption(sellerData);
        setCategoryOption(categoryData);
        setProductData(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const CreateProduct = async (e) => {
    e.preventDefault();
    const data = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      shipping_fee: productData.shipping_fee,
      stock: productData.stock,
      category: productData.category,
      seller: productData.seller,
    };

    try {
      await axiosInstance
        .put(`update/product/${slug}/`, data)
        .then((response) => {
          if (response.data) {
            setNotification(`Product Updated Successfully ${response.data.name}`);
            setTimeout(() => {
              setNotification('');
            }, 2000);
            setTimeout(() => {
              window.location.href = '/products/';
            }, 2000);
          } else {
            setNotification('Error while updating product');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        as="div"
        className="product-form-container"
        p={4}
        maxW="container.sm"
        mx="auto"
      >
        <Notification message={notification} />
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
              id=""
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
              id=""
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

          <Button onClick={CreateProduct} colorScheme="blue">
            Update Product
          </Button>
        </form>
      </Box>
    </>
  );
};

export default UpdateProductForm;
