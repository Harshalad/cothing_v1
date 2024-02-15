import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {FetchUserEventIdRequest,GoalDetail,
} from "../../constants/proto/event/event_pb";
import  { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchUserEventId = async ({
  eventConfigId,
  programId,
  goalId,
  milestoneId,
  methodId,
  userId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchUserEventIdRequest();
    const goalDetail = new GoalDetail();
    request.setEventconfigid(eventConfigId);
    goalDetail.setUserid(userId);
    goalDetail.setProgramid(programId);
    goalDetail.setUsergoalid(goalId);
    goalDetail.setMilestoneid(milestoneId);
    goalDetail.setMethodid(methodId);
    request.setGoaldetails(goalDetail);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchUserEventId(request, metadata, async (err, response) => {
      try {
        console.log("fetchUserEventId request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("fetchUserEventId paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchUserEventId error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
