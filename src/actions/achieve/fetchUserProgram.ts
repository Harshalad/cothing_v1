import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_USER_PROGRAM";

export const fetchUserProgram = createAsyncThunk(
  "AUTH/FETCH_USER_PROGRAM",
  async ({ userId, programId }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchUserProgramRequest();
      request.setUserid(userId);
    request.setProgramid(programId);

    console.log(request);

    let userProgram: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchUserProgram(request, metadata, async (err, response) => {
      try {
        console.log("fetchUserProgram Response", response, err);
        userProgram = JSON.parse(response);
        console.log(userProgram, "userProgram ");
        //@ts-ignore
        resolve({ userProgram: userProgram?.response });
      } catch (error) {
        console.log(error, "fetchUserProgram error");
        reject(error);
      }
    });
    return { userProgram: userProgram };
  });
  }
);


export const getUserProgram = async ({ userId, programId,}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();

    request.setUserid(userId);
    request.setProgramid(programId);

    console.log(request);

    let userProgram: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchUserProgram(request,metadata , async (err, response) => {
      try {
        console.log("fetchUserProgram Response", response, err);
        userProgram = JSON.parse(response);
        console.log(userProgram, "userProgram ");
        //@ts-ignore
        resolve({ userProgram: userProgram?.response });
      } catch (error) {
        console.log(error, "fetchUserProgram error");
        reject(error);
      }
    });
    return { userProgram: userProgram };
  });
};
