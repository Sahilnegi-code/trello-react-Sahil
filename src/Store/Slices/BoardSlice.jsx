import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    boardData: [],
    errorState: false,
  };

const boardSlice = createSlice({
    name : 'Board',
    initialState : initialState,
    reducers :{
        
        addInBoard(state , action ){
            state.boardData.push(action.payload)
        },
        addBoardFailed(state , action) {
            state.errorState = true;
        },
        FETCH_BOARD_SUCCESS(state , action){
            state.boardData = action.payload;
            state.loading = false;
        },
        FETCH_BOARD_FAILED (state , action){
            state.loading = false;
            state.errorState = true;
        },

    }
})
export  const {addInBoard , addBoardFailed , FETCH_BOARD_SUCCESS , FETCH_BOARD_FAILED} = boardSlice.actions;
export default boardSlice;