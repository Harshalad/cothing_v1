import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchEventListRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventList = async ({ userId, userName }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchEventListRequest();
    request.setUserid(userId);
    request.setUsername(userName);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.fetchEventList(request, metadata, async (err, response) => {
      try {
        console.log("fetchEventList request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("fetchEventList paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchEventList error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
