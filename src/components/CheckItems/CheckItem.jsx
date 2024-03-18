import React, { useState, useEffect } from "react";

import { Box, Text, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Error from "../Error/Error";
import axios from "axios";
import CheckList from "../CheckList/CheckList";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

import {
  FETCH_CHECKITEMS_SUCCESS,
  FETCH_CHECKITEMS_FAILED,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILED,
  Delete_Item_Failed,
  Delete_Item_Success,
} from "../../Store/Slices/CheckItemSlice";

const CheckItem = ({ checkListId, cardId }) => {
  const [checkItemName, setCheckItemName] = useState("");
  const [toggleAddItem, setToggleAddItem] = useState(false);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const { checkItemData, checkItemLoading, errorState } = useSelector(
    (state) => {
      console.log(state);

      return state.checkItemSlice;
    }
  );

  const dispatch = useDispatch();

  const handleCheckboxChange = async (checkItem, state) => {
    try {
      let tempCheckItemData = checkItemData.map((curr) => {
        if (curr.id === checkItem) {
          return {
            ...curr,
            state: state === "incomplete" ? "complete" : "incomplete",
          };
        }
        return curr;
      });

      dispatch(FETCH_CHECKITEMS_SUCCESS(tempCheckItemData));

      const res = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItem}?key=${myApiKey}&token=${myToken}&state=${
          state === "incomplete" ? "complete" : "incomplete"
        }`
      );
    } catch (err) {
      dispatch(FETCH_CHECKITEMS_FAILED());
    }
  };

  async function handleAddItem(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `  
    https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${myApiKey}&token=${myToken}

    `
      );

      const data = res.data;

      dispatch(ADD_ITEM_SUCCESS(data));
    } catch (err) {
      dispatch(ADD_ITEM_FAILED());
    }
  }

  async function handleDeleteItem(checkItemId) {
    try {
      const res = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;

      dispatch(Delete_Item_Success(checkItemId));
    } catch (err) {
      dispatch(Delete_Item_Failed());
    }
  }

  async function getAllcheckItems() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;

      dispatch(FETCH_CHECKITEMS_SUCCESS(data));
    } catch (err) {
      dispatch(FETCH_CHECKITEMS_FAILED());
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
                  onClick={() => setToggleAddItem(false)}
                >
                  Close
                </Button>
              </Flex>
            </FormControl>
          </form>
        </>
      ) : (
        <Button size="xs" m={"20px 0px"} onClick={() => setToggleAddItem(true)}>
          Add Item
        </Button>
      )}
    </>
  );
};

export default CheckItem;
