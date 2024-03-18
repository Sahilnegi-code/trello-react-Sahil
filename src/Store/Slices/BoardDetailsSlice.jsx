import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardDetails: [],
  loading: true,
  errorState: false,
};

const boardDetailSlice = createSlice({
  name: "BoardDetails",
  initialState: initialState,
  reducers: {
    FETCH_BOARD_DETAILS_SUCCESS(state, action) {
      (state.loading = false), (state.boardDetails = action.payload);
    },
    FETCH_BOARD_DETAILS_FAILED(state, action) {
      (state.loading = false), (state.errorState = true);
    },
    DELETE_LIST_SUCCESS(state, action) {
      state.boardDetails = state.boardDetails.filter(
        ({ id }) => id !== action.payload
      );
    },
    DELETE_LIST_FAILED(state, action) {
      state.errorState = true;
    },
    ADD_LIST_FAILED(state, action) {
      state.errorState = true;
    },
    ADD_LIST_SUCCESS(state, action) {
      state.boardDetails.push(action.payload);
    },
  },
});

export const {
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILED,
  FETCH_BOARD_DETAILS_SUCCESS,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILED,
  FETCH_BOARD_DETAILS_FAILED,
} = boardDetailSlice.actions;
export default boardDetailSlice;
