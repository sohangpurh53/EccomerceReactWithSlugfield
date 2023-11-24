import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Box, Button, useToast, Textarea, FormLabel, FormControl} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';



const ReviewForm = () => {
    const toast = useToast();
    const { slug } = useParams(); 
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
              const productResponse = await axiosInstance(`product/${slug}/`);
              const product = productResponse.data;
      
              const userResponse = await axiosInstance('user/profile/');
              const user = userResponse.data;
      
              
              setReviewFormData({
                ...reviewFormData,
                product: product.id,
                user: user.id,
              });
              setDataFetched(true);
            } catch (error) {
              console.log(`error while fetch review ${error.request.status}`);
            }
          };
      
          fetchData();
        }
      }, [slug, dataFetched, reviewFormData]);


  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('create/review/', reviewFormData);
      console.log(response.data); // Handle success response

      toast({
        title: 'Review submitted!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear the form after successful submission
    //   setReviewFormData({
    //     ...reviewFormData,
    //     rating: '',
    //     comment: '',
    //   });
    Navigate(0)
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
      {/* Your other components and UI elements */}
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
          Submit Review
        </Button>
      </FormControl>
    </>
  );
};

export default ReviewForm;
