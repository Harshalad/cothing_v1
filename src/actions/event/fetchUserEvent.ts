import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchUserEventRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchUserEvent = async ({
  userEventId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchUserEventRequest();
    request.setUsereventid(userEventId);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchUserEvent(request, metadata, async (err, response) => {
      try {
        console.log("fetchUserEvent request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("fetchUserEvent paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchUserEvent error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
