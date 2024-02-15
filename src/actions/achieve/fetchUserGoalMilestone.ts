import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramGoalRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchUserGoalMilestone = async ({
  userId,
  programId,
  userGoalId,
}: any) => {
  console.log("fetchUserGoalMilestone ");
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramGoalRequest();
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);

    let userGoalMilestone: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    

    instance.fetchUserGoalMilestone(request,metadata , async (err, response) => {
      try {
        console.log("fetchUserGoalMilestone Response", response, err);
        userGoalMilestone = JSON.parse(response);
        console.log(userGoalMilestone, "userGoalMilestone ");
        //@ts-ignore
        resolve({ userGoalMilestone: userGoalMilestone?.response });
      } catch (error) {
        console.log(error, "fetchUserGoalMilestone error");
        reject(error);
      }
    });
    return { userGoalMilestone: userGoalMilestone };
  });
};
