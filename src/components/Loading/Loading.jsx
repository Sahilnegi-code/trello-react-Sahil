import React from 'react';
import { Flex, Spinner , Box } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
    
const Loading = () => {
    const {id} = useParams();
    console.log(id);
  return (
    <>
    <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} minH={'80vh'} >
    <Spinner size='xl'/>
    </Flex>
      
    </>
  );
}

export default Loading;
