import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
})
