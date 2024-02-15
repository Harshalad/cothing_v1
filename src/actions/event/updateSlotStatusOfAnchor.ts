import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";

import {
  //@ts-ignore
  UpdateSlotStatusOfAnchorRequest,
  //@ts-ignore
  SlotStatusRequest,
} from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateSlotStatusOfAnchor = async ({
  eventConfigId,
  anchorUserId,
  slotChunkId,
  slots,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new UpdateSlotStatusOfAnchorRequest();
    request.setAnchoruserid(anchorUserId);
    request.setEventconfigid(eventConfigId);
    request.setSlotchunkid(slotChunkId);
    let slotOptions = request.getSlotstatusList();
    // Array.from(value.slots).map(([index, slot]): any =>{
    //@ts-ignore
    Array.from(slots).map(([index, slot]): any => {
      // if (slot?.status !== "ADDED") {
        const slotOption = new SlotStatusRequest();
        slotOption.setSlotid(slot);
        // slotOption.setStatus(slot?.status);
        slotOptions.push(slotOption);
      // }
    });
    console.log(slotOptions, "slotsoptions");
    // })
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.updateSlotStatusOfAnchor(request, metadata, async (err, response) => {
      try {
        console.log(
          "updateSlotStatusOfAnchor request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log("updateSlotStatusOfAnchor paredResponse:", parsedResponse);
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchEventConfigDetailsForAnchor error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
