import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Text,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import CheckItem from "../CheckItems/CheckItem";
import axios from "axios";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
const CheckList = ({
  cardId,
  checkListName,
  setCheckListData,
  checkListData,
}) => {
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const [loadingCheckList, setLoadingCheckList] = useState(false);
  const [errorState, setErrorState] = useState(false);
  async function handlingGetCheckList() {
    try {
      setLoadingCheckList(true);
      const res = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;
      setCheckListData(data);
      setLoadingCheckList(false);
    } catch (err) {
      setLoadingCheckList(false);
      setErrorState(true);
    }
  }

  console.log();
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
