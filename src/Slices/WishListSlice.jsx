import { createSlice } from "@reduxjs/toolkit";

const WishListSlice = createSlice({
    name: "wishlistItems",
    initialState: {
        wishListItems: []
    },

    reducers:{

        updateWishList : (state, action ) => {
            const data = action.payload;
            state.wishListItems = data;
        },

        addToWishList: (state, action) => {
            state.wishListItems.push({...action.payload})
        },

        removeItemFromWishList: (state, action) => {
            const {id} = action.payload;
            state.wishListItems = state.wishListItems.filter((item)=> item.productId != id)
        }
    }
})

export const {updateWishList, addToWishList, removeItemFromWishList} = WishListSlice.actions
export default WishListSlice.reducer

