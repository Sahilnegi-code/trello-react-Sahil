import React, { useState, useEffect , useReducer} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Text,
  Flex,

} from "@chakra-ui/react";
import CheckItem from "../CheckItems/CheckItem";
import axios from "axios";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const initialState = {
  loadingCheckList :true,
  errorState :false,
}

const reducer = (state , action) =>{

  switch(action.type){
    case 'GET_CHECKLIST_SUCCESS':
      return {
        ...state ,
loadingCheckList:false,
errorState: false
      };

    case  'GET_CHECKLIST_FAILED':

    return {
      ...state, 
      loadingCheckList :false,
      errorState:true
    }

  }

}

const CheckList = ({
  cardId,
  checkListData,
  setCheckListData
}) => {

  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const [ {loadingCheckList,errorState } , dispatch] = useReducer(  reducer , initialState  );
  

  async function handlingGetCheckList() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${myApiKey}&token=${myToken}`
      );
      const data = res.data;
      console.log(data);
    setCheckListData(data , 'GET_CHECKLIST_DATA');
    dispatch({type :'GET_CHECKLIST_SUCCESS'});
  
    } catch (err) {
console.log('checklist error');
      dispatch({type :'GET_CHECKLIST_FAILED'})

    }
  }
  
console.log(errorState , checkListData);


  useEffect(() => {
    handlingGetCheckList();
  }, []);
  return (
    <>
      {
      errorState 
      ?
      (
        <Error />
      ) :
      (
        <Box>
          {loadingCheckList ? (
            <Loading />
          ) : (
            <Flex flexDirection={"column"} gap={"30px"}>
              {
              checkListData.map((curr) => (
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