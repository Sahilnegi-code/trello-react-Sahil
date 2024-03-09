import React ,{useState , useEffect , createContext} from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Boards from "./components/Boards/Boards";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import axios from "axios";
import { useParams } from "react-router-dom";
import Error from "./components/RouteError/RouteError";
import { BrowserRouter , Route , Routes   } from "react-router-dom";
import RouteError from "./components/RouteError/RouteError";

export const themeContext = createContext(null);


const Project = () => {
  const [boardName , setBoardName ] = useState("")
  const [boardData, setBoardData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [toggleCreateBoard , setToggleCreateBoard] = useState(true);
  const [errorState , setErrorState ] = useState(false);
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  function handlingBoardName(event){ 

    setBoardName(event.target.value)

    }

    async function fetchTheBoards() {
      try{
        setLoading(true);
        const res = await axios.get(
          `https://api.trello.com/1/members/me/boards?key=${myApiKey}&token=${myToken}`
        );
        setBoardData(res.data);
        setLoading(false);
        setToggleCreateBoard(true)
      }
      catch(err){
        console.log(err);
        setLoading(false);
        setErrorState(true);
      }
    
   
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
        <Route path="/" element = { <Boards setToggleCreateBoard ={setToggleCreateBoard} loading={loading}    errorState ={errorState}/>}/>
        <Route path="/boards" >
        <Route   index element={<Boards errorState={errorState} setToggleCreateBoard ={setToggleCreateBoard} loading={loading} />} />
        <Route   path=':id' element={< BoardDetails  setToggleCreateBoard= {setToggleCreateBoard} />}  />
        </Route>
        <Route   path= "*" element={<RouteError/>} />
      </Routes>

    </Box>
    </themeContext.Provider>

    </BrowserRouter>
  
    </>
   
  );
};

export default Project;
