import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MoviesReducer from "./slices/MoviesSlice";

const appStore = configureStore({
  reducer: {
    user: UserSlice,
    movies: MoviesReducer,
  },
});

export default appStore;
