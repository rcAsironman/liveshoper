import { createSlice } from "@reduxjs/toolkit";

const InitialDataFetchSlice = createSlice({
    name: 'initialDataFromApi',
    initialState: {
        data: null,  // Initial data is set to null
        catg: "select categoery"
    },
    reducers: {
        storeData(state, action) {
            // Update the data field with the payload
            state.data = action.payload;
        },
        clearData(state) {
            // Clear the data field
            state.data = null;
        },

        storeCatg(state, action)
        {
            state.catg = action.payload;
        },

        clearCatg(state)
        {
            state.catg = ''
        }
    }
});

export const { storeData, clearData, storeCatg, clearCatg } = InitialDataFetchSlice.actions;

export const selectData = (state) => state.initialDataFromApi.data; // Selector function to retrieve data
export const selectCatg = (state) => state.initialDataFromApi.catg;
export default InitialDataFetchSlice.reducer;
