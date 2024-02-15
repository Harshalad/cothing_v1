import { createAsyncThunk } from "@reduxjs/toolkit";
import { RemoveUserProgramServiceClient } from "../../constants/proto/removeUserProgram/remove-user-program_grpc_web_pb";
//@ts-ignore
import { removeProgramGoalFromUserGoalsRequest } from "../../constants/proto/removeUserProgram/remove-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

// string userId = 1;
// string programId = 2;
// string userGoalId = 3;
// string userMilestoneId = 4;

export const removeProgramGoalFromUserGoals = async ({
  userId,
  programId,
  userGoalId,
}: // userMilestoneId,
any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new removeProgramGoalFromUserGoalsRequest();

    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);
    // request.setUsermilestoneid(userMilestoneId);

    const instance = new RemoveUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.removeProgramGoalFromUserGoals(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "ALIGN/REMOVE_PROGRAM_GOAL_FROM_USER_GOAL",
            response,
            err
          );
          const parsedResponse = JSON.parse(response);
          //   //@ts-ignore
          console.log(parsedResponse);
          if (parsedResponse?.statusCode === 0) {
            resolve(parsedResponse);
          }
        } catch (error) {
          console.log(error, "ALIGN/REMOVE_PROGRAM_GOAL_FROM_USER_GOAL error");
          reject(error);
        }
      }
    );
    //   return { nWorxUser: user };
  });
};
