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
const selectdropdownDetailsSlice = createSlice({
  name: "SelectDropDown",
  initialState: {
    SelectCompanyDropDownList: [],
    SelectDeputyCompanyDropDownList: [],
  },
  reducers: {
    selectdropdownDetailsData: (state, action) => {
      state.SelectCompanyDropDownList = action.payload.selectedCompany;
      state.SelectDeputyCompanyDropDownList =
        action.payload.selectedDeputyCompany;
    },
  },
});

export const { userDetailsData } = userDetailsSlice.actions;
export const { selectdropdownDetailsData } = selectdropdownDetailsSlice.actions;

export const userDetailsReducer = userDetailsSlice.reducer;
export const selectdropdownDetailsReducer = selectdropdownDetailsSlice.reducer;
