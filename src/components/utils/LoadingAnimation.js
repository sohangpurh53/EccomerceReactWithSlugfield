import React from 'react'
import { Spinner, Flex } from '@chakra-ui/react'

const PageLoadingAnimation = () => {
  return (
    <Flex
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
  </Flex>
  )
}

export default PageLoadingAnimation