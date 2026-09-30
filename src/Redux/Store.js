import { configureStore } from "@reduxjs/toolkit";
import {
  selectdropdownDetailsReducer,
  userDetailsReducer,
} from "./features/userSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    selectDropdown: selectdropdownDetailsReducer,
  },
});
