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
import axios from "axios";
import CheckList from "../CheckList/CheckList";
const CheckItem = ({ checkListId  , cardId}) => {
  const [toggleAddItem, setToggleAddItem] = useState(true);
  const [checkItemName, setCheckItemName] = useState("");
  const [checkItemData, setCheckItemsData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;


  const handleCheckboxChange = () => {
    // setIsChecked(!isChecked);
  };


  async function handleAddItem() {
    const res = await axios.post(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${myApiKey}&token=${myToken}`
    );
    const data = res.data;
    setCheckItemsData([data, ...checkItemData]);
  }
  async function handleDeleteItem(checkItemId) {
    const res = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${myApiKey}&token=${myToken}`
    );
    const data = res.data;
    setCheckItemsData(checkItemData.filter((curr) => curr.id !== checkItemId));
  }
  async function getAllcheckItems() {
    const res = await axios.get(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${myApiKey}&token=${myToken}`
    );
    const data = res.data;
    setCheckItemsData(data);
  }
  useEffect(() => {
    getAllcheckItems();
  }, [checkListId]);
  return (
    <>
      {checkItemData.map((curr) => (
        <>
          <Box m={"10px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Flex gap={'10px'}>
              <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Text> {curr.name} </Text>
        
              </Flex>

              <DeleteIcon onClick={() => handleDeleteItem(curr.id)} />
            </Flex>
          </Box>
        </>
      ))}

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
          <FormControl>
            <Input
              type="email"
              onChange={(e) => setCheckItemName(e.target.value)}
            />
            <Flex height={"50px"} alignItems={"center"}>
              <Button size="xs" onClick={() => handleAddItem()}>
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
        </>
      )}
    </>
  );
};

export default CheckItem;
