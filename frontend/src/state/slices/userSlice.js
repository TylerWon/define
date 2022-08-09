import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  words: [],
  status: "idle"
};

// Thunks
// Thunk for logging a User in
export const login = createAsyncThunk("user/login", async (data) => {
  const ret = {};

  let response = await axios.post("/api/login/", data);
  ret["user"] = response.data;

  response = await axios.get(`/api/users/${ret.user.id}/words/`);
  ret["words"] = response.data;

  return ret;
});

// Thunk for logging a User out
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.get("/api/logout/");
  return response.data;
});

// Thunk for registering a User
export const register = createAsyncThunk("user/register", async (data) => {
  const ret = {};
  
  const response = await axios.post("/api/users/", data);
  ret["user"] = response.data;

  ret["words"] = [];

  return ret;
});

// Thunk for updating a User's info
export const updateUser = createAsyncThunk("user/update", async (data) => {
  const response = await axios.patch(`/api/users/${data.id}/`, data);
  return response.data
})

// Custom Selectors
// Get user
export const selectUser = state => state.user;

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserFromLocalStorage: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));

      state.id = user.id;
      state.email = user.email;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
    }
  },
  extraReducers(builder) {
    builder 
      .addCase(logout.fulfilled, (state, action) => {
        state.id = initialState.id;
        state.email = initialState.email;
        state.firstName = initialState.firstName;
        state.lastName = initialState.lastName;
        state.words = initialState.words;
        state.status = initialState.status;

        localStorage.removeItem("user");
      })

      .addMatcher((action) => {
        return action.type == login.fulfilled || action.type == register.fulfilled || action.type == updateUser.fulfilled
      }, (state, action) => {
        const user = action.payload["user"];
        const words = action.payload["words"];

        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.words = words;
        state.status = "fulfilled";

        localStorage.setItem("user", JSON.stringify(state));
      })

      .addMatcher((action) => {
        return action.type == login.pending || action.type == logout.pending || action.type == register.pending || action.type == updateUser.pending 
      }, (state, action) => {
        state.status = "pending";
      })

      .addMatcher((action) => {
        return action.type == login.rejected || action.type == logout.rejected || action.type == register.rejected || action.type == updateUser.rejected 
      }, (state, action) => {
        state.status = "rejected";
      })
  }
})

// Action creators
export const { getUserFromLocalStorage } = userSlice.actions;

// Reducer
export default userSlice.reducer;
