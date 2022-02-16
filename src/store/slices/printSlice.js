import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    printdata: {},
    date: {}
}



const printdata = createSlice({
    name: 'printdata',
    initialState,
    reducers: {
        getAllPritDataSucess: (state, action) => {
            state.printdata = action.payload.val;
            state.date = action.payload.data;
        }
    }
})

export const {
    getAllPritDataSucess
} = printdata.actions;

export default printdata.reducer;