import React, { useEffect, useState ,useContext} from "react";
import { Card, Box, Flex } from "@chakra-ui/react";
import { themeContext } from '../../Project';
import { Link} from "react-router-dom";

const Boards = () => {

  const {addInTheBoard ,fetchTheBoards ,boardData} =   useContext(themeContext)
  
console.log(boardData)
  useEffect(() => {

    fetchTheBoards();

  }, []);
  return (
    <>
      <Box paddingTop={"30px"}>
        <Flex width={"90%"} margin={"auto"} gap={'20px'}  flexWrap={'wrap'}>
          {boardData.map((curr) => (
            <Link to = {`boards/${curr.id}` }>
            
            <Flex  fontWeight={"800"} fontSize={"1.5rem"} width={"200px"} borderRadius={"10px"} justifyContent={"center"} alignItems={"center"} background={"#9687eb"}  color={"white"} height={"200px"}>
              {curr.name.toUpperCase()}
            </Flex>

          </Link>
            
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Boards;
