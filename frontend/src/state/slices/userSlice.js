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
  return response.data;
});

// Thunk for logging a User out
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.get("/api/logout/");
  return response;
});

// Thunk for registering a User
export const register = createAsyncThunk("user/register", async (data) => {
  const response = await axios.post("/api/users/", data);
  return response.data
});

// Thunk for updating a User's info
export const updateUser = createAsyncThunk("user/update", async (data) => {
  const response = await axios.patch(`/api/users/${data.id}/`, data);
  return response.data
})

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
        state.status = "fulfilled";

        localStorage.removeItem("user");
      })

      .addMatcher((action) => {
        return action.type == login.fulfilled || action.type == register.fulfilled || action.type == updateUser.fulfilled
      }, (state, action) => {
        const user = action.payload;

        state.status = "fulfilled";
        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;

        localStorage.setItem("user", JSON.stringify(state));
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

export const { getUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
