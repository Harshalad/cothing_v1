import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramGoalRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "AUTH/FETCH_GOAL_ANSWERED_QUESTIONS";

export const fetchAnsweredQuestions = createAsyncThunk(
  prefixStr,
  async (
    { userId, programId, goalId, selectedEmotion, }: any,
    thunkAPI: any
  ) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchUserProgramGoalRequest();
      // request.setAppname("nworx_user_app");
      request.setProgramid(programId);
      request.setUsergoalid(goalId);
      request.setUserid(userId);

      let answeredQuestions: {} | null = null;

      const instance = new FetchUserProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchAnsweredQuestions(request, metadata, async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse?.statusCode === 2) {
            throw new Error(parsedResponse?.error);
          }
          answeredQuestions = parsedResponse?.response;

          //@ts-ignore
          const filteredQuestions = answeredQuestions?.length
            ? //@ts-ignore
              answeredQuestions.filter(
                (question: any) => question.emotion === selectedEmotion
              )
            : answeredQuestions;
          //@ts-ignore
          resolve({ answeredQuestions: filteredQuestions });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { answeredQuestions: answeredQuestions };
    });
  }
);
