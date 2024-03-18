import React from "react";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Loading = ({ style }) => {
  const { id } = useParams();
  let obj = {
    listLoading: {
      justifyContent: "center",
      alignItems: "center",
    },
    addListLoading: {
      height: "20px",
      width: "20px",
    },
    boardLoading: {
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <>
      <Flex
        minH={"80vh"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size={"xl"} style={obj[style]} />
      </Flex>
    </>
  );
};

export default Loading;
