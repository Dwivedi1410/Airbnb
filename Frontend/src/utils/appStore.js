import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import placeReducer from "./placeSlice";

const appStore = configureStore({
    reducer : {
        user: userReducer,
        place: placeReducer,
    }
});

export default appStore;