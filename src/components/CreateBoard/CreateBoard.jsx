import React,{useContext, useEffect, useState} from 'react';
import { Popover , PopoverTrigger , Button , PopoverContent ,
    PopoverArrow , PopoverCloseButton , PopoverHeader , PopoverBody ,
    FormLabel , Input
} from "@chakra-ui/react";
import axios from 'axios'
import { themeContext } from '../../Project';
const CreateBoard = () => {
  // const button
const {handlingBoardName,addInTheBoard} =   useContext(themeContext)





  return (
    <>
     <Popover  >
  <PopoverTrigger>
    <Button color= {'white'}
    background= '#8c00ff38'
    height =  '44px' > Create Board  </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />

    <PopoverBody>
    <FormLabel>Board Title</FormLabel>

    <Input type='text'  onChange={handlingBoardName} />
    <Button onClick={addInTheBoard} mt={'10px'} height={'34px'}> create</Button>

    </PopoverBody>
  </PopoverContent>
</Popover> 
    </>
  );
}

export default CreateBoard;
