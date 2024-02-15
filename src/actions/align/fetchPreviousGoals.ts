import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_PREVIOUS_GOALS";

export const fetchPreviousGoals = async ({ userId, programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    console.log({ userId, programId });
    const request = new FetchUserProgramRequest();
    request.setUserid(userId);
    request.setProgramid(programId);

    let previousGoals: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchPreviousGoals(request,metadata , async (err, response) => {
      try {
        console.log("fetchPreviousGoals Response", response, err);
        previousGoals = JSON.parse(response);
        console.log(previousGoals, "previous goals ");
        //@ts-ignore
        resolve({ previousGoals: previousGoals?.response });
      } catch (error) {
        console.log(error, "fetchPreviousGoals error");
        reject(error);
      }
    });
    return { previousGoals: previousGoals };
  });
};
