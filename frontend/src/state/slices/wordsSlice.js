import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  status: "idle", 
  error: null
};

// Thunk for retrieving a User's words
export const getWords = createAsyncThunk("words/get", async (userId) => {
  const response = await axios.get(`/api/users/${userId}/words_and_definitions/`);
  return response.data;
})

export const wordsSlice = createSlice({
  name: "words",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWords.fulfilled, (state, action) => {
        const words = action.payload;

        state.words = state.words.concat(words);
        state.status = "fulfilled";
      })

      .addMatcher((action) => {
        return action.type == getWords.pending;
      }, (state, action) => {
        state.status = "pending";
      })

      .addMatcher((action) => {
        return action.type == getWords.rejected;
      }, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
  }

});

export default wordsSlice.reducer;
