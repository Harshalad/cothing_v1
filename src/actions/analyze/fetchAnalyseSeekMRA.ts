import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchAnalyseSeekMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let analyzeSeekMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchAnalyseSeekMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        analyzeSeekMRA = parsedResponse?.response;
        console.log(
          "fetchAnalyseSeekMRA request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ analyzeSeekMRA: analyzeSeekMRA });
      } catch (error) {
        console.log(error, "fetchAnalyseSeekMRA error");
        reject(error);
      }
    });
    return { analyzeSeekMRA: analyzeSeekMRA };
  });
};
