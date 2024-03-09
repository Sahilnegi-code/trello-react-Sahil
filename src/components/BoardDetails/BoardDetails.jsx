import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Flex, Textarea, InputGroup } from "@chakra-ui/react";

import {
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";
import ListCards from "../ListCards/ListCards";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const BoardDetails = ({ listId, setToggleCreateBoard }) => {
  const [listName, setListName] = useState("");
  const [boardDetails, setBoardDetails] = useState([]);
  const [listCard, setListCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [loadingNewList, setLoadingNewList] = useState(false);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const { id } = useParams();

  async function fetchBoardDetails(id) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.trello.com/1/boards/${id}/lists?key=${myApiKey}&token=${myToken}`
      );

      setBoardDetails(res.data);
      setLoading(false);
      setToggleCreateBoard(false);
    } catch (err) {
      setLoading(false);
      setErrorState(true);
    }
  }

  async function handlingDeleteTheList(listId) {
    try {
      const res = await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed?key=${myApiKey}&token=${myToken}&value=true`
      );
      const data = res.data;
      setBoardDetails(boardDetails.filter(({ id }) => id !== data.id));
    } catch (err) {
      console.log(err);
      setErrorState(true);
    }
  }

  async function addNewList() {
    if (!listName.length) return;
    try {
      setLoadingNewList(true);
      const res = await axios.post(
        `https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${myApiKey}&token=${myToken}`
      );

      setListName("");
      setBoardDetails([...boardDetails, res.data]);
      setLoadingNewList(false);
    } catch (err) {
      setErrorState(true);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchBoardDetails(id);
  }, []);
  return (
    <Box background={"#878deb33"} minH={"100vh"} paddingTop={"50px"}>
      <Box width={"90%"} margin={"auto"}>
        {errorState ? (
          <Error />
        ) : (
          <>
            <Flex
              scrollBehavior={"inherit"}
              height={"450px"}
              gap={"20px"}
              width={"100%"}
              overflowX={"auto"}
            >
              {!loading ? (
                boardDetails.map((curr) => (
                  <>
                    <Flex>
                      <Card width={"383px"} height="fit-content">
                        <CardHeader>
                          <Flex justifyContent={"space-between"}>
                            <Heading size="md"> {curr.name} </Heading>
                            <Button
                              onClick={() => handlingDeleteTheList(curr.id)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </CardHeader>
                        <CardBody>
                          <ListCards listId={curr.id} />
                        </CardBody>
                      </Card>
                    </Flex>
                  </>
                ))
              ) : (
                <Loading style="listLoading" />
              )}

              {!loadingNewList ? (
                <>
                  <Flex>
                    <Card height={"fit-content"}>
                      <Textarea
                        onChange={(e) => setListName(e.target.value)}
                        width={"250px"}
                        placeholder="Add Another List"
                      />
                      <CardFooter width={"250px"}>
                        <Button width={"250px"} onClick={addNewList}>
                          Add List
                        </Button>
                      </CardFooter>
                    </Card>
                  </Flex>
                </>
              ) : (
                <Loading style="addListLoading" />
              )}
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BoardDetails;
