import React, { useState, createContext, useReducer } from "react";
import {  Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import Boards from "./components/Boards/Boards";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteError from "./components/RouteError/RouteError";

export const themeContext = createContext(null);

const initialState = {
  loading: true,
  boardData: [],
  errorState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      return {
        ...state,
        boardData: action.payload,
        loading: false,
      };

    case "FETCH_BOARD_FAILED":
      return {
        ...state,
        loading: false,
        errorState: true,
      };

    case "ADD_BOARD_SUCCESS":
      return {
        ...state,
        boardData: [...state.boardData, action.payload],
      };
    case "ADD_BOARD_FAILED":
      return {
        ...state,
        errorState: true,
      };
  }
};

const Project = () => {
  const [boardName, setBoardName] = useState("");
  const [toggleCreateBoard, setToggleCreateBoard] = useState(true);
  const [{ loading, boardData, errorState }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const myApiKey = import.meta.env.VITE_API_KEY;
  const myToken = import.meta.env.VITE_TOKEN;
  function handlingBoardName(event) {
    setBoardName(event.target.value);
  }

  async function fetchTheBoards() {

    try {
      const res = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${myApiKey}&token=${myToken}`
      );
      dispatch({ type: "FETCH_BOARD_SUCCESS", payload: res.data });
      setToggleCreateBoard(true);
    } catch (err) {
      dispatch({ type: "FETCH_BOARD_FAILED" });
    }


  }

  async function addInTheBoard(e) {
    e.preventDefault();

    try {

      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${myApiKey}&token=${myToken}`
      );

      const newData = response.data;

      dispatch({
        type: "ADD_BOARD_SUCCESS"
        ,
        payload: newData,
      });
    } catch (err) {
      dispatch({ type: "ADD_BOARD_FAILED" });
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
