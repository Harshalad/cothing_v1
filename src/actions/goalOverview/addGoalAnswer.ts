import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { addGoalAlignmentQuestionAnswerRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
// import { UpdateNworxUserRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

// export const addGoalAlignmentQuestionAnswer = createAsyncThunk(
//   "GOAL_OVERVIEW/ADD_ANSWER",
export const addGoalAlignmentQuestionAnswer = async ({
  answerOption,
  answerOptionOrder,
  emotion,
  nextQuestionId,
  questionId,
  programId,
  goalId,
  userId,
  questionName,
}: any) =>
  // thunkAPI: any
  {
    console.log("action level", {
      answerOption,
      answerOptionOrder,
      emotion,
      nextQuestionId,
      questionId,
      programId,
      goalId,
      userId,
      questionName,
    });
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new addGoalAlignmentQuestionAnswerRequest();
      request.setAnswer(answerOption);
      request.setAnsweroptionid(answerOptionOrder);
      request.setEmotion(emotion);
      request.setNextquestionid(nextQuestionId);
      request.setQuestionid(questionId);
      request.setProgramid(programId);
      request.setUsergoalid(goalId);
      request.setUserid(userId);
      request.setQuestion(questionName);

      const instance = new UpdateUserProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.addGoalAlignmentQuestionAnswer(
        request,
        metadata,
        async (err, response) => {
          try {
            const parsedResponse = JSON.parse(response);
            //@ts-ignore
            if (parsedResponse?.statusCode === 0) {
              resolve(parsedResponse);
            }
          } catch (error) {
            console.log(error, "GOAL_OVERVIEW/ADD_ANSWER error");
            reject(error);
          }
        }
      );
      //   return { nWorxUser: user };
    });
  };
// );
