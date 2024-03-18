import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './Slices/BoardSlice';
import boardDetailSlice from './Slices/BoardDetailsSlice';
import checkItemSlice from './Slices/CheckItemSlice';
import checkListSlice from './Slices/CheckListSlice';
import displayModalSlice from './Slices/DisplayModelSlice';
import listCardSlice from './Slices/ListCardSlice';
const store = configureStore({
  reducer: {

    boards : boardSlice.reducer,

    boardDetails: boardDetailSlice.reducer ,
    
    checkItemSlice : checkItemSlice.reducer,

    checkListSlice : checkListSlice.reducer ,

    displayModalSliceModal : displayModalSlice.reducer ,
    
    listCardSlice : listCardSlice.reducer
    

  },
});

export default store;