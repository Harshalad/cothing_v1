import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { TestDetailsRequest } from "../../../src/constants/proto/assessment/assessment_pb";
import { AssessmentServiceClient } from "../../../src/constants/proto/assessment/assessment_grpc_web_pb";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToken } from "../auth/token";

export const fetchUserTestDetails = createAsyncThunk(
  "test/FetchUserTestDetails",
  async ({ userTestMapId }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new TestDetailsRequest();
      request.setUsertestmapid(userTestMapId);
      let testDetail: {} | null = null;
      const instance = new AssessmentServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );

      instance.fetchTestDetails(request, metadata, async (err, response) => {
        try {
          console.log("Test details request:", request, "response", response);
          const parsedResponse = JSON.parse(response);
          testDetail = parsedResponse?.response;
          //@ts-ignore
          resolve(testDetail);
        } catch (error) {
          console.log(error, "Fetch test details error");
          reject(error);
        }
      });
      return { testDetail: testDetail };
    });
  }
);



export const fetchUserTestDetailsApi = async ({ userTestMapId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new TestDetailsRequest();
    request.setUsertestmapid(userTestMapId);
    let testDetail: {} | null = null;
    const instance = new AssessmentServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchTestDetails(request, metadata, async (err, response) => {
      try {
        console.log("fetchTestDetails request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        testDetail = parsedResponse;
        console.log("fetchTestDetails response:", parsedResponse);
        resolve(testDetail);
      } catch (error) {
        console.log(error, "Fetch test details error");
        reject(error);
      }
    });
    return { testDetail: testDetail };
  });
};