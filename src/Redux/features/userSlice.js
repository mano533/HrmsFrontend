import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "user_Data",
  initialState: {
    userData: {},
  },
  reducers: {
    userDetailsData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { userDetailsData } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
