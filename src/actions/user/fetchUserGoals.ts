import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_USER_GOALS";

export const fetchUserGoals = createAsyncThunk(
  prefixStr,
  async ({ userId, programId }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchUserProgramRequest();
      // request.setAppname("nworx_user_app");
      //TODO replace
      request.setUserid("cd1c4f86-cb89-4867-b455-5f1dd73142ec");
      // request.setUserid(userId);
      request.setProgramid(programId);

      let userGoals: {} | null = null;

      const instance = new FetchUserProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchUserGoals(request, metadata, async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          userGoals = parsedResponse;
          //@ts-ignore
          resolve({ userGoals: parsedResponse?.response });
        } catch (error) {
          console.log(error, "fetchUserGoals error");
          reject(error);
        }
      });
      return { userGoals: userGoals };
    });
  }
);

export const fetchAlignUserGoals = async ({ userId, programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setUserid(userId);
    request.setProgramid(programId);

    let userGoals: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchUserGoals(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        userGoals = parsedResponse;


        //@ts-ignore
        resolve(parsedResponse?.response);
      } catch (error) {
        console.log(error, "fetchUserGoals error");
        reject(error);
      }
    });
    return { userGoals: userGoals };
  });
};
