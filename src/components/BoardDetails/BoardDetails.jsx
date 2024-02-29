import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Flex, Textarea } from "@chakra-ui/react";

import {
  SimpleGrid,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
const BoardDetails = () => {
  const [boardDetails, setBoardDetails] = useState([]);
  const [listName, setListName] = useState("");
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const { id } = useParams();
  console.log(myToken, myApiKey)
  console.log(listName);
  async function fetchBoardDetails(id) {
    const res = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${myApiKey}&token=${myToken}`);
    console.log(res.data);
    setBoardDetails(res.data);
  }
  async function handlingDeleteTheList() {
    const res = await axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${myApiKey}&token=${myToken}`
    );
    console.log(res);
  }
  console.log(boardDetails.length);
  async function addNewList() {
    const res = await axios.post(
      `https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${myApiKey}&token=${myToken}`
    );
    console.log(res.data);
    setBoardDetails([res.data, ...boardDetails]);
  }
  useEffect(() => {
    fetchBoardDetails(id);
  }, []);
  return (
    <Flex scrollBehavior={"inherit"}>
      {boardDetails.map(({ name }) => (
        <>
          <Box>
            <Card>
              <CardHeader>
                <Flex justifyContent={"space-between"}>
                  <Heading size="md"> {name} </Heading>
                  <Button  onClick={handlingDeleteTheList}>
                    Delete
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </Box>
        </>
      ))}

      <Card>
        <Textarea
          onChange={(e) => setListName(e.target.value)}
          placeholder="Add Another List"
        />
        <CardFooter>
          <Button onClick={addNewList}>Add List</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default BoardDetails;
