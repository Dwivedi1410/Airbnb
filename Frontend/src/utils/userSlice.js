import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:null,
    reducers: {
        addUser: (state, action)=>{
            return action.payload;
            // this will replace all the data of the user initial state
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;