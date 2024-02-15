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


export const saveUserWorksheet = async ({
  userId,
  programId,
  goalId,
  milestoneId,
  methodId,
  methodType,
  userWorkSheetId,
  userWorksheetJson,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserWorksheetRequest();
    
      request.setGoalid(goalId);
      request.setUserid(userId);
      request.setProgramid(programId);
      request.setMilestoneid(milestoneId);
      request.setMethodid(methodId);
      request.setMethodtype(methodType);
      request.setUserworksheetid(userWorkSheetId);
      request.setUserworksheetjson(userWorksheetJson);

      const instance = new UpdateUserWorksheetServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.saveUserWorksheet(request,metadata, async (err, response) => {
        try {
          console.log("PREPARE/SAVE_USER_WORKSHEET", response, err);
          const parsedResponse = JSON.parse(response);
          //   //@ts-ignore
          console.log(parsedResponse);
          if (parsedResponse?.statusCode === 0) {
            resolve(parsedResponse);
          }
        } catch (error) {
          console.log(error, "PREPARE/SAVE_USER_WORKSHEET error");
          reject(error);
        }
      });
      //   return { nWorxUser: user };
    });

};
