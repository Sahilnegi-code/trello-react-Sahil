import React from "react";

import CreateBoard from "../CreateBoard/CreateBoard";

import { Image, Box, Heading, Flex } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

const Navbar = ({ toggleCreateBoard }) => {
  const { id } = useParams();
  return (
    <Box background={"#b187eb"} height={"120px"}>
      <Box width={"90%"} margin={"auto"} height={"100%"}>
        <Flex
          flexWrap={"wrap"}
          justifyContent={"space-around"}
          alignItems={"center"}
          height={"100%"}
          gap={"10px"}
        >
          <Box>
            <Heading color={"white"} as={"h4"} size="lg">
              Welcome to Trello
            </Heading>
          </Box>

          <Flex
            gap="30px"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image
              width={"120px"}
              src="https://trello.com/assets/d947df93bc055849898e.gif"
            />

            {toggleCreateBoard && <CreateBoard />}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
