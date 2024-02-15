import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import {UpdateUserWorksheetQuickPrepRequest,UpdateEventRequest,UpdateUserWorksheetEventRequest,
} from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

// service UpdateUserWorksheetService {
// 	rpc saveUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// 	rpc completeUserWorksheet (UpdateUserWorksheetRequest) returns
// 	(ai.nworx.api.proto.common.ResponseProto);
// }

export const saveUserWorksheetEvent = async ({
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
  userEventId,
  eventSectionId,
  eventMethodId,
}: any) => {
  const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const quickPrepDetails = new UpdateUserWorksheetQuickPrepRequest();

    let questionMap = quickPrepDetails.getQuestionanswermapMap();
    console.log(
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
      "aditya123"
    );
    // request.setGoalid(goalId);
    quickPrepDetails.setUserid(userId);
    quickPrepDetails.setProgramid(programId);
    // request.setMilestoneid(milestoneId);
    // request.setMethodid(methodId);
    // request.setMethodtype(methodType);
    quickPrepDetails.setWorksheetid(worksheetId);
    quickPrepDetails.setUserworksheetid(userWorkSheetId);
    quickPrepDetails.setSectionid(sectionId);
    quickPrepDetails.setLastquestionansweredindex(lastQuestionAnsweredIndex);
    const eventDetails = new UpdateEventRequest();
    eventDetails.setUsereventid(userEventId);
    eventDetails.setEventmethodid(eventMethodId);
    eventDetails.setEventsectionid(eventSectionId);

    const request = new UpdateUserWorksheetEventRequest();
    request.setQuickprepdetails(quickPrepDetails);
    request.setEventdetails(eventDetails);
    questionsAnswersArray?.forEach((questionAnswer: any, index: number) => {
      questionMap.set(questionAnswer.question, questionAnswer.answer);
    });

    const instance = new UpdateUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.saveUserWorksheetEvent(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "saveUserWorksheetEvent Request",
            request,
            "Response",
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
          console.log(error, "saveUserWorksheetEvent error");
          reject(error);
        }
      }
    );
    //   return { nWorxUser: user };
  });
};
