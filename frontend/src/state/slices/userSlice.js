import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Constants
const INITIAL_STATE = {
  id: "",           // The user's id
  email: "",        // The user's email
  firstName: "",    // The user's first name
  lastName: "",     // The user's last name
  words: [],        // The user's words
  status: "idle"    // Status of thunk action
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
  const response = await axios.post("/api/users/", data);
  return response.data;
});

// Thunk for updating a User's info
export const updateUser = createAsyncThunk("user/update", async (data, thunkAPI) => {
  const user = thunkAPI.getState().user;

  const response = await axios.patch(`/api/users/${user.id}/`, data);
  return response.data;
})

// Thunk for adding a Word to a User's words
export const addWord = createAsyncThunk("user/addWord", async (data, thunkAPI) => {
  const user = thunkAPI.getState().user;

  try {
    const response = await axios.patch(`/api/words/${data.spelling}/add_user/`, { user: user.id });
    return response.data; 
  } catch(e) {
    const response = await axios.post("/api/words/", { users: [user.id], ...data });
    return response.data;
  }
})

// Thunk for removing a Word from a User's words
export const removeWord = createAsyncThunk("user/removeWord", async (data, thunkAPI) => {
  const user = thunkAPI.getState().user;
  
  const response = await axios.patch(`/api/words/${data.spelling}/remove_user/`, { user: user.id });
  return response.data;
})

// Custom Selectors
// Get user
export const selectUser = state => state.user;

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder 
      .addCase(logout.fulfilled, (state, action) => {
        state.id = INITIAL_STATE.id;
        state.email = INITIAL_STATE.email;
        state.firstName = INITIAL_STATE.firstName;
        state.lastName = INITIAL_STATE.lastName;
        state.words = INITIAL_STATE.words;
        state.status = INITIAL_STATE.status;

        localStorage.clear();
      })

      .addCase(addWord.fulfilled, (state, action) => {
        const word = action.payload;

        state.words = state.words.concat(word);
        state.status = "fulfilled";
      })

      .addCase(removeWord.fulfilled, (state, action) => {
        const removedWord = action.payload;

        const oldWords = state.words;
        const newWords = oldWords.filter((word) => word.id !== removedWord.id);

        state.words = newWords;
        state.status = "fulfilled";
      })

      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload["user"];
        const words = action.payload["words"];

        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.words = words;
        state.status = "fulfilled";

        localStorage.setItem("userId", user.id);
      })

      .addMatcher((action) => {
        return action.type == register.fulfilled || action.type == updateUser.fulfilled;
      }, (state, action) => {
        const user = action.payload;

        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.status = "fulfilled";

        if (action.type == register.fulfilled) localStorage.setItem("userId", user.id);
      })

      .addMatcher((action) => {
        return (
          action.type == login.pending || 
          action.type == logout.pending || 
          action.type == register.pending || 
          action.type == updateUser.pending ||
          action.type == addWord.pending ||
          action.type == removeWord.pending
        );
      }, (state, action) => {
        state.status = "pending";
      })

      .addMatcher((action) => {
        return (
          action.type == login.rejected || 
          action.type == logout.rejected || 
          action.type == register.rejected || 
          action.type == updateUser.rejected ||
          action.type == addWord.rejected ||
          action.type == removeWord.rejected
        );
      }, (state, action) => {
        state.status = "rejected";
      })
  }
})

// Reducer
export default userSlice.reducer;
