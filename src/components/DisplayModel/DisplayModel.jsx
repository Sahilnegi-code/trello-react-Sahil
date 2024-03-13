import React, { useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  PopoverBody,

} from "@chakra-ui/react";
import axios from "axios";
import CheckList from "../CheckList/CheckList";
import Error from "../Error/Error";

const initialState = {
  checkListData:[],
  errorState :false,

};
const reducer = (state , action ) => {


  switch (action.type){

    case 'SET_CHECKLIST_DATA':
  
              return {
                ...state , 
                checkListData : [ ...state.checkListData , action.payload ]
              };
    
      case  'GET_CHECKLIST_DATA':

      return {
        ...state , 
        checkListData :[...action.payload]
      };
    case  'FAIL_CHECKLIST_DATA':

    return {
      ...state , 
      errorState:true
    };
  }




}

const DisplayModal = ({ handleCloseModal, isOpen, cardId }) => {

  const [checkListName, setCheckListName] = useState("");
  const [{ checkListData, errorState }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;

  async function addCheckListInCard(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${myApiKey}&token=${myToken}&name=${checkListName}`
      );
      const data = res.data;

      dispatch({

        type :'SET_CHECKLIST_DATA',
        payload : data

      });
    } 
    catch (err) {


      dispatch({

        type: 'FAIL_CHECKLIST_DATA'

      })


    }

  }

  return (
    <>
      {errorState ? (
        <Error />
      ) : (
        <Popover>
          <Modal isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign={"center"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text>Add CheckList</Text>

                  <PopoverTrigger>
                    <Button style={{ textAlign: "center" }}>
                      <FontAwesomeIcon
                        style={{ marginRight: "10px" }}
                        icon={faSquareCheck}
                      />
                      Checklist
                    </Button>
                  </PopoverTrigger>
                </Flex>
              </ModalHeader>

              <ModalBody>

                <CheckList
                  cardId={cardId}
                  checkListname={checkListName}
                  setCheckListData={(data , actionType) =>
                    {
                      dispatch({type:actionType, payload:data})
                    }
              }
                  checkListData={checkListData}
                />

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>

                    <FormControl>

                      <form onSubmit={addCheckListInCard}>
                        <FormLabel>Title</FormLabel>
                        <Input
                          onChange={(e) => setCheckListName(e.target.value)}
                        />
                        <Button
         
                          size={"sm"}
                          mt={"15px"}
                          type="submit"
                          onClose={true}
                          >
                          Add
                        </Button>
                      </form>
                    </FormControl>

                     
                  </PopoverBody>
                </PopoverContent>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleCloseModal()}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Popover>
      )}
    </>
  );
};

export default DisplayModal;
