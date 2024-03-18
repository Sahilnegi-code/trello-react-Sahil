import {createSlice} from '@reduxjs/toolkit';




const initialState = {
    checkItemData: [],
    checkItemName: "",
    toggleAddItem: true,
    checkItemLoading: false,
    errorState: false
  };

  const checkItemSlice = createSlice({
    name : 'checkItemSlice',
    initialState : initialState,
    reducers :{
        
        FETCH_CHECKITEMS_SUCCESS(state , action ){
            state.checkItemData = action.payload
        },
        FETCH_CHECKITEMS_FAILED(state , action) {
            state.errorState = true
        },
        ADD_ITEM_SUCCESS(state , action){
          state.checkItemData.push(action.payload);  
        },
        ADD_ITEM_FAILED(state , action){
            state.errorState = true
        },
        Delete_Item_Success(state , action){
            state.checkItemData =  state.checkItemData.filter( (curr) => curr.id !== action.payload )

        },
        Delete_Item_Failed(state , action){
            state.errorState = false;
        }

    }
})



export const {

    FETCH_CHECKITEMS_SUCCESS , FETCH_CHECKITEMS_FAILED  , ADD_ITEM_SUCCESS ,

    ADD_ITEM_FAILED , Delete_Item_Failed  , Delete_Item_Success  

} = checkItemSlice.actions;

export default checkItemSlice;