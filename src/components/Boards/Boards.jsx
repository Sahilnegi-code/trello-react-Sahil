import React, { useEffect, useState, useContext } from "react";
import { Card, Box, Flex } from "@chakra-ui/react";
import { themeContext } from "../../Project";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const Boards = ({ loading, setToggleCreateBoard, errorState }) => {
  const { fetchTheBoards, boardData } = useContext(themeContext);
  useEffect(() => {
    fetchTheBoards();
  }, []);
  return (
    <>
      <Box paddingTop={"30px"} background={"#878deb33"} minH={"100vh"}>
        <Flex
          width={"90%"}
          margin={"auto"}
          padding="7px 0px 7px 0px"
          gap={"20px"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          {errorState ? (
            <Error />
          ) : (
            <>
              {!loading ? (
                boardData.map((curr) => (
                  <Link
                    style={{ display: "flex", flexGrow: "1" }}
                    to={`/boards/${curr.id}`}
                  >
                    <Flex
                      flexGrow={"1"}
                      fontWeight={"800"}
                      fontSize={"1.5rem"}
                      width={"200px"}
                      borderRadius={"10px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      background={"#9687eb"}
                      color={"white"}
                      height={"100px"}
                    >
                      {curr.name.toUpperCase()}
                    </Flex>
                  </Link>
                ))
              ) : (
                <Loading style="boardLoading" />
              )}
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Boards;
