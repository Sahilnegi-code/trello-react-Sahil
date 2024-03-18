import React, { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { Box, Text, Flex } from "@chakra-ui/react";
import CheckItem from "../CheckItems/CheckItem";
import axios from "axios";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_CHECKLIST_SUCCESS,
  GET_CHECKLIST_FAILED,
} from "../../Store/Slices/CheckListSlice";

const CheckList = ({ cardId, checkListData, setCheckListData }) => {
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const dispatch = useDispatch();

  const { loadingCheckList, errorState } = useSelector((state) => {
    return state.checkListSlice;
  });

  async function handlingGetCheckList() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;
      setCheckListData(data);
      dispatch(GET_CHECKLIST_SUCCESS());
    } catch (err) {
      dispatch(GET_CHECKLIST_FAILED());
    }
  }

  useEffect(() => {
    handlingGetCheckList();
  }, []);
  return (
    <>
      {errorState ? (
        <Error />
      ) : (
        <Box>
          {loadingCheckList ? (
            <Loading />
          ) : (
            <Flex flexDirection={"column"} gap={"30px"}>
              {checkListData.map((curr) => (
                <Box>
                  <Text>
                    <FontAwesomeIcon
                      style={{ marginRight: "10px" }}
                      icon={faSquareCheck}
                    />

                    {curr.name}
                  </Text>

                  <Box>
                    <CheckItem cardId={cardId} checkListId={curr.id} />
                  </Box>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      )}
    </>
  );
};

export default CheckList;
