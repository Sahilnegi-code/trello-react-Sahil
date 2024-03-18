import React, { useState, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import DisplayModel from "../DisplayModel/DisplayModel";
import {
  Box,
  Flex,
  InputLeftElement,
  InputGroup,
  Input,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Error from "../Error/Error";
import {
  FETCH_CARDS_SUCCESS,
  ADD_CARDS_IN_LIST,
  FETCH_CARDS_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} from "../../Store/Slices/ListCardSlice";

import { useDispatch, useSelector } from "react-redux";

const ListCards = ({ listId }) => {
  const [cardName, setCardName] = useState("");
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;

  const dispatch = useDispatch();

  const ObjOfListId = useSelector((state) => {
    let listCardSlice = state.listCardSlice;
    return listCardSlice;
  });
  async function handlingCardsInList() {
    try {
      const res = await axios.get(
        `https://api.trello.com/1/lists/${listId}/cards?key=${myApiKey}&token=${myToken}`
      );
      const listCard = res.data;
      dispatch(FETCH_CARDS_SUCCESS({ listId, listCard }));
    } catch (err) {
      dispatch(
        FETCH_CARDS_FAILURE({
          listId,
        })
      );
    }
  }

  async function deleteTheCardInList(cardId) {
    try {
      const res = await axios.delete(
        `https://api.trello.com/1/cards/${cardId}?key=${myApiKey}&token=${myToken}`
      );

      const data = res.data;
      dispatch(DELETE_CARD_SUCCESS({ listId, cardId }));
    } catch (err) {
      dispatch(DELETE_CARD_FAILURE({ listId }));
    }
  }

  async function addingCardsInList() {
    try {
      const res = await axios.post(
        `https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${myApiKey}&token=${myToken}`
      );

      const data = res.data;

      dispatch(ADD_CARDS_IN_LIST({ listId, data }));
    } catch (err) {
      dispatch(FETCH_CARDS_FAILURE({listId}));
    }
  }

  function handleOpenModel(e, cardId) {
    dispatch(OPEN_MODAL({ listId, cardId }));
  }

  function handleCloseModal() {
    dispatch(CLOSE_MODAL({ listId }));
  }

  useEffect(() => {
    if (listId) {
      handlingCardsInList();
    }
  }, []);

  return (
    <Box>
      <Flex gap={"10px"} flexDirection={"column"}>
        {ObjOfListId &&
        ObjOfListId[listId] &&
        ObjOfListId[listId].errorState ? (
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
          <>
            {ObjOfListId &&
              ObjOfListId[listId] &&
              ObjOfListId[listId].listCard.map((curr) => {
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
                        <CloseIcon
                          onClick={() => deleteTheCardInList(curr.id)}
                        />
                      </Button>
                    </Flex>
                  </>
                );
              })}
          </>
        )}

        <DisplayModel
          cardId={
            ObjOfListId &&
            ObjOfListId[listId] &&
            ObjOfListId[listId].selectedCard
          }
          handleCloseModal={handleCloseModal}
          isOpen={
            ObjOfListId && ObjOfListId[listId] && ObjOfListId[listId].openModal
          }
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
