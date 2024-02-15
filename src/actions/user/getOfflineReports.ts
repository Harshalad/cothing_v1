import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchUserAssess2ReportsServiceClient } from "../../constants/proto/fetchUserAssessReports/fetch-user-assess2-reports_grpc_web_pb";
//@ts-ignore
import { FetchUserAssess2ReportsRequest } from "../../constants/proto/fetchUserAssessReports/fetch-user-assess2-reports_pb";
import { fetchToken } from "../auth/token";

export const getOfflineReports = async ({ programId, userId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserAssess2ReportsRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    request.setUserid(userId);

    console.log(request, programId, userId);

    let offlineReports: {} | null = null;

    const instance = new FetchUserAssess2ReportsServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchOfflineReports(request, metadata, async (err, response) => {
      console.log(err, response,request,"FetchUserAssess2ReportsRequest");
      try {
        if (response) {
          const parsedResponse = JSON.parse(response);
          console.log(parsedResponse);
          offlineReports = parsedResponse?.response;
          //@ts-ignore
          resolve({ offlineReports: offlineReports });
        }
      } catch (error) {
        console.log(error, " error");
        reject(error);
      }
    });
    return { offlineReports: offlineReports };
  });
};
