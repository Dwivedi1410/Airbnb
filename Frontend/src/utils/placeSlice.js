import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "place",
  initialState: [], 
  reducers: {
    setPlaces: (state, action) => {
      return action.payload;
    },
    addPlace: (state, action) => {
      state.push(action.payload);
    },
    removePlace: (state, action) => {
      return state.filter(place => place._id !== action.payload);
    },
    updatePlace: (state, action) => {
      const updatedPlace = action.payload;
      const index = state.findIndex(place => place._id === updatedPlace._id);
      if (index !== -1) state[index] = updatedPlace;
    },
    resetPlaces: () => {
      return [];
    }
  },
});

export const { setPlaces, addPlace, removePlace, updatePlace, resetPlaces } = placeSlice.actions;
export default placeSlice.reducer;