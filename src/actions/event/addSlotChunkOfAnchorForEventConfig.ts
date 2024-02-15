import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { AddSlotChunkOfAnchorForEventConfigRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const addSlotChunkOfAnchorForEventConfig = async ({
  eventConfigId,
  anchorUserId,
  chunkStartDate,
  chunkEndDate,
  singleSlot,
  eventRole,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new AddSlotChunkOfAnchorForEventConfigRequest();
    request.setAnchoruserid(anchorUserId);
    request.setSingleslot(singleSlot);
    request.setEventconfigid(eventConfigId);
    request.setChunkstartdate(new Date(chunkStartDate).getTime());
    request.setChunkenddate(new Date(chunkEndDate).getTime());
    request.setEventrole(eventRole);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.addSlotChunkOfAnchorForEventConfig(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "addSlotChunkOfAnchorForEventConfig request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          eventDetails = parsedResponse;
          console.log(
            "addSlotChunkOfAnchorForEventConfig paredResponse:",
            parsedResponse
          );
          resolve(eventDetails);
        } catch (error) {
          console.log(error, "addSlotChunkOfAnchorForEventConfig error");
          reject(error);
        }
      }
    );
    // return { eventDetails: eventDetails };
  });
};
