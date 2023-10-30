import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers:{
        cacheResults: (state,action) => {
            state = Object.assign(state, action.payload) //merge object using Object.assign( method)
        },
    },
});
export const {cacheResults} = searchSlice.actions;

export default searchSlice.reducer;

// we can restrict to store only LRU cache limit to [100] then start removing the suggestions searched first