// import { UPDATE_CURRENT_QUESTION_ANSWER } from "./UpdateActionType";

// export const updateCurrentQuestionAnswer = (answer:any) => ({
//   type: UPDATE_CURRENT_QUESTION_ANSWER,
//   payload: answer,
// });
import { createAction } from "@reduxjs/toolkit";
//@ts-ignore
export const UPDATE_CURRENT_QUESTION_ANSWER = createAction(
  "test/UPDATE_CURRENT_QUESTION_ANSWER"
);