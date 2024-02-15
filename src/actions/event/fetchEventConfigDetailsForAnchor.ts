import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchEventConfigDetailsForAnchorRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventConfigDetailsForAnchor = async ({
  eventConfigId,
  anchorUserId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchEventConfigDetailsForAnchorRequest();
    request.setAnchoruserid(anchorUserId);
    request.setEventconfigid(eventConfigId);

    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.fetchEventConfigDetailsForAnchor(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "fetchEventConfigDetailsForAnchor request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          eventDetails = parsedResponse;
          console.log(
            "fetchEventConfigDetailsForAnchor paredResponse:",
            parsedResponse
          );
          resolve(eventDetails);
        } catch (error) {
          console.log(error, "fetchEventConfigDetailsForAnchor error");
          reject(error);
        }
      }
    );
    return { eventDetails: eventDetails };
  });
};
