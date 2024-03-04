import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Flex, Textarea, InputGroup } from "@chakra-ui/react";

import {
  SimpleGrid,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import ListCards from "../ListCards/ListCards";
import Loading from "../Loading/Loading";
const BoardDetails = ({ listId , setToggleCreateBoard }) => {
  const [listName, setListName] = useState("");
  const [boardDetails, setBoardDetails] = useState([]);
  const [listCard, setListCard] = useState([]);
  const[loading , setLoading] = useState(false);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const { id } = useParams();
 
  async function fetchBoardDetails(id) {
    const res = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${myApiKey}&token=${myToken}`
    );
    setBoardDetails(res.data);
    setLoading(true);
    setToggleCreateBoard(false);
  }

  async function handlingDeleteTheList(listId) {
    const res = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${myApiKey}&token=${myToken}&value=true`
    );
    const data = res.data;
    setBoardDetails(boardDetails.filter(({ id }) => id !== data.id));

  }
 

  async function addNewList() {
    const res = await axios.post(
      `https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${myApiKey}&token=${myToken}`
    );
  
    setBoardDetails([...boardDetails, res.data]);
    // setBoardDetails([res.data, ...boardDetails]);
  }
  useEffect(() => {
    fetchBoardDetails(id);
  }, []);
  return (
    <Box background={"#878deb33"} minH={"100vh"} paddingTop={'50px'}>
      <Box width={'90%'} margin={'auto'}>
      <Flex  scrollBehavior={"inherit"}  gap={"20px"} width={'100%'} overflowX={'auto'} >
      {

        loading ?
        (

          boardDetails.map((curr) => (
            <>
              <Flex    >
                <Card width={'383px'} height="fit-content">
                  <CardHeader>
                    <Flex justifyContent={"space-between"}>
                      <Heading size="md"> {curr.name} </Heading>
                      <Button onClick={() => handlingDeleteTheList( curr.id)}>
                        Delete
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <ListCards listId={curr.id}  />
                  </CardBody>
                </Card>
              </Flex>
            </>
          ))
  
        ):
        <Loading />


      }
        <Card height={"fit-content"}>
          <Textarea
            onChange={(e) => setListName(e.target.value)}
            width={'250px'}
            placeholder="Add Another List"
          />
          <CardFooter width={'250px'}>
            <Button width={'250px'} onClick={addNewList}>Add List</Button>
          </CardFooter>
        </Card>
      </Flex>
      </Box>
    
    </Box>
  );
};

export default BoardDetails;
