import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Constants
const INITIAL_STATE = {
  id: "",           // The user's id
  email: "",        // The user's email
  firstName: "",    // The user's first name
  lastName: "",     // The user's last name
  dateJoined: "",   // The day the user joined
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
  const ret = {};

  const response = await axios.post("/api/users/", data);
  ret["user"] = response.data;

  ret["words"] = [];

  return ret;
});

// Thunk for updating a User's info
export const updateUser = createAsyncThunk("user/update", async (data) => {
  const response = await axios.patch(`/api/users/${data.id}/`, data);
  return response.data;
})

// Thunk for getting a User's info
export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  const ret = {};

  let response = await axios.get(`/api/users/${userId}/`);
  ret["user"] = response.data;

  response = await axios.get(`/api/users/${userId}/words/`);
  ret["words"] = response.data;

  return ret;
})

// Thunk for adding a Word to a User's words
export const addWord = createAsyncThunk("user/addWord", async (data) => {
  try {
    const response = await axios.patch(`/api/words/${data.spelling}/add_user/`, { user: data.users[0] });
    return response.data; 
  } catch(e) {
    const response = await axios.post("/api/words/", data);
    return response.data;
  }
})

// Thunk for removing a Word from a User's words
export const removeWord = createAsyncThunk("user/removeWord", async (data) => {
  const response = await axios.patch(`/api/words/${data.spelling}/remove_user/`, { user: data.user });
  return response.data;
})

// Custom Selectors
// Get user
export const selectUser = state => state.user;

// Get a word by its spelling
export const selectWordBySpelling = (state, spelling) => state.user.words.find(word => word.spelling === spelling);

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
        state.dateJoined = INITIAL_STATE.dateJoined;
        state.words = INITIAL_STATE.words;
        state.status = INITIAL_STATE.status;

        localStorage.clear();
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const user = action.payload;

        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.status = "fulfilled";
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

      .addMatcher((action) => {
        return action.type == login.fulfilled || action.type == register.fulfilled || action.type == getUser.fulfilled;
      }, (state, action) => {
        const user = action.payload["user"];
        const words = action.payload["words"];

        state.id = user.id;
        state.email = user.email;
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.dateJoined = new Date(user.date_joined).toLocaleDateString();
        state.words = words;
        state.status = "fulfilled";

        if (action.type == login.fulfilled || action.type == register.fulfilled) localStorage.setItem("userId", user.id);
      })

      .addMatcher((action) => {
        return (
          action.type == login.pending || 
          action.type == logout.pending || 
          action.type == register.pending || 
          action.type == updateUser.pending ||
          action.type == getUser.pending ||
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
          action.type == getUser.rejected ||
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
