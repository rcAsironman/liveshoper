import { createSlice } from "@reduxjs/toolkit";


const ShopperSlice = createSlice({
    name: 'shoper',
    initialState: {
        shoperList : [],
        shoperLength: 0,
    },

    reducers: {
        addShopper: (state, action) => {
            state.shoperList =  action.payload;
        },

        updateShoper: (state, action) => {
            const updatedShoper = action.payload;
            state.shoperList = updatedShoper;
            state.shoperLength = updatedShoper.length;
          },
    }
})

export const {addShopper, updateShoper} = ShopperSlice.actions;
export default ShopperSlice.reducer;