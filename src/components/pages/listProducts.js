import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";

const ListProducts = () => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const product = await axiosInstance('list/product/').then(response => response.data);
      setProductDetails(product);
    }
    fetchData();
  }, []);

  return (
    <Box className="products-table-container">
      {/* <div className="table-wrapper">
        <div className="data-table"> */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Shipping Fee</Th>
                <Th>Stock</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productDetails.map((product, index) => (
                <Tr key={product.id}>
                  <Td>{index + 1}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.shipping_fee}</Td>
                  <Td>{product.stock}</Td>
                  <Td>
                    <Link to={`/product/update/${product.slug}`}>
                      <Button colorScheme="teal" variant="outline">
                        Update
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/product/delete/${product.slug}`}>
                      <Button colorScheme="red" variant="outline">
                        Delete
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/product/images/${product.slug}`}>
                      <Button colorScheme="blue" variant="outline">
                        Images
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        {/* </div>
      </div> */}
    </Box>
  )
}

export default ListProducts;
