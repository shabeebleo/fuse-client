import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postData: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
