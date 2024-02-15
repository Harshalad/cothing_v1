import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { TestDetailsRequest } from "../../../src/constants/proto/assessment/assessment_pb";
import { AssessmentServiceClient } from "../../constants/proto/assessment/assessment_grpc_web_pb";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToken } from "../auth/token";

export const fetchTestQuestionsReduxThunk = createAsyncThunk(
  "test/fetchTestQuestionsReduxThunk",
  async ({ userTestMapId }: any, thunkApi: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new TestDetailsRequest();
      request.setUsertestmapid(userTestMapId)
      let testQuestions: {} | null = null;
      const instance = new AssessmentServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchQuestions(request, metadata, async (err, response) => {
        try {
          console.log("fetchQuestions request:", request, "response", response);
          const parsedResponse = JSON.parse(response);
          testQuestions = parsedResponse?.response;
          console.log("fetchQuestions response", testQuestions);
          //@ts-ignore
          resolve(testQuestions);
        } catch (error) {
          console.log(error, "Fetch Question details error");
          reject(error);
        }
      });
      return { testQuestions: testQuestions };
    });
  }
);

export const fetchTestQuestions = async ({
  userTestMapId
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new TestDetailsRequest();
    request.setUsertestmapid(userTestMapId);
    let testQuestions: {} | null = null;
    const instance = new AssessmentServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchQuestions(request, metadata, async (err, response) => {
      try {
        console.log("Test Question request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        testQuestions = parsedResponse?.response;
        resolve(testQuestions);
      } catch (error) {
        console.log(error, "Fetch Question details error");
        reject(error);
      }
    });
    return { testQuestions: testQuestions };
  });
};
