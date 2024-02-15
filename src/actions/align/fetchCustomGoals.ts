import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_CUSTOM_GOALS";

export const fetchCustomGoals = createAsyncThunk(
  prefixStr,
  async ({ userId, programId }: any, thunkAPI: any) => {
    console.log("fetchCustomGoals ");
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchUserProgramRequest();
      //TODO replace
      request.setUserid("cd1c4f86-cb89-4867-b455-5f1dd73142ec");
      // request.setUserid(userId);
      request.setProgramid(programId);

      let customGoals: {} | null = null;

      const instance = new FetchUserProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchCustomGoals(request, metadata, async (err, response) => {
        try {
          console.log("fetchCustomGoals Response", response, err);
           customGoals = JSON.parse(response);
          console.log(customGoals, "customGoals ");
          //@ts-ignore
          resolve({ customGoals: customGoals?.response });
        } catch (error) {
          console.log(error, "fetchCustomGoals error");
          reject(error);
        }
      });
      return { customGoals: customGoals };
    });
  }
);
