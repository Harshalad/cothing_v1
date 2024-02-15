import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchAvailableAssessments = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let availableAssessments: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchAvailableAssessments(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        availableAssessments = parsedResponse?.response;
        console.log(
          "fetchAvailableAssessments request:",
          request,
          "response:",
          response,
          "parsedResponse:",
          availableAssessments
        );
        //@ts-ignore
        resolve({ availableAssessments });
      } catch (error) {
        console.log(error, "fetchAvailableAssessments error");
        reject(error);
      }
    });
    return { availableAssessments };
  });
};
