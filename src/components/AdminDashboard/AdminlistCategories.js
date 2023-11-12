import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const Categories = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await axiosInstance('list/category/').then((response) => response.data);
        setCategoryDetails(category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Box maxW="container.xl" mx="auto">
        <Box className="categories-table-container">
          <Box className="table-wrapper">
            <Box className="data-table">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Index</Th>
                    <Th>Name</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categoryDetails.map((category, index) => (
                    <Tr key={category.id}>
                      <Td>{index + 1}</Td>
                      <Td>{category.name}</Td>
                      <Td>
                        <ChakraLink as={Link} className='btn-update' to={`/category/update/${category.slug}/`}>
                          Update
                        </ChakraLink>
                      </Td>
                      <Td>
                        <ChakraLink as={Link} className='btn-delete' to={`/category/delete/${category.slug}/`}>
                          Delete
                        </ChakraLink>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Categories;
