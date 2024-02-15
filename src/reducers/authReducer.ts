import { PayloadAction, createReducer } from "@reduxjs/toolkit";
//https://redux-toolkit.js.org/usage/usage-guide
import { verifyNworxUser } from "../actions/auth/verifyNworxUser";
import { fetchFirebaseUser } from "../actions/auth/fetchFirebaseUser";
import { fetchNworxUser } from "../actions/auth/fetchNworxUser";
import { logout } from "../actions/auth/logout";
import { MANAGER_VIEW_STATE } from "../constants/auth";
import { toggleManagerView } from "../actions/user/toggleManagerView";
import { getRoleBasedAccess } from "../actions/auth/fetchRoleBasedAccess";

const initialState = {
  isVerifiedUser: null,
  isMFAEnabled: null,
  phoneNumber: null,
  nWorxUser: null,
  firebaseUser: null,
  managerToggleView: MANAGER_VIEW_STATE.LP,
  roleBasedAccess: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(verifyNworxUser.fulfilled, (state, action) => {
    //@ts-ignore
    state.isVerifiedUser = action.payload?.isVerifiedUser;
    //@ts-ignore
    state.isMFAEnabled = action.payload?.isMFAEnabled;
    //@ts-ignore
    state.phoneNumber = action.payload?.phoneNumber;
    return state;
  });
  builder.addCase(fetchNworxUser.fulfilled, (state, action) => {
    //@ts-ignore
    state.nWorxUser = action.payload?.nWorxUser;
    //@ts-ignore
    if(state.nWorxUser?.roles?.length > 0){
      //@ts-ignore
      state.managerToggleView = state.nWorxUser?.roles[0];
    }
    return state;
  });
  builder.addCase(fetchFirebaseUser.fulfilled, (state, action) => {
    //@ts-ignore
    state.firebaseUser = action.payload?.firebaseUser;
    return state;
  });
  builder.addCase(logout, (state, action) => {
    state = initialState;
    return state;
  });
  builder.addCase(toggleManagerView, (state, action) => {
    if (action.payload) {
      state.managerToggleView = action.payload;
    }
    return state;
  });
  builder.addCase(getRoleBasedAccess.fulfilled, (state, action) => {
    if (action.payload) {
      //@ts-ignore
      state.roleBasedAccess = action.payload?.roleBasedAccess;
    }
    return state;
  });
});

export default authReducer;
