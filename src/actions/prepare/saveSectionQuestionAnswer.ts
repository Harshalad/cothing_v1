import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserWorksheetServiceClient } from "../../constants/proto/updateUserWorksheet/update-user-work-sheet_grpc_web_pb";
//@ts-ignore
import { UpdateUserWorksheetRequest } from "../../constants/proto/updateUserWorksheet/update-user-work-sheet_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

// service UpdateUserWorksheetService {
// 	rpc saveUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// 	rpc completeUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// }

export const saveSectionQuestionAnswer = async ({
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
    const request = new UpdateUserWorksheetRequest();

    let questionMap = request.getQuestionanswermapMap();

    request.setGoalid(goalId);
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setMilestoneid(milestoneId);
    request.setMethodid(methodId);
    request.setMethodtype(methodType);
    request.setWorksheetid(worksheetId);
    request.setUserworksheetid(userWorkSheetId);
    request.setSectionid(sectionId);
    request.setLastquestionansweredindex(lastQuestionAnsweredIndex);

    questionsAnswersArray.forEach((questionAnswer: any, index: number) => {

      questionMap.set(questionAnswer.question, questionAnswer.answer);
    });

    const instance = new UpdateUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    console.log("questionMap 123458", questionMap);

    console.log("save question answer 123458", request.getQuestionanswermapMap());

    instance.saveSectionQuestionAnswer(request, metadata, async (err, response) => {
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
