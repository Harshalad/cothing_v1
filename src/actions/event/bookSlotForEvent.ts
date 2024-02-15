import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {BookSlotForEventRequest,GoalDetail} from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const bookSlotForEvent = async ({
  anchorUserId,
  slotId,
  eventRole,
  userId,
  eventConfigId,
  programId,
  goalId,
  milestoneId,
  methodId
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new BookSlotForEventRequest();
    const goalDetail = new GoalDetail();
    request.setAnchoruserid(anchorUserId);
    request.setSlotid(slotId);
    request.setUserid(userId);
    request.setEventrole(eventRole);
    request.setEventconfigid(eventConfigId);
    goalDetail.setUserid(userId);
    goalDetail.setProgramid(programId);
    goalDetail.setUsergoalid(goalId);
    goalDetail.setMilestoneid(milestoneId);
    goalDetail.setMethodid(methodId);
    request.setGoaldetails(goalDetail);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.bookSlotForEvent(request, metadata, async (err, response) => {
      try {
        console.log("bookSlotForEvent request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("bookSlotForEvent paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "bookSlotForEvent error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
