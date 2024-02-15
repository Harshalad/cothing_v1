import { PayloadAction, createReducer } from "@reduxjs/toolkit";
//https://redux-toolkit.js.org/usage/usage-guide
import { fetchUserGoals } from "../actions/user/fetchUserGoals";
import {
  fetchQuestionSet,
  fetchQuestionSetRedux,
} from "../actions/user/fetchQuestionSet";
import { fetchProgram } from "../actions/align/fetchProgram";
import { fetchQuestionByIdRedux } from "../actions/goalOverview/fetchQuestionById";
import { addGoalAlignmentQuestionAnswer } from "../actions/goalOverview/addGoalAnswer";
import { fetchAnsweredQuestions } from "../actions/goalOverview/fetchAnsweredQuestions";
import { clearGoalAnswers } from "../actions/goalOverview/clearGoalAnswers";

const initialState = {
  userGoals: null,
  questionSet: null,
  currentQuestion: null,
  program: null,
  nextQuestionId: null,
  fetchNextQuestion: false,
  answeredQuestions: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserGoals.fulfilled, (state, action) => {
    //@ts-ignore
    state.userGoals = action.payload.userGoals;
    return state;
  });
  builder.addCase(fetchQuestionSetRedux.fulfilled, (state, action) => {
    //@ts-ignore
    state.questionSet = action.payload.questionSet;
    return state;
  });
  builder.addCase(fetchQuestionByIdRedux.fulfilled, (state, action) => {
    //@ts-ignore
    state.currentQuestion = action.payload.question;
  });
  // builder.addCase(addGoalAlignmentQuestionAnswer.fulfilled, (state, action) => {
  //   state.fetchNextQuestion = true;
  // });
  builder.addCase(fetchAnsweredQuestions.fulfilled, (state, action) => {
    //@ts-ignore
    state.answeredQuestions = action.payload.answeredQuestions;
  });
  builder.addCase(clearGoalAnswers, (state, action) => {
    state.answeredQuestions = null;
    state.currentQuestion = null;
  });
  builder.addCase(fetchProgram.fulfilled, (state, action) => {
    //@ts-ignore
    state.program = action.payload.program;
    return state;
  });
});

export default userReducer;
