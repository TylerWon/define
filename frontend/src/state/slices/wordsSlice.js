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
});

// Thunk for removing a Word from a User's words
export const removeWord = createAsyncThunk("words/remove", async (data) => {  
  const response = await axios.patch(`/api/words/${data.wordId}/remove_user/`, { user: data.userId });
  return response.data;
});

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

      .addCase(removeWord.fulfilled, (state, action) => {
        const removedWord = action.payload;

        const words = state.words;
        const newWords = words.filter(word => word.id !== removedWord.id)

        state.status = "fulfilled";
        state.words = newWords;
      })

      .addMatcher((action) => {
        return action.type == getWords.pending || action.type == addWord.pending || action.type == removeWord.pending;
      }, (state, action) => {
        state.status = "pending";
      })

      .addMatcher((action) => {
        return action.type == getWords.rejected || action.type == addWord.rejected || action.type == removeWord.rejected;
      }, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
  }

});

export default wordsSlice.reducer;
