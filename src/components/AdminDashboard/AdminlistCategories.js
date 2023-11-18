import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, } from '@chakra-ui/react';
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
            <Table variant="simple" overflowX="auto">
              <Thead>
                <Tr>
                  <Th display={['none', 'table-cell']}>Index</Th>
                  <Th>Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categoryDetails.map((category, index) => (
                  <Tr key={category.id}>
                    <Td display={['none', 'table-cell']}>{index + 1}</Td>
                    <Td>{category.name}</Td>
                    <Td>
                      <Button
                        as={Link}
                       fontSize={'12px'}
                       bg={'gray.300'}
                       color={'black'}
                        mb={2}
                        className="btn-update"
                        to={`/category/update/${category.slug}/`}
                      >
                        Update
                      </Button>
                      <Button
                        as={Link}
                        bg={'red.400'}
                        color={'white'}
                       fontSize={'12px'}
                        mb={2}
                        className="btn-delete"
                        to={`/category/delete/${category.slug}/`}
                        ml={[0, 2]} // Adjust margin for smaller screens
                      >
                        Delete
                      </Button>
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
