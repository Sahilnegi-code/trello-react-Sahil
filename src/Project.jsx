import React, { useState, createContext, useReducer } from "react";
import {  Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Boards from "./components/Boards/Boards";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteError from "./components/RouteError/RouteError";
import { useDispatch, useSelector } from "react-redux";
import {
addInBoard , addBoardFailed ,FETCH_BOARD_SUCCESS ,
FETCH_BOARD_FAILED
} from "./Store/Slices/BoardSlice";
export const themeContext = createContext(null);



const Project = () => {
  const [boardName, setBoardName] = useState("");
  const [toggleCreateBoard, setToggleCreateBoard] = useState(true);

  const  {  loading, boardData, errorState } = useSelector((state ) => {
return state.boards;
  });
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  const dispatch = useDispatch();

  function handlingBoardName(event) {
    setBoardName(event.target.value);
  }

  async function fetchTheBoards() {

    try {
      const res = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${myApiKey}&token=${myToken}`
      );
      dispatch(  FETCH_BOARD_SUCCESS(res.data));
      setToggleCreateBoard(true);
    } catch (err) {
      dispatch( FETCH_BOARD_FAILED() );
    }


  }

  async function addInTheBoard(e) {
    e.preventDefault();

    try {

      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${myApiKey}&token=${myToken}`
      );

      const newData = response.data;

      dispatch(addInBoard(newData));
    } catch (err) {
      dispatch(addBoardFailed());
    }
  }





  return (
    <>
      <BrowserRouter>
        <themeContext.Provider
          value={{
            handlingBoardName,
            addInTheBoard,
            fetchTheBoards,
            boardData,
          }}
        >
          <Box>
            <Navbar toggleCreateBoard={toggleCreateBoard} />

            <Routes>
              <Route
                path="/"
                element={
                  <Boards
                    setToggleCreateBoard={setToggleCreateBoard}
                    loading={loading}
                    errorState={errorState}
                  />
                }
              />
              <Route path="/boards">
                <Route
                  index
                  element={
                    <Boards
                      errorState={errorState}
                      setToggleCreateBoard={setToggleCreateBoard}
                      loading={loading}
                    />
                  }
                />
                <Route
                  path=":id"
                  element={
                    <BoardDetails setToggleCreateBoard={setToggleCreateBoard} />
                  }
                />
              </Route>
              <Route path="*" element={<RouteError />} />
            </Routes>
          </Box>
        </themeContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default Project;
