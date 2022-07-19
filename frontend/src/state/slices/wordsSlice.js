import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  words: [],
  status: "idle", 
  error: null
};

export const wordsSlice = createSlice({
  name: "words",
  initialState: initialState,
  reducers: {}
});

export default wordsSlice.reducer;
