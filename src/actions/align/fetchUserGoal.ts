import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramGoalRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_USER_GOAL_BY_ID";

export const fetchUserGoal = async ({ userId, programId, userGoalId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramGoalRequest();
    //TODO replace
    // request.setUserid("cd1c4f86-cb89-4867-b455-5f1dd73142ec");
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);

    let userGoal: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchUserGoalById(request, metadata, async (err, response) => {
      try {
        userGoal = JSON.parse(response);
        //@ts-ignore
        resolve({ userGoal: userGoal?.response });
      } catch (error) {
        console.log(error, "fetchUserGoalById error");
        reject(error);
      }
    });
    return { userGoal: userGoal };
  });
};
