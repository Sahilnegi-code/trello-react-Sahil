import React, { useState, useEffect, useReducer } from "react";
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHatCowboySide,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import DisplayModel from "../DisplayModel/DisplayModel";
import {
  Box,
  Flex,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Input,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Error from "../Error/Error";
const initialState = {
  listCard: [],
  openModal: false,
  selectedCard: "",
  errorState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CARDS_SUCCESS":
      return {
        ...state,
        listCard: action.payload,
        errorState: false,
      };
    case "ADD_CARDS_IN_LIST":
      return {
        ...state,
        listCard: [action.payload, ...state.listCard],
      };

      return {};
    case "FETCH_CARDS_FAILURE":
      return {
        ...state,
        errorState: true,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        openModal: true,
        selectedCard: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        openModal: false,
      };

    case "DELETE_CARD_SUCCESS":
      return {
        ...state,
        listCard: state.listCard.filter((curr) => curr.id !== action.payload),
        errorState: false,
      };

    case "DELETE_CARD_FAILURE":
      return {
        ...state,
        errorState: true,
      };

    default:
      return state;
  }
};

const ListCards = ({ listId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { listCard, openModal, selectedCard, errorState } = state;
  const [cardName, setCardName] = useState("");
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;

  async function handlingCardsInList() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/lists/${listId}/cards?key=${myApiKey}&token=${myToken}`
      );

      dispatch({
        type: "FETCH_CARDS_SUCCESS",

        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_CARDS_FAILURE",
      });
    }
  }

  async function deleteTheCardInList(cardId) {
    try {
      const res = await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${myApiKey}&token=${myToken}`
      );

      const data = res.data;
      dispatch({

        type: "DELETE_CARD_SUCCESS"
        ,
        payload: cardId

      });
    } catch (err) {
      dispatch({
        type: "DELETE_CARD_FAILURE",
      });
    }
  }

  async function addingCardsInList() {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${myApiKey}&token=${myToken}`
      );

      const data = res.data;

      dispatch({
        type: "ADD_CARDS_IN_LIST",
        payload: data,
      });
    } catch (err) {
      dispatch({ type: "ADD_CARD_FAILURE" });
    }
  }

  function handleOpenModel(e, cardId) {
    dispatch({ type: "OPEN_MODAL", payload: cardId });
  }

  function handleCloseModal() {
    dispatch({
      type: "CLOSE_MODAL",
    });
  }
  useEffect(() => {
    handlingCardsInList();
  }, []);

  return (
    <Box>
      <Flex gap={"10px"} flexDirection={"column"}>
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
          listCard.map((curr) => {
            return (
              <>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <InputGroup
                    size="md"
                    onClick={(e) => handleOpenModel(e, curr.id)}
                  >
                    <Input value={curr.name} />
                  </InputGroup>
                  <Button size="sm">
                    <CloseIcon onClick={() => deleteTheCardInList(curr.id)} />
                  </Button>
                </Flex>
              </>
            );
          })
        )}

        <DisplayModel
          cardId={selectedCard}
          handleCloseModal={handleCloseModal}
          isOpen={openModal}
        />

        <CardFooter>
          <InputGroup size="md">
            <Input
              pl="3rem"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Add a Card"
            />

            <InputLeftElement>
              <Button h="1.75rem" size="sm" onClick={addingCardsInList}>
                +
              </Button>
            </InputLeftElement>
          </InputGroup>
        </CardFooter>
      </Flex>
    </Box>
  );
};

export default ListCards;
