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

// Thunk for logging a User in
export const login = createAsyncThunk("user/login", async (data) => {
  const response = await axios.post("/api/login", data);
  return response;
});

// Thunk for logging a User out
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.get("/api/logout/");
  return response;
});

// Thunk for registering a User
export const register = createAsyncThunk("user/register", async (data) => {
  const response = await axios.post("/api/users/", data);
  return response;
});

// Thunk for updating a User's info
export const updateUser = createAsyncThunk("user/update", async (userId, data) => {
  const response = await axios.patch(`/api/users/${userId}/`, data);
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
          state.error = response.data.detail;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      .addCase(logout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state = initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        const response = action.payload;

        if (response === 201) {
          const user = response.data;

          state.status = "fulfilled";
          state.id = user.id;
          state.email = user.email;
          state.firstName = user.firstName;
          state.lastName = user.lastName;
        } else {
          state.status = "failed";
          state.error = response.data.detail;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
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
          state.error = response.data.detail;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})
