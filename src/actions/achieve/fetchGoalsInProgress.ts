import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_IN_PROGRESS_GOALS";


export const fetchGoalsInProgress = async ({ userId, programId }: any) => {
  console.log("fetchGoalsInProgress", userId);
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();
    request.setUserid(userId);
    request.setProgramid(programId);

    let inProgressGoals: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchInProgressGoals(request, metadata, async (err, response) => {
      try {
        if (response) {
          console.log("fetchInProgressGoals Response", response, request,err);
          inProgressGoals = JSON.parse(response);
          console.log(inProgressGoals, "inProgressGoals ");
          //@ts-ignore
          resolve({ inProgressGoals: inProgressGoals?.response });
        }
      } catch (error) {
        console.log(error, "fetch inProgressGoals error");
        reject(error);
      }
    });
    return { inProgressGoals: inProgressGoals };
  });
};
