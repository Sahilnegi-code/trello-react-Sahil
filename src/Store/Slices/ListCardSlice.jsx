import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const listCardSlice = createSlice({
  name: "listCardSlice",
  initialState: initialState,
  reducers: {
    FETCH_CARDS_SUCCESS(state, action) {
      const { listId, listCard } = action.payload;
      console.log(action.payload, "FETCH _CARD_SUCCESS");
      state[listId] = {
        listCard: [],
        openModal: false,
        selectedCard: "",
        errorState: false,
      };

      state[listId].listCard = listCard;
      state[listId].errorState = false;
    },
    ADD_CARDS_IN_LIST(state, action) {
      const { listId, data } = action.payload;

      state[listId].listCard.push(data);
    },
    FETCH_CARDS_FAILURE(state, action) {
      const { listId } = action.payload;
      state[listId].errorState = true;
    },
    OPEN_MODAL(state, action) {
      const { cardId, listId } = action.payload;

      state[listId].openModal = true;
      state[listId].selectedCard = cardId;
    },
    CLOSE_MODAL(state, action) {
      const { listId } = action.payload;

      state[listId].openModal = false;
    },
    DELETE_CARD_SUCCESS(state, action) {
      const { cardId, listId } = action.payload;

      state[listId].listCard = state[listId].listCard.filter(
        (curr) => curr.id !== cardId
      );
      state[listId].errorState = false;
    },
    DELETE_CARD_FAILURE(state, action) {
      const { listId } = action.payload;

      state[listId].errorState = true;
    },
  },
});

export const {
  FETCH_CARDS_SUCCESS,
  ADD_CARDS_IN_LIST,
  FETCH_CARDS_FAILURE,
  OPEN_MODAL,
  CLOSE_MODAL,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} = listCardSlice.actions;

export default listCardSlice;
