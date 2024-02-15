import { UpdateUserWorksheetServiceClient } from "../../constants/proto/updateUserWorksheet/update-user-work-sheet_grpc_web_pb";
//@ts-ignore
import { UpdateUserWorksheetRequest } from "../../constants/proto/updateUserWorksheet/update-user-work-sheet_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const completeUserWorksheet = async ({ uwid }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserWorksheetRequest();

    request.setUserworksheetid(uwid);

    console.log("REQUEST PREPARE/COMPLETE_USER_WORKSHEET", uwid);

    console.log("REQUEST PREPARE/COMPLETE_USER_WORKSHEET", request);

    const instance = new UpdateUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.completeUserWorksheet(request, metadata, async (err, response) => {
      try {
        console.log("PREPARE/COMPLETE_USER_WORKSHEET", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "PREPARE/COMPLETE_USER_WORKSHEET error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
