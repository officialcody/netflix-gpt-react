import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";

const appStore = configureStore({
  reducer: {
    user: UserSlice,
  },
});

export default appStore;
