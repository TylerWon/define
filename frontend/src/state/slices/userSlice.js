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
  const response = await axios.post("/api/login/", data);
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
export const updateUser = createAsyncThunk("user/update", async (data) => {
  const response = await axios.patch(`/api/users/${data.id}/`, data);
  return response;
})

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const response = action.payload;

        if (response.status === 200) {
          const user = response.data;

          state.status = "fulfilled";
          state.id = user.id;
          state.email = user.email;
          state.firstName = user.first_name;
          state.lastName = user.last_name;
        } else {
          state.status = "failed";
          state.error = response.data.detail;
        }
      })
      
      .addCase(logout.fulfilled, (state, action) => {
        state.id = initialState.id;
        state.email = initialState.email;
        state.firstName = initialState.firstName;
        state.lastName = initialState.lastName;
        state.status = "fulfilled";
      })

      .addCase(register.fulfilled, (state, action) => {
        const response = action.payload;

          const user = response.data;

          state.status = "fulfilled";
          state.id = user.id;
          state.email = user.email;
          state.firstName = user.first_name;
          state.lastName = user.last_name;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const response = action.payload;

        if (response.status === 200) {
          const user = response.data;

          state.status = "fulfilled";
          state.id = user.id;
          state.email = user.email;
          state.firstName = user.first_name;
          state.lastName = user.last_name;
        } else {
          state.status = "failed";
          state.error = response.data.detail;
        }
      })

      .addMatcher((action) => {
        return action.type == login.pending || action.type == logout.pending || action.type == register.pending || action.type == updateUser.pending 
      }, (state, action) => {
        state.status = "loading";
      })

      .addMatcher((action) => {
        return action.type == login.rejected || action.type == logout.rejected || action.type == register.rejected || action.type == updateUser.rejected 
      }, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export default userSlice.reducer;
