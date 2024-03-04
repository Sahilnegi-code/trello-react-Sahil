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
  console.log(checkItemData);


  const handleCheckboxChange = async (checkItem , state) => {
    
        let tempCheckItemData = checkItemData.map((curr)=>{

            if( curr.id  ===  checkItem ){
                return {
                    ...curr , state : state === 'incomplete' ? 'complete':'incomplete' 
                }
            }
return curr;

           }   )
    
    
           setCheckItemsData(tempCheckItemData);
        //    setIsChecked(  )
const res = await axios.put(`https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItem}?key=${myApiKey}&token=${myToken}&state=${  state === 'incomplete' ? 'complete' : 'incomplete'}`);
const data = res.data ;
console.log(data);

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
    console.log(checkItemData);
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
          checked={curr.state === 'incomplete'?false :true}
          onChange={ ()=> handleCheckboxChange(curr.id , curr.state  )
        }
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
