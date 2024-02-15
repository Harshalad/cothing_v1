import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchActiveGiveMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let activeGiveMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchActiveGiveMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        activeGiveMRA = parsedResponse?.response;
        console.log(
          "fetchActiveGiveMRA request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ activeGiveMRA });
      } catch (error) {
        console.log(error, "fetchActiveGiveMRA error");
        reject(error);
      }
    });
    return { activeGiveMRA };
  });
};
