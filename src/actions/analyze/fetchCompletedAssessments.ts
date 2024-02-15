import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchCompletedAssessments = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let completedAssessments: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchCompletedAssessments(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        completedAssessments = parsedResponse?.response;
        console.log(
          "fetchCompletedAssessments request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ completedAssessments });
      } catch (error) {
        console.log(error, "fetchCompletedAssessments error");
        reject(error);
      }
    });
    return { completedAssessments };
  });
};
