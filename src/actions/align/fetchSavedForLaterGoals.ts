import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchSavedForLaterGoals = async ({ userId, programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();
    //TODO replace
    // request.setUserid("cd1c4f86-cb89-4867-b455-5f1dd73142ec");
    request.setUserid(userId);
    request.setProgramid(programId);

    let savedForLaterGoals: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchSavedForLaterGoals(request,metadata , async (err, response) => {
      try {
        savedForLaterGoals = JSON.parse(response);
        //@ts-ignore
        resolve({ savedForLaterGoals: savedForLaterGoals?.response });
      } catch (error) {
        console.log(error, "fetchSavedForLaterGoals error");
        reject(error);
      }
    });
    return { savedForLaterGoals: savedForLaterGoals };
  });
};
