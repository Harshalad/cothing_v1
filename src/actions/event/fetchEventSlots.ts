import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchEventSlotsRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventSlots = async ({ eventConfigId, userId,eventRole  }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchEventSlotsRequest();
    request.setEventconfigid(eventConfigId);
    request.setUserid(userId);
    request.setEventrole(eventRole);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchEventSlots(request, metadata, async (err, response) => {
      try {
        console.log("fetchEventSlots request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("fetchEventSlots paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchEventSlots error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
