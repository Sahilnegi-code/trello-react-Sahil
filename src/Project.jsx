import React ,{useState , useEffect , createContext} from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Boards from "./components/Boards/Boards";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import axios from "axios";
import { useParams } from "react-router-dom";

import { BrowserRouter , Route , Routes   } from "react-router-dom";

export const themeContext = createContext(null);


const Project = () => {
  const [boardName , setBoardName ] = useState("")
  const [boardData, setBoardData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [toggleCreateBoard , setToggleCreateBoard] = useState(true);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  function handlingBoardName(event){ 
    setBoardName(event.target.value)
    }

    async function fetchTheBoards() {
      const res = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${myApiKey}&token=${myToken}`
      );
      setBoardData(res.data);
      setLoading(true);
      setToggleCreateBoard(true)
    }
     
  async function addInTheBoard(){
    console.log('working');
      const response =  await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${myApiKey}&token=${myToken}`);
      const newData = response.data;
      setBoardData([newData , ...boardData ]);
   }


  return (
    <>
    <BrowserRouter>

    < themeContext.Provider value={{ handlingBoardName,addInTheBoard , fetchTheBoards,boardData}} >     

    <Box>
    <Navbar  toggleCreateBoard = {toggleCreateBoard} />

      <Routes>
        <Route path="/" element = { <Boards setToggleCreateBoard ={setToggleCreateBoard} loading={loading}/>} />
        <Route path="/boards" >
        <Route   index element={<Boards setToggleCreateBoard ={setToggleCreateBoard} loading={loading} />} />
        <Route   path=':id' element={< BoardDetails setToggleCreateBoard= {setToggleCreateBoard} />}  />
        </Route>
      </Routes>

    </Box>
    </themeContext.Provider>

    </BrowserRouter>
  
    </>
   
  );
};

export default Project;
