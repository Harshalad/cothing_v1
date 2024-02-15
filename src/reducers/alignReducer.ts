import { PayloadAction, createReducer } from "@reduxjs/toolkit";
//https://redux-toolkit.js.org/usage/usage-guide
import { logout } from "../actions/auth/logout";
import { fetchUserGoals } from "../actions/user/fetchUserGoals";
import { fetchOrgGoals } from "../actions/align/fetchOrgGoals";
import { fetchDepartmentGoals } from "../actions/align/fetchDepartmentGoals";

const initialState = {
  userGoals: null,
  orgGoals: null,
  departmentGoals: null,
};

const alignReducer = createReducer(initialState, (builder) => {
  //   builder.addCase(fetchUserGoals.fulfilled, (state, action) => {
  //     //@ts-ignore
  //     state.userGoals = action.payload.userGoals;
  //     return state;
  //   });
  //   builder.addCase(fetchOrgGoals.fulfilled, (state, action) => {
  //     //@ts-ignore
  //     state.orgGoals = action.payload?.orgGoals;
  //     return state;
  //   });
  //   builder.addCase(fetchDepartmentGoals.fulfilled, (state, action) => {
  //     //@ts-ignore
  //     state.departmentGoals = action.payload?.departmentGoals;
  //     return state;
  //   });
  builder.addCase(logout, (state, action) => {
    state = initialState;
    return state;
  });
});

export default alignReducer;
