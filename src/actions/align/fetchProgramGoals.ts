import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_PROGRAM_GOALS";

export const fetchProgramGoals = createAsyncThunk(
  prefixStr,
  async ({ programId, department, userId, }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      // request.setAppname("nworx_user_app");
      request.setProgramid(programId);
      request.setDepartment(department);
      request.setUserid(userId);

      let programGoals: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchProgramGoalsByOrganisationMandate(
        request,
        metadata,
        async (err, response) => {
          try {
            const parsedResponse = JSON.parse(response);
            programGoals = parsedResponse?.response;
            //@ts-ignore
            resolve({ programGoals: programGoals });
          } catch (error) {
            console.log(error, prefixStr, " error");
            reject(error);
          }
        }
      );
      return { programGoals: programGoals };
    });
  }
);

export const getProgramGoals = async ({
  programId,
  department,
  userId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    // request.setDepartment(department);
    request.setUserid(userId);
    console.log("PBO, REQ", request);
    let programGoals: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchProgramGoalsByOrganisationMandate(request,metadata , async (err, response) => {
      try {

        console.log(response , " PBO RESP");

        const parsedResponse = JSON.parse(response);
        programGoals = parsedResponse?.response;
        console.log(parsedResponse, "PBO PARSED RESP");
        //@ts-ignore
        resolve({ programGoals: programGoals });
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { programGoals: programGoals };
  });
};
