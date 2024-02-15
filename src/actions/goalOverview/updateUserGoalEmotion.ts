import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {UpdateGoalRequest, UpdateEmotionRequest} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"

import { fetchToken } from "../auth/token";

export const updateUserGoalEmotion = createAsyncThunk(
  "GOAL_OVERVIEW/UPDATE_USER_GOAL_EMOTION",
  async (
  {goalEmotion, userId, programId, goalId}: any,thunkAPI: any
  ) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {  
      const goalDetails = new UpdateGoalRequest();
      goalDetails.setUsergoalid(goalId);
      goalDetails.setUserid(userId);
      goalDetails.setProgramid(programId);
      
      const request = new UpdateEmotionRequest();
      request.setGoaldetails(goalDetails);
      request.setGoalemotion(goalEmotion);


      // const request = new UpdateRequest();

      // let stringMap = request.getStringfieldstoupdateMap();
      // request.setUsergoalid(goalId);
      // request.setUserid(userId);
      // request.setProgramid(programId);
      // stringMap.set("goalEmotion", goalEmotion);

      const instance = new UpdateUserGoalServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.updateUserGoalEmotion(
        request,
        metadata,
        async (err, response) => {
          try {
            console.log("GOAL_OVERVIEW/UPDATE_USER_GOAL_EMOTION", response, err);
            const parsedResponse = JSON.parse(response);
            //   //@ts-ignore
            console.log(parsedResponse);
            if (parsedResponse?.statusCode === 0) {
              resolve(parsedResponse);
            }
          } catch (error) {
            console.log(error, "GOAL_OVERVIEW/UPDATE_USER_GOAL_EMOTION error");
            reject(error);
          }
        }
      );
      //   return { nWorxUser: user };
    });
  }
);
