import React from "react";
import CreateBoard from "../CreateBoard/CreateBoard";
import { Image, Box, Heading, Flex, Container } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box background={"#b187eb"} height={'80px'}>
      <Box width={"90%"} margin={"auto"} height={'100%'}>
        
        <Flex flexWrap={'wrap'}  justifyContent={"space-between"} alignItems={'center'} height={'100%'}>
         
          <Box >
            <Heading color={"white"} as={"h4"} size="lg">
              Welcome to Trello
            </Heading>
          </Box>

          <Flex  gap='30px' alignItems={'center'} justifyContent={'space-between'} >

            <Image width={'120px'}   maxHeight={'30px'} 
            src="https://trello.com/assets/d947df93bc055849898e.gif" />



            <CreateBoard />

          </Flex>



        </Flex>

      </Box>
    </Box>
  );
};

// export default Navbar;
export default Navbar;
