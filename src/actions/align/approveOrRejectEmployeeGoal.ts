import {createAsyncThunk} from "@reduxjs/toolkit";
//@ts-ignore
import {UpdateGoalRequest,UpdateApproveOrRejectRequest,CustomQuestion,Tag} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"
// import { UpdateUserProgramServiceClient } from "../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
// //@ts-ignore
// import { UpdateRequest } from "../../constants/proto/updateUserProgram/update-user-program_pb";
import {NWORX_GRPC_HOSTNAME} from "../../constants/constants";
import {fetchToken} from "../auth/token";
export const approveOrRejectEmployeeGoal=async ({
  isApproved,
  employeeId,
  employeeProgramId,
  employeeGoalId,
  managerName,
  customQuestionsObj
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve,reject) => {
    const goalDetails=new UpdateGoalRequest();
    goalDetails.setUsergoalid(employeeGoalId);
    goalDetails.setUserid(employeeId);
    goalDetails.setProgramid(employeeProgramId);

    const request=new UpdateApproveOrRejectRequest();
    request.setGoaldetails(goalDetails);
    request.setStatus(isApproved? "APPROVED":"REJECTED");
    request.setApprovedby(managerName);
    console.log(customQuestionsObj,"customQuestionsObj");
    let questionAnswer=request.getQuestionanswerList();
    customQuestionsObj?.map((questionObj: any,index: number) => {
      const customQuestion=new CustomQuestion();
      customQuestion.setQuestion(questionObj?.question);
      customQuestion.setRegular(questionObj?.regular);
      customQuestion.setMandatory(questionObj?.mandatory);
      customQuestion.setType(questionObj?.type);
      customQuestion.setOrder(questionObj?.order);
      customQuestion.setAnswer(questionObj?.answer);
      let selectedTags=customQuestion.getSelectedtagsList();
      for(let i=0;i<questionObj?.selectedTags?.length;i++) {
        selectedTags.push(questionObj?.selectedTags[i]);
      }
      let tags=customQuestion.getTagsList();
      for(let i=0;i<questionObj?.tags?.length;i++) {
        let obj=questionObj?.tags[i];
        const tag=new Tag();
        tag.setTitle(obj?.title);
        tag.setDescription(obj?.description);
        tag.setOrder(obj?.order);
        tags.push(tag);
      }
      questionAnswer.push(customQuestion);
    })
    // const request = new UpdateRequest();

    // let boolMap = request.getBoolfieldstoupdateMap();
    // let stringArrayMap = request.getStringarrayfieldstoupdateMap();
    // let stringMapMap = request.getStringmapfieldstoupdateMap();
    // let stringDateMap = request.getDatetimefieldstoupdateMap();
    // let stringIntMap = request.getIntfieldstoupdateMap();
    // let stringMap = request.getStringfieldstoupdateMap();

    // request.setUsergoalid(employeeGoalId);
    // request.setUserid(employeeId);
    // request.setProgramid(employeeProgramId);

    // stringMap.set("status", isApproved ? "APPROVED" : "REJECTED");

    // // if (status === "ASSIGNED") {
    // //   stringMap.set("assignedByUserId", userId);
    // stringMap.set("approvedBy", managerName);
    // // }

    const instance=new UpdateUserGoalServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.approveOrRejectEmployeeGoal(request,metadata,async (err,response) => {
      try {
        console.log("ALIGN/UPDATE_USER_GOAL_PURPOSES",response,err);
        const parsedResponse=JSON.parse(response);
        //   //@ts-ignore
        if(parsedResponse?.statusCode===0) {
          resolve(parsedResponse);
        }
      } catch(error) {
        console.log(error,"ALIGN/UPDATE_USER_GOAL_PURPOSES error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
