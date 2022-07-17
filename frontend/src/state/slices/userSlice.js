import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("user/login", async (email, password) => {
  const data = {
    email: email,
    password: password
  }

  const response = await axios.post("/api/login", data);
  return response;
})

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const response = action.payload;

        if (response === 200) {
          const user = response.data;

          state.status = "fulfilled";
          state.id = user.id;
          state.email = user.email;
          state.firstName = user.firstName;
          state.lastName = user.lastName;
        } else {
          state.status = "failed";
          state.error = response.data.message;
        }
      })
      .addCase(login,rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})
