import { combineReducers } from "redux";
import auth from "./authReducer";
import user from "./userReducer";
import align from "./alignReducer";
import assessment from "./assessment";
export default combineReducers({
  auth,
  user,
  align,
  assessment
});
