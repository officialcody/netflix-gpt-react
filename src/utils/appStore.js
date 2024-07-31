import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MoviesReducer from "./slices/MoviesSlice";
import GPTReducer from "./slices/GPTSlice";
import UIConfigReducer from "./slices/UIConfig";

const appStore = configureStore({
  reducer: {
    user: UserSlice,
    movies: MoviesReducer,
    gpt: GPTReducer,
    uiconfig: UIConfigReducer,
  },
});

export default appStore;
