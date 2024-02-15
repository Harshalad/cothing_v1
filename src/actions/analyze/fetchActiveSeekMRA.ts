import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchActiveSeekMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let activeSeekMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchActiveSeekMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        activeSeekMRA = parsedResponse?.response;
        console.log(
          "fetchActiveSeekMRA request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ activeSeekMRA });
      } catch (error) {
        console.log(error, "fetchActiveSeekMRA error");
        reject(error);
      }
    });
    return { activeSeekMRA };
  });
};
