import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchQuestionServiceClient } from "../../constants/proto/fetchGoalQuestion/fetch-question_grpc_web_pb";
//@ts-ignore
import { QuestionRequest } from "../../constants/proto/fetchGoalQuestion/fetch-question_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "AUTH/FETCH_QUESTIONBYID";

export const fetchQuestionByIdRedux = createAsyncThunk(
  prefixStr,
  async ({ questionId }: any, thunkAPI: any) => {
    console.log(questionId, "question ID");
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new QuestionRequest();
      // request.setAppname("nworx_user_app");
      request.setId(questionId);

      let question: {} | null = null;

      const instance = new FetchQuestionServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchQuestionById(request, metadata, async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          //@ts-ignore
          resolve({ question: parsedResponse.response });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { question: question };
    });
  }
);

export const fetchQuestionById = async ({ questionId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new QuestionRequest();
    // request.setAppname("nworx_user_app");
    request.setId(questionId);

    let question: {} | null = null;

    const instance = new FetchQuestionServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchQuestionById(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        //@ts-ignore
        resolve({ question: parsedResponse.response });
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { question: question };
  });
};
