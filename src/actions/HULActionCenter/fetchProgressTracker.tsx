import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchProgressTrackerRequest } from "../../constants/proto/actionCenter/action-center_pb";
import { ActionCenterServiceClient } from "../../constants/proto/actionCenter/action-center_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchProgressTracker = async({ userId, programId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgressTrackerRequest();
    request.setUserid(userId);
    request.setProgramid(programId);
    let details: {} | null = null;
    const instance = new ActionCenterServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchProgressTracker(request, metadata, async (err, response) => {
      try {
        console.log(
          "fetchProgressTracker request:",
          request,
          "fetchProgressTracker response:",
          response
        );
        const parsedResponse = JSON.parse(response);
        details = parsedResponse?.response;
        console.log("fetchProgressTracker parsedResponse: ", details);
        resolve(details);
      } catch (error) {
        console.log("fetchProgressTracker error: ", error);
        reject(error);
      }
    });
    return { details };
  });
};
