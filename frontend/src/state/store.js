import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import wordsReducer from "./slices/wordsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    words: wordsReducer
  },
});
