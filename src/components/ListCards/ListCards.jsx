import React, { useState, useEffect } from "react";
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
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

const ListCards = ({ listId }) => {
  const [listCard, setListCard] = useState([]);
  const [cardName, setCardName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;

  async function handlingCardsInList() {
    const res = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${myApiKey}&token=${myToken}`
    );
    setListCard(res.data);
  }

  async function deleteTheCardInList(cardId) {
    const res = await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${myApiKey}&token=${myToken}`
    );
    const data = res.data;
    setListCard(listCard.filter((curr) => curr.id !== cardId));
  }

  async function addingCardsInList() {
    const res = await axios.post(
      `https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${myApiKey}&token=${myToken}`
    );

    const data = res.data;
    setCardName("");
    setListCard([data, ...listCard]);
  }

  function handleOpenModel(e, cardId) {
    e.stopPropagation();
    setOpenModal(true);
    setSelectedCard(cardId);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    handlingCardsInList();
  }, [selectedCard]);

  return (
    <Box>
      <Flex gap={"10px"} flexDirection={"column"}>
        {listCard.map((curr) => {
          return (
            <>
            <Flex justifyContent={'space-between'} alignItems={'center'}  gap={'10px'}>
            <InputGroup
                size="md"
                onClick={(e) => handleOpenModel(e, curr.id)}
              >
                <Input value={curr.name} />

                
               
              </InputGroup>
              <Button size= 'sm'>
                  <CloseIcon onClick={() => deleteTheCardInList(curr.id)} />
                </Button>
            </Flex>
             
            </>
          );
        })}

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
