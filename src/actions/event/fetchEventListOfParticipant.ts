import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAllEventConfigOfParticipantRequest } from "../../constants/proto/event/event_pb";
import { EventServiceClient } from "../../constants/proto/event/event_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventListOfParticipant = async ({
  participantUserName,
  participantUserId,
  participantRole,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchAllEventConfigOfParticipantRequest();
    request.setParticipantrole(participantRole);
    request.setParticipantuserid(participantUserId);
    request.setParticipantusername(participantUserName);
    let eventDetails: {} | null = null;
    const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null, null);

    instance.fetchEventListOfParticipant(request, metadata, async (err, response) => {
      try {
        console.log(
          "fetchEventListOfParticipant request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventDetails = parsedResponse;
        console.log(
          "fetchEventListOfParticipant paredResponse:",
          parsedResponse
        );
        resolve(eventDetails);
      } catch (error) {
        console.log(error, "fetchEventListOfParticipant error");
        reject(error);
      }
    });
    return { eventDetails: eventDetails };
  });
};
