import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    loadingCheckList :true,
    errorState :false,
  }
  

  const checkListSlice = createSlice({
    name : 'checkListSlice',
    initialState : initialState,
    reducers :{
        
        GET_CHECKLIST_SUCCESS(state , action ){
            state.loadingCheckList = false,
            state.errorState = false
        },
        GET_CHECKLIST_FAILED(state , action) {
            state.loadingCheckList = false;
            state.errorState = true
        },
    }
})



export const {

    GET_CHECKLIST_SUCCESS , GET_CHECKLIST_FAILED

} = checkListSlice.actions;

export default checkListSlice;