import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnalyseRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchCompletedSeekMRA = async ({ userId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchAnalyseRequest();
    request.setUserid(userId);

    let completedSeekMRA: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchCompletedSeekMRA(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        completedSeekMRA = parsedResponse?.response;
        console.log(
          "fetchCompletedSeekMRA request:",
          request,
          "response:",
          response
        );
        //@ts-ignore
        resolve({ completedSeekMRA });
      } catch (error) {
        console.log(error, "fetchCompletedSeekMRA error");
        reject(error);
      }
    });
    return { completedSeekMRA };
  });
};
