import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
//@ts-ignore
import {UpdateGoalRequest, UpdateStatusRequest} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"

import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const updateUserGoalStatus = async ({
  status,
  userId,
  programId,
  goalId,
  userName,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const goalDetails = new UpdateGoalRequest();
    goalDetails.setUsergoalid(goalId);
    goalDetails.setUserid(userId);
    goalDetails.setProgramid(programId);
    
    const request = new UpdateStatusRequest();
    request.setGoaldetails(goalDetails);
    request.setStatus(status);
    request.setAssignedbyuserid(userId);
    request.setAssignedby(userName);
    // const request = new UpdateRequest();

    // let boolMap = request.getBoolfieldstoupdateMap();
    // let stringArrayMap = request.getStringarrayfieldstoupdateMap();
    // let stringMapMap = request.getStringmapfieldstoupdateMap();
    // let stringDateMap = request.getDatetimefieldstoupdateMap();
    // let stringIntMap = request.getIntfieldstoupdateMap();
    // let stringMap = request.getStringfieldstoupdateMap();

    // request.setUsergoalid(goalId);
    // request.setUserid(userId);
    // request.setProgramid(programId);

    // stringMap.set("status", status);

    // if (status === "ASSIGNED") {
    //   stringMap.set("assignedByUserId", userId);
    //   stringMap.set("assignedBy", userName);
    // }

    const instance = new UpdateUserGoalServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.updateUserGoalStatus(request,metadata, async (err, response) => {
      try {
        console.log("ALIGN/UPDATE_USER_GOAL_PURPOSES", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ALIGN/UPDATE_USER_GOAL_PURPOSES error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
