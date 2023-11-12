import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Select, Button } from '@chakra-ui/react';

const ProductImageForm = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [productImageForm, setProductImageForm] = useState({
    product: '',
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await axiosInstance('list/product/').then((response) => response.data);
        setProductDetail(productData);
      } catch (error) {
        console.log(`error while fetching product ${error}`);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductImageForm({
      ...productImageForm,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductImageForm({
      ...productImageForm,
      image: e.target.files[0],
    });
  };

  const productImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product', productImageForm.product);
    formData.append('image', productImageForm.image);

    try {
      await axiosInstance.post('create/product/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => console.log(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <form encType="multipart/form-data">
        <Box mb={4}>
          <label htmlFor="product">Product</label>
          <Select
            name="product"
            value={productImageForm.product}
            onChange={handleInputChange}
            placeholder="Select Product"
          >
            {productDetail.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box mb={4}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </Box>

        <Button colorScheme="blue" onClick={productImage} w="100%">
          Save Image
        </Button>
      </form>
    </Box>
  );
};

export default ProductImageForm;
