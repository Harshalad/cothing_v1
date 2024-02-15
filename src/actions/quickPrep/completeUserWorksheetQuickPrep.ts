import { UpdateUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { UpdateUserWorksheetQuickPrepRequest } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const completeUserWorksheetQuickPrep = async ({ uwid,userId,programId }: any) => {
  const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserWorksheetQuickPrepRequest();

    request.setUserworksheetid(uwid);
    request.setUserid(userId);
    request.setProgramid(programId);

    console.log("REQUEST PREPARE/COMPLETE_USER_WORKSHEET_qp", uwid);

    console.log("REQUEST PREPARE/COMPLETE_USER_WORKSHEET_qp", request);

    const instance = new UpdateUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.completeUserWorksheetQuickPrep(request, metadata, async (err, response) => {
      try {
        console.log("PREPARE/COMPLETE_USER_WORKSHEET_qp", response, request);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse,"qpParsedResponse");
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "PREPARE/COMPLETE_USER_WORKSHEET_qp error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
