import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { addProgramGoalToUserGoalRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const updateUserGoalEmotion = createAsyncThunk(
  "ALIGN/ADD_PROGRAM_GOAL_TO_USER_GOAL",
  async (
    {
      assignedBy,
      goalId,
      userId,
      programId,
      status,
      addedBy,
      addedByRole,
      addedByUserId,
    }: any,
    thunkAPI: any
  ) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new addProgramGoalToUserGoalRequest();

      request.setAssignedby(assignedBy);
      request.setGoalid(goalId);
      request.setUserid(userId);
      request.setProgramid(programId);
      request.setStatus(status);
      request.setAddedby(addedBy);
      request.setAddedbyrole(addedByRole);
      request.setAddedbyuserid(addedByUserId);

      const instance = new UpdateUserProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.addProgramGoalToUserGoal(request, metadata, async (err, response) => {
        try {
          console.log("ALIGN/ADD_PROGRAM_GOAL_TO_USER_GOAL", response, err);
          const parsedResponse = JSON.parse(response);
          //   //@ts-ignore
          console.log(parsedResponse);
          if (parsedResponse?.statusCode === 0) {
            resolve(parsedResponse);
          }
        } catch (error) {
          console.log(error, "ALIGN/ADD_PROGRAM_GOAL_TO_USER_GOAL error");
          reject(error);
        }
      });
      //   return { nWorxUser: user };
    });
  }
);

export const addProgramGoalToUserGoal = async ({
  assignedBy,
  goalId,
  userId,
  programId,
  status,
  addedBy,
  addedByRole,
  addedByUserId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new addProgramGoalToUserGoalRequest();

    request.setAssignedby(assignedBy);
    request.setGoalid(goalId);
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setStatus(status);
    request.setAddedby(addedBy);
    request.setAddedbyrole(addedByRole);
    request.setAddedbyuserid(addedByUserId);

    const instance = new UpdateUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addProgramGoalToUserGoal(request, metadata, async (err, response) => {
      try {
        console.log("ALIGN/ADD_PROGRAM_GOAL_TO_USER_GOAL", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ALIGN/ADD_PROGRAM_GOAL_TO_USER_GOAL error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
