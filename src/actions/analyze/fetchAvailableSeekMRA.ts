import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchAvailableSeekMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let availableSeekMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchAvailableSeekMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        availableSeekMRA = parsedResponse?.response;
        console.log(
          "fetchAvailableSeekMRA request:",
          request,
          "response:",
          response,
          "parsedResponse:",
          availableSeekMRA
        );
        //@ts-ignore
        resolve({ availableSeekMRA });
      } catch (error) {
        console.log(error, "fetchAvailableSeekMRA error");
        reject(error);
      }
    });
    return { availableSeekMRA };
  });
};
