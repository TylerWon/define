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
});

// Thunk for adding a Word to a User's words
export const addWord = createAsyncThunk("words/add", async (data) => {
  try {
    const response = await axios.get(`/api/words/${data.spelling}/word_and_definitions/`);
    return response.data;
  } catch(e) {
    const response = await axios.post("/api/word_and_definitions/", data);
    return response.data;
  }
})

export const wordsSlice = createSlice({
  name: "words",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWords.fulfilled, (state, action) => {
        const words = action.payload;

        state.status = "fulfilled";
        state.words = state.words.concat(words);
      })

      .addCase(addWord.fulfilled, (state, action) => {
        const word = action.payload;

        state.status = "fulfilled";
        state.words = state.words.concat(word);
      })

      .addMatcher((action) => {
        return action.type == getWords.pending || action.type == addWord.pending;
      }, (state, action) => {
        state.status = "pending";
      })

      .addMatcher((action) => {
        return action.type == getWords.rejected || action.type == addWord.rejected;
      }, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
  }

});

export default wordsSlice.reducer;
