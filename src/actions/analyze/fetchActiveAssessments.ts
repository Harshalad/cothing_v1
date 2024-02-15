import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchActiveAssessments = async ({ userId }: any) => {
  const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let activeAssessments: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchActiveAssessments(
      request,
      metadata,
      async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          activeAssessments = parsedResponse?.response;
          console.log("fetchActiveAssessments request:", request, "response:",response);
          //@ts-ignore
          resolve({ activeAssessments: activeAssessments });
        } catch (error) {
          console.log(error, "fetchActiveAssessments error");
          reject(error);
        }
      }
    );
    return { activeAssessments: activeAssessments };
  });
};