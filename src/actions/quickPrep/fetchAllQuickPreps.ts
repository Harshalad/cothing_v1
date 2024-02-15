import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { FetchUserWorksheetQuickPrepRequest } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_pb";
import { fetchToken } from "../auth/token";

export const fetchAllQuickPreps = async ({ userId, programId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserWorksheetQuickPrepRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    request.setUserid(userId);
    let allQuickPreps: {} | null = null;

    const instance = new FetchUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    console.log(request, "request");

    instance.fetchAllUserWorksheetQuickPrep(
      request,
      metadata,
      async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          console.log(parsedResponse);
          allQuickPreps = parsedResponse?.response;
          console.log("fetchAllUserWorksheetQuickPrep",request,response,err);
          //@ts-ignore
          resolve(allQuickPreps);
        } catch (error) {
          console.log(error, " error");
          reject(error);
        }
      }
    );
    return { allQuickPreps: allQuickPreps };
  });
};
