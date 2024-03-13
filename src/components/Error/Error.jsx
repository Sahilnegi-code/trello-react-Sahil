import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Box,
} from "@chakra-ui/react";
const Error = ({objStyle , alertStyle , boxStyle}) => {
  return (
    <>

      <Alert status="error" style={boxStyle} >
        
        <AlertIcon
        style = {alertStyle}
          height={"30px"}
          width={"30px"}
          marginRight={"40px"}
          marginLeft="10px"
        />
        <Box>
          <Heading as={"h4"} style={objStyle} size="lg">
            We're sorry, but an error occurred while processing your request !
          </Heading>
        </Box>
      </Alert>
      
    </>
  );
};

export default Error;
