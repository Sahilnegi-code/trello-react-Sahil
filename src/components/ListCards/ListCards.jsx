import React ,{useState , useEffect} from 'react';
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon } from '@chakra-ui/icons'

import { Card, Box, Flex, InputLeftElement, InputRightElement , InputGroup, Input, list ,CardFooter , Button } from "@chakra-ui/react";
import axios from 'axios'
const ListCards = ({listId}) => {
const [listCard , setListCard] = useState([]);
const [cardName , setCardName] = useState(''); 

const myApiKey = import.meta.env.VITE_API_KEY;
const myToken = import.meta.env.VITE_TOKEN;
async function handlingCardsInList(){
  const res  =  await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${myApiKey}&token=${myToken}`);
  setListCard(res.data)
  }
async function deleteTheCardInList(cardId){
  console.log('Manav')
  const res = await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${myApiKey}&token=${myToken}`)
  const data = res.data;
  setListCard(listCard.filter((curr)=> curr.id !== cardId ))
  console.log(data);
}
  async function addingCardsInList(){
  console.log(cardName);
  console.log(listId)
    const res = await axios.post(`https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&key=${myApiKey}&token=${myToken}`)
    const data = res.data; 
 setCardName('');
 setListCard(
  [data  , ...listCard]
 )
    console.log(data);
 
  }
useEffect(()=>{
    handlingCardsInList();
},[])
  return (
    <Box>
      <Flex gap={'10px'} flexDirection={'column'}>
      {

listCard.map((curr )=>{
    return (
<>

        <InputGroup size='md' >
<Input
value={curr.name} />

<InputRightElement >
<CloseIcon onClick={()=> deleteTheCardInList(curr.id)} />
</InputRightElement>
</InputGroup>



</>

    )
})

}
<CardFooter>

<InputGroup size='md' >
 <Input
 pl='3rem'
 value={cardName}
onChange={(e)=> setCardName(e.target.value) }
placeholder='Add a Card'
/>
<InputLeftElement >
<Button h='1.75rem' size='sm'  onClick={addingCardsInList}>
+
</Button>
</InputLeftElement>
</InputGroup>




</CardFooter>
      </Flex>

     
    </Box>
  );
}

export default ListCards;
