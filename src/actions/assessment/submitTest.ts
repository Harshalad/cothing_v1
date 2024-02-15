import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { SubmitTestRequest } from "../../../src/constants/proto/assessment/assessment_pb";
import { AssessmentServiceClient } from "../../../src/constants/proto/assessment/assessment_grpc_web_pb";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToken } from "../auth/token";

export const submitUserTestRedux = createAsyncThunk(
  "test/submitUserTestRedux",
  async ({ userTestMapId,
    autoSubmitted }: any, thunkAPI: any) => {
  const metadata = await fetchToken();

    return new Promise((resolve, reject) => {
      const request = new SubmitTestRequest();
      request.setUsertestmapid(userTestMapId);
      request.setAutosubmitted(autoSubmitted);
      let testDetail: {} | null = null;
      const instance = new AssessmentServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );

      instance.submitTest(request, metadata, async (err, response) => {
        try {
          console.log("submitTest request:", request, "response", response);
          const parsedResponse = JSON.parse(response);
          //@ts-ignore
          console.log(parsedResponse, "Parsed submitTest response:");
          if (parsedResponse?.statusCode === 0) {
            resolve(parsedResponse);
          }
        } catch (error) {
          console.log(error, "Submit Test details error");
          reject(error);
        }
      });

    });
  }
);
export const submitUserTest = async ({
  userTestMapId,
  autoSubmitted
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {

    const request = new SubmitTestRequest();
    request.setUsertestmapid(userTestMapId);
    request.setAutosubmitted(autoSubmitted);

    const instance = new AssessmentServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.submitTest(request, metadata, async (err, response) => {
      try {
        console.log("submitTest request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        //@ts-ignore
        console.log(parsedResponse, "Parsed submitTest response:");
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "Submit Test details error");
        reject(error);
      }
    });
  });
};
