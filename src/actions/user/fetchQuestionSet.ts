import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "AUTH/FETCH_QUESTION_SET";

export const fetchQuestionSetRedux = createAsyncThunk(
  prefixStr,
  async ({ programId, }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      // request.setAppname("nworx_user_app");
      request.setProgramid(programId);

      let questionSet: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchQuestionSet(request,metadata , async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          questionSet = parsedResponse?.response;
          //@ts-ignore
          resolve({ questionSet: questionSet });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { questionSet: questionSet };
    });
  }
);

export const fetchQuestionSet = async ({ programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);

    let questionSet: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchQuestionSet(request,metadata , async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        questionSet = parsedResponse?.response;
        //@ts-ignore
        resolve({ questionSet: questionSet });
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { questionSet: questionSet };
  });
};
