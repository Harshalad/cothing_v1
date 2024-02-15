import { createAsyncThunk } from "@reduxjs/toolkit";
//@ts-ignore
import {UpdateGoalRequest, UpdateAlignQuestionRequest} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"

import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const updateUserGoalAlignQuestions = async ({
  answer1,
  answer2,
  answer3,
  userId,
  programId,
  goalId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const goalDetails = new UpdateGoalRequest();
    goalDetails.setUsergoalid(goalId);
    goalDetails.setUserid(userId);
    goalDetails.setProgramid(programId);
    
    const request = new UpdateAlignQuestionRequest();
    request.setGoaldetails(goalDetails);
    request.setAnswer1(answer1);
    request.setAnswer2(answer2);
    request.setAnswer3(answer3);
    // const request = new UpdateRequest();
    // console.log(answer1, answer2, answer3, "ANSWERSS");
    // let stringMap = request.getStringfieldstoupdateMap();
    // request.setUsergoalid(goalId);

    // request.setUserid(userId);
    // request.setProgramid(programId);

    // stringMap.set("answer1", answer1);
    // stringMap.set("answer2", answer2);
    // stringMap.set("answer3", answer3);
    // stringMap.set("status", "ALIGNED");

    const instance = new UpdateUserGoalServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    // console.log(request, "REQUEST");
    instance.updateUserGoalAlignQuestions(request, metadata, async (err, response) => {
      try {
        console.log("ALIGN/UPDATE_USER_GOAL_PURPOSES", request, response);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
        if (parsedResponse?.statusCode === 2) {
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
