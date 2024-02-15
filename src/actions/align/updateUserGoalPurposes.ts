import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";
//@ts-ignore
import {UpdateGoalRequest, UpdatePurposeRequest } from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"
import { valueOrDefault } from "chart.js/dist/helpers/helpers.core";

export const updateUserGoalPurposes = async ({
  goalPurposes,
  goalBenefits,
  purposeQuestionAnswerMap,
  userId,
  programId,
  goalId,
  topPriority,
  startDate,
  durationInDays,
  goalTitle,
  goalDescription,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const goalDetails = new UpdateGoalRequest();
    goalDetails.setUsergoalid(goalId);
    goalDetails.setUserid(userId);
    goalDetails.setProgramid(programId);
    const request = new UpdatePurposeRequest();
    request.setGoaldetails(goalDetails);
    request.setPurposestatus(true);
    request.setToppriority(topPriority);
    let selectedPurposes = request.getSelectedpurposesList();
    for (let i = 0; i < goalPurposes.length; i++) {
      selectedPurposes.push(goalPurposes[i]);
    }
    let selectedBenefits = request.getSelectedbenefitsList();
    for (let i = 0; i < goalBenefits.length;i++){
      selectedBenefits.push(goalBenefits[i]);
    }
    let purposeQuestionAnswerMapCpy = request.getPurposequestionanswerMap();
    Object.entries(purposeQuestionAnswerMap).forEach(
      (attribute: any, index: number) => {
        console.log(attribute, "loop attriute");
        purposeQuestionAnswerMapCpy.set(attribute[0], attribute[1]);
      }
    );
    console.log(purposeQuestionAnswerMapCpy, "purposeQuestionAnswerMapCpy");
    // request.setSelectedpurposes(goalPurposes);
    // request.setSelectedbenefits(goalBenefits);
    // request.setPurposequestionanswer(purposeQuestionAnswerMap);
    request.setStartdate(startDate);
    request.setDurationindays(durationInDays);
    request.setNamealias(goalTitle);
    request.setDescriptionalias(goalDescription);
     
    // const request = new UpdateRequest();

    // let boolMap = request.getBoolfieldstoupdateMap();
    // let stringArrayMap = request.getStringarrayfieldstoupdateMap();
    // let stringMapMap = request.getStringmapfieldstoupdateMap();
    // // let stringDateMap = request.getDatetimefieldstoupdateMap();
    // let stringIntMap = request.getIntfieldstoupdateMap();
    // let stringMap = request.getStringfieldstoupdateMap();

    // boolMap.set("purposeStatus", true);
    // console.log("start date", startDate);
    // request.setUsergoalid(goalId);
    // request.setUserid(userId);
    // request.setProgramid(programId);
    // stringArrayMap.set("selectedPurposes", goalPurposes);
    // stringArrayMap.set("selectedBenefits", goalBenefits);
    // stringMapMap.set("purposeQuestionAnswer", purposeQuestionAnswerMap);
    // boolMap.set("topPriority", topPriority);
    // console.log("before");
    // //@ts-ignore
    // // const date = new proto.google.protobuf.Timestamp();
    // // console.log(date, "date in action call");
    // // date.fromDate(new Date(startDate));
    // console.log(stringIntMap);
    // console.log(startDate, " startDate ");
    // stringIntMap.set("startDate", startDate);

    // // stringDateMap.set("startDate", date);
    // stringIntMap.set("durationInDays", durationInDays);

    // if (goalTitle) {
    //   stringMap.set("nameAlias", goalTitle);
    // }
    // if (goalDescription) {
    //   stringMap.set("descriptionAlias", goalDescription);
    // }

    const instance = new UpdateUserGoalServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.updateUserGoalPurposes(request, metadata, async (err, response) => {
      try {
        console.log("ALIGN/UPDATE_USER_GOAL_PURPOSES", response, request);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
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
