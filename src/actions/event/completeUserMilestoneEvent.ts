import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { CompleteUserMilestoneEventRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const completeUserMilestoneEvent = async ({ userEventId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new CompleteUserMilestoneEventRequest();
    request.setUsereventid(userEventId);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    console.log("djfkjdsbfkjdsbfkjdsbfkjdsbkjb",request)
    instance.completeUserMilestoneEvent(request, metadata, async (err, response) => {
        console.log("ehsvfjbskfajsakjfvksavfksa")
      try {
        console.log(
          "completeUserMilestoneEvent request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log(
          "completeUserMilestoneEvent paredResponse:",
          parsedResponse
        );
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "completeUserMilestoneEvent error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
