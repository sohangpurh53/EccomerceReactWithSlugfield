import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const Notification = ({ message }) => {
  const toast = useToast();

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [message, toast]);

  return null;
};

export default Notification;
