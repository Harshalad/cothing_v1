import { PayloadAction, createReducer, current } from "@reduxjs/toolkit";
import { fetchUserTestDetails } from "../actions/assessment/fetchTestDetails";
import { fetchTestQuestionsReduxThunk } from "../actions/assessment/fetchQuestions";
import { UPDATE_CURRENT_QUESTION_ANSWER } from "../actions/assessment/UpdateAction";
import { Satellite } from "@mui/icons-material";
import { enableMapSet } from "immer";
import { stat } from "fs";

enableMapSet();

// //https://redux-toolkit.js.org/usage/usage-guide
// import {}

const initialState = {
  qId: null,
  sectionId: null,
  testDetails: null,
  questionMap: new Map(),
  timeRemaning: null,
  currQuestion: null,
  sections: null,
  showTestInstruct: false,
  attemptNo:null,
  attempt:null,
  testStartDate:null,
  duration:null
};

const assessmentReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserTestDetails.fulfilled, (state, action) => {
    //@ts-ignore;
    state.testDetails = action?.payload;
    //@ts-ignore;
    state.sectionId = action?.payload?.sections[0].sectionId;
    //@ts-ignore
    state.duration = action?.payload?.duration;
    //@ts-ignore
    state.showTestInstruct = action?.payload?.sections[0]?.description
      ? true
      : false;

    return state;
  });
  builder.addCase(fetchTestQuestionsReduxThunk.fulfilled, (state, action) => {
    //@ts-ignore;
    state.sections = action?.payload?.sections;
    //@ts-ignore
    state.qId = action?.payload?.sections[0]?.questions[0].questionId;
    //@ts-ignore
    state.attemptNo =action?.payload?.attemptNo;
    //@ts-ignore
    state.attempt = action?.payload?.attempt;
    //@ts-ignore
    state.testStartDate = action?.payload?.attempt?.testStartDateTime;
    //@ts-ignore
    let qm = new Map();

    //@ts-ignore
    action?.payload?.sections.forEach((section: any) => {
      section.questions.forEach((question: any) => {
        qm.set(`${section.sectionId}_${question.questionId}`, question);
      });
    });

    state.questionMap = qm;
    console.log(state.questionMap, "state.questionMap");
    //@ts-ignore
    state.currQuestion = state?.questionMap.get(
      `${state.sectionId}_${state.qId}`
    );
    return state;
  });

//   builder.addCase(UPDATE_CURRENT_QUESTION_ANSWER, (state, action) => {
//     console.log(current(state),"aditya");
//     const questionKey = `${state.sectionId}_${state.qId}`;
//     //@ts-ignore
//     const answer = action.payload;
//     console.log(answer, "answer");
//     state.currQuestion ={
//         //@ts-ignore
//         ...state.currQuestion, 
//         answer:answer
//     };
//     const curr=state.currQuestion;
//     //@ts-ignore
//      const currentValue = state.questionMap[questionKey];

//       const updatedValue = {
//         ...currentValue,
//         curr
//       };

//       // Update the state.questionMap object with the new value
//       const updatedQuestionMap = {
//         ...state.questionMap,
//         [questionKey]: updatedValue
//       };
//       console.log(current(state), "after");
//       // Return the new state with the updated questionMap
//       return {
//         ...state,
//         questionMap: updatedQuestionMap
//       };
      
//   });
});

export default assessmentReducer;
