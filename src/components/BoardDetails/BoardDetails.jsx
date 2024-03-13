import axios from "axios";
import React, { useState, useEffect , useReducer} from "react";
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

const initialState = {

  boardDetails :[],
  listCard :[],
  loading : true,
  errorState:false,

}

const reducer = (state  , action ) => {

  switch(action.type){

    case 'FETCH_BOARD_SUCCESS':
    return {
      loading :false ,
      boardDetails : action.payload,
    }

    case 'FETCH_BOARD_FAILED':

    return {
      loading : false,
      errorState : true
    }

    case 'DELETE_LIST_SUCCESS':
    


      return {
        ...state , 
        boardDetails:state.boardDetails.filter(({ id }) => id !== action.payload)
      }

      case 'DELETE_LIST_FAILED':
      case 'ADD_LIST_FAILED':

      return {
        ...state , 
        errorState:true 
      }

      case 'ADD_LIST_SUCCESS':

      return {
        ...state ,
        boardDetails : [...state.boardDetails , action.payload],
        loadingNewList : false
      };

  }
}

const BoardDetails = ({ listId, setToggleCreateBoard }) => {

  const [loadingNewList, setLoadingNewList] = useState(false);
  const [listName , setListName ] = useState("");


  const [{ 
  boardDetails ,
  listCard ,
  loading ,
  errorState}, dispatch ] = useReducer(reducer, initialState  ); 
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const { id } = useParams();

  async function fetchBoardDetails(id) {
    try {

      const res = await axios.get(
        `https://api.trello.com/1/boards/${id}/lists?key=${myApiKey}&token=${myToken}`
      );



      dispatch({ type : 'FETCH_BOARD_SUCCESS' , payload  : res.data});


      setToggleCreateBoard(false);
    } catch (err) {
      dispatch({ type : 'FETCH_BOARD_FAILED' });
    }
  }

  async function handlingDeleteTheList(listId) {
    try {
      const res = await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed?key=${myApiKey}&token=${myToken}&value=true`
      );

      const data = res.data;

      dispatch({type : 'DELETE_LIST_SUCCESS' , payload :  data.id });

    } catch (err) {

      dispatch({type : 'DELETE_LIST_FAILED'})

    }

  }

  async function addNewList() {
    if (!listName.length) return;
    try {
      setLoadingNewList(true);
      const res = await axios.post(
        `https://api.trello.com/1/boards/${id}/lists?name=${listName}&key=${myApiKey}&token=${myToken}`
      );



      setLoadingNewList(false);

      dispatch({type : 'ADD_LIST_SUCCESS' , payload : res.data });

    } catch (err) {
      dispatch( {type : 'ADD_LIST_FAILED'})
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
