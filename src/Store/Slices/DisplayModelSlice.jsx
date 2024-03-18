import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    checkListData:[],
    errorState :false,
  }
  

  const displayModalSlice = createSlice({
    name : 'displayModalSlice',
    initialState : initialState,
    reducers :{
        
        SET_CHECKLIST_DATA(state , action ){

            state.checkListData.push(action.payload);

        },
        GET_CHECKLIST_DATA(state , action) {

            state.checkListData = action.payload ;

        },
        FAIL_CHECKLIST_DATA(state , action){
            state.errorState = true;
        }

    }
})



export const {

    SET_CHECKLIST_DATA , GET_CHECKLIST_DATA , FAIL_CHECKLIST_DATA

} = displayModalSlice.actions;

export default displayModalSlice;