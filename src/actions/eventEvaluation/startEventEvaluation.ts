import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { StartEventEvaluationRequest } from "../../constants/proto/eventEvaluation/event-evaluation_pb";
import { EventEvaluationServiceClient } from "../../constants/proto/eventEvaluation/event-evaluation_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const startEventEvaluation = async ({
  participantUserId,
  evaluationTestId,
  userEventId,
  eventSectionId,
  eventMethodId,
  evaluatorUserId
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new StartEventEvaluationRequest();
    request.setParticipantuserid(participantUserId);
    request.setUsereventid(userEventId);
    request.setEventsectionid(eventSectionId);
    request.setEventmethodid(eventMethodId);
    request.setEvaluationtestid(evaluationTestId);
    request.setEvaluatoruserid(evaluatorUserId);
    let eventEvaluationDetails: {} | null = null;
    const instance = new EventEvaluationServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.startEventEvaluation(request, metadata, async (err, response) => {
      try {
        console.log(
          "startEventEvaluation request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventEvaluationDetails = parsedResponse;
        console.log("startEventEvaluation paredResponse:", parsedResponse);
        resolve(eventEvaluationDetails);
      } catch (error) {
        console.log(error, "startEventEvaluation error");
        reject(error);
      }
    });
    return { eventEvaluationDetails: eventEvaluationDetails };
  });
};
