import React, { useState, useEffect } from "react";
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
// import {} from ''
import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  FormControl,
  FormLabel,
  Box,
  Flex,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Input,
  list,
  CardFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  PopoverBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import CheckList from "../CheckList/CheckList";

const DisplayModal = ({ handleCloseModal, isOpen, cardId }) => {
  const [checkListName, setCheckListName] = useState("");
  const [checkListData, setCheckListData] = useState([]);

  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  async function addCheckListInCard() {
    const res = await axios.post(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${myApiKey}&token=${myToken}&name=${checkListName}`
    );
    const data = res.data;
    setCheckListData([data, ...checkListData]);
  }

  return (
    <>
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
                setCheckListData={setCheckListData}
                checkListData={checkListData}
              />

              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input onChange={(e) => setCheckListName(e.target.value)} />
                    <Button
                      colorScheme="blue"
                      size={"sm"}
                      mt={"15px"}
                      onClick={addCheckListInCard}
                    >
                      Add
                    </Button>
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
    </>
  );
};

export default DisplayModal;
