import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
    },
    //changes initial state based on action
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        }
    }
})
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;