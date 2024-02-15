import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { UpdateUserWorksheetQuickPrepRequest, addRatingToQPWorksheetRequest } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

// service UpdateUserWorksheetService {
// 	rpc saveUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// 	rpc completeUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// }

export const saveSectionQuestionAnswerQuickPrep = async ({
  userId,
  programId,
  goalId,
  milestoneId,
  methodId,
  methodType,
  userWorkSheetId,
  sectionId,
  questionsAnswersArray,
  worksheetId,
  lastQuestionAnsweredIndex,
}: any) => {
  console.log("saveSectionQuestionAnswer : INPUT :  ");

  console.log({
    userId,
    programId,
    goalId,
    milestoneId,
    methodId,
    methodType,
    userWorkSheetId,
    sectionId,
    questionsAnswersArray,
    worksheetId,
    lastQuestionAnsweredIndex,
  });
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserWorksheetQuickPrepRequest();

    let questionMap = request.getQuestionanswermapMap();

    // request.setGoalid(goalId);
    request.setUserid(userId);
    request.setProgramid(programId);
    // request.setMilestoneid(milestoneId);
    // request.setMethodid(methodId);
    // request.setMethodtype(methodType);
    request.setWorksheetid(worksheetId);
    request.setUserworksheetid(userWorkSheetId);
    request.setSectionid(sectionId);
    request.setLastquestionansweredindex(lastQuestionAnsweredIndex);

    questionsAnswersArray.forEach((questionAnswer: any, index: number) => {
      questionMap.set(questionAnswer.question, questionAnswer.answer);
    });

    const instance = new UpdateUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.saveUserWorksheetQuickPrep(request, metadata, async (err, response) => {
      try {
        console.log(
          "PREPARE/SAVE_USER_WORKSHEET_QUESTION_ANSWER",
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
        console.log(error, "PREPARE/SAVE_USER_WORKSHEET_QUESTION_ANSWER error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};


export const addExpertRatingToQPWorksheet = async ({
  uwid,
  qualityRating,
  thoroughnessRating,
  ratedBy,
  ratedByUserName,
  qualityComment,
  thoroughnessComment,
  ratedByRole,
  employeeId,
  employeeProgramId,
  aiRatingId
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new addRatingToQPWorksheetRequest();

    request.setQpuserworksheetid(uwid);
    request.setQualityrating(qualityRating);
    request.setQualitycomment(qualityComment);
    request.setThoroughnessrating(thoroughnessRating);
    request.setThoroughnesscomment(thoroughnessComment);
    request.setRatedby(ratedBy);
    request.setRatedbyusername(ratedByUserName);
    request.setRatedbyrole(ratedByRole);
    request.setUserid(employeeId);
    request.setProgramid(employeeProgramId);
    request.setAiratingid(aiRatingId);
    console.log("addRatingToQPWorksheet",aiRatingId);
	// int32 rating = 1;
	// string ratedBy = 2;
	// string qpUserWorkSheetId = 3;
	// string ratedByUserName = 4;
	// string ratedByRole = 5;
	// int32 qualityRating = 6;
	// int32 thoroughnessRating = 7;
	// string qualityComment = 8;
	// string generalComment = 9;
	// string thoroughnessComment = 10;
	// string userId = 11;
	// string programId = 12;


    const instance = new UpdateUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addRatingToQPWorksheet(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
        console.log("addRatingToQPWorksheet",request,response,err);
      } catch (error) {
        console.log(error, "addRatingToQPWorksheet error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
