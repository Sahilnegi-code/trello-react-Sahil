import React, { useState, useEffect } from "react";

import {
  Box,
  Text,
  Button,
  Flex,
  Checkbox,
  FormControl,
  Input,
  Progress,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Error from "../Error/Error";
import axios from "axios";
import CheckList from "../CheckList/CheckList";
import Loading from "../Loading/Loading";
const CheckItem = ({ checkListId, cardId }) => {
  const [toggleAddItem, setToggleAddItem] = useState(true);
  const [checkItemName, setCheckItemName] = useState("");
  const [checkItemData, setCheckItemsData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkItemLoading, setCheckItemLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  console.log(checkItemData);

  const handleCheckboxChange = async (checkItem, state) => {
    let tempCheckItemData = checkItemData.map((curr) => {
      if (curr.id === checkItem) {
        return {
          ...curr,
          state: state === "incomplete" ? "complete" : "incomplete",
        };
      }
      return curr;
    });

    setCheckItemsData(tempCheckItemData);

    try {
      const res = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItem}?key=${myApiKey}&token=${myToken}&state=${
          state === "incomplete" ? "complete" : "incomplete"
        }`
      );
    } catch (err) {
      setErrorState(true);
    }
  };

  async function handleAddItem(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;

      setCheckItemsData([data, ...checkItemData]);
    } catch (err) {
      setErrorState(true);
      console.log("Error");
    }
  }

  async function handleDeleteItem(checkItemId) {
    try {
      const res = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;
      setCheckItemsData(
        checkItemData.filter((curr) => curr.id !== checkItemId)
      );
    } catch (err) {
      setErrorState(true);
    }
  }

  async function getAllcheckItems() {
    try {
      setCheckItemLoading(true);
      const res = await axios.get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;
      console.log(checkItemData);
      setCheckItemsData(data);
      setCheckItemLoading(false);
    } catch (err) {
      setErrorState(true);
    }
  }

  useEffect(() => {
    getAllcheckItems();
  }, []);
  return (
    <>
      {errorState ? (
        <Error
          objStyle={{ fontSize: "10px" }}
          alertStyle={{
            width: "18px",
            height: "18px",
            marginRight: "13px",
            marginLeft: "4px",
          }}
          boxStyle={{
            margin: "10px 0px",
          }}
        />
      ) : (
        checkItemData.map((curr, obj, index) => (
          <>
            <Box m={"10px"}>
              {checkItemLoading ? (
                <Loading />
              ) : (
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex gap={"10px"}>
                    <input
                      type="checkbox"
                      checked={curr.state === "incomplete" ? false : true}
                      onChange={() => handleCheckboxChange(curr.id, curr.state)}
                    />
                    <Text> {curr.name} </Text>
                  </Flex>

                  <DeleteIcon onClick={() => handleDeleteItem(curr.id)} />
                </Flex>
              )}
            </Box>
          </>
        ))
      )}

      {toggleAddItem ? (
        <Button
          size="xs"
          m={"20px 0px"}
          onClick={() => setToggleAddItem(false)}
        >
          Add Item
        </Button>
      ) : (
        <>
          <form onSubmit={handleAddItem}>
            <FormControl>
              <Input
                type="text"
                onChange={(e) => setCheckItemName(e.target.value)}
              />
              <Flex height={"50px"} alignItems={"center"}>
                <Button size="xs" type="submit">
                  Add Item
                </Button>
                <Button
                  size="xs"
                  ml={"10px"}
                  onClick={() => setToggleAddItem(true)}
                >
                  Close
                </Button>
              </Flex>
            </FormControl>
          </form>
        </>
      )}
    </>
  );
};

export default CheckItem;
