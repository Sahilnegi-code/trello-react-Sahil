import React from "react";
import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const RouteError = () => {
  return (
    <>
      <Box minH={"100vh"}>
        <Box style={{ width: "90%", margin: "auto" }}>
          <Alert status="warning" marginTop="2rem" fontSize="2.1rem">
            <AlertIcon width="50px" height="27px" marginRight="10px" />

            <Heading as="h4" size="md">
              Sorry ! we couldn't find that Page
            </Heading>
          </Alert>
        </Box>
      </Box>
    </>
  );
};

export default RouteError;
