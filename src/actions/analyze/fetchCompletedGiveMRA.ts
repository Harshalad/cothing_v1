import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchCompletedGiveMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let completedGiveMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchCompletedGiveMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        completedGiveMRA = parsedResponse?.response;
        console.log(
          "fetchCompletedGiveMRA request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ completedGiveMRA });
      } catch (error) {
        console.log(error, "fetchCompletedGiveMRA error");
        reject(error);
      }
    });
    return { completedGiveMRA };
  });
};
