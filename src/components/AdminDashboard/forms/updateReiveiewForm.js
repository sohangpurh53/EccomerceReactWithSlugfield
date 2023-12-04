import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Button,Text, useToast, Textarea, FormLabel, Image, FormControl} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';



const UpdateReview = () => {
    const toast = useToast();
    const {id} = useParams()
    const [reviewFormData, setReviewFormData] = useState({
      rating: '',
      comment: '',
      user: '',
      product: '',
    });
    const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched
    const Navigate = useNavigate()
  
    useEffect(() => {
        if (!dataFetched) {
          const fetchData = async () => {
            try {
      
              const review = await axiosInstance(`update/review/${id}`);
               setReviewFormData(review.data)
              
             setDataFetched(true);
            } catch (error) {
              console.log(`error while fetch review ${error.request.status}`);
            }
          };
      
          fetchData();
        }
      }, [ dataFetched, reviewFormData, id]);

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`update/review/${id}/`, reviewFormData);
      // Handle success response

      toast({
        title: 'Review Updated!',
        status: 'success',
        duration: 3000,
        position:'top-right',
        isClosable: true,
      });


    Navigate('/user/profile/')
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      console.error('Error creating review:', errorMessage);

      toast({
        title: 'Error creating review',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Box mx={'auto'} w={{base:'300px', md:'md'}}>
       
        <Box mt={2.5} w={{base:'100px', md:'200px'}}>
            <Image  objectFit={'contain'}  src={`http://api.eccomerce.digitaltek.co.in${reviewFormData.product.first_image}`}/> 
            <Text whiteSpace={'nowrap'}  fontSize={{base:'sm', md:'md', lg:'lg'}}>
            {reviewFormData.product.name}
        </Text>
        </Box>
        
    
      <FormControl>
        <FormLabel>Rating</FormLabel>
        <Box display="flex" alignItems="center">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              w={8}
              h={8}
              color={index < reviewFormData.rating ? 'yellow.400' : 'gray.300'}
              onClick={() => setReviewFormData({ ...reviewFormData, rating: index + 1 })}
              cursor="pointer"
              _hover={{ color: 'yellow.500' }}
            />
          ))}
        </Box>
        <FormControl mt={4}>
          <FormLabel>Comment</FormLabel>
          <Textarea
            value={reviewFormData.comment}
            onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleSubmit}
          disabled={!reviewFormData.rating || !reviewFormData.comment.trim()}
        >
          Update Review
        </Button>
      </FormControl>
      </Box>
    </>
  );
};

export default UpdateReview;
