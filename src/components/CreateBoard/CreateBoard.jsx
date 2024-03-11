import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { themeContext } from "../../Project";
const CreateBoard = () => {
  const { handlingBoardName, addInTheBoard } = useContext(themeContext);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button color={"white"} background="#8c00ff38" height="44px">
            {" "}
            Create Board{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />

          <PopoverBody>
            <form onSubmit={addInTheBoard}>
              <FormLabel>Board Title</FormLabel>
              <Input type="text" onChange={handlingBoardName} />
              <Button type="submit" mt={"10px"} height={"34px"}>
                {" "}
                Create{" "}
              </Button>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CreateBoard;