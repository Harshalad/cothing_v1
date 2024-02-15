import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchEventEvaluationDetailsRequest } from "../../constants/proto/eventEvaluation/event-evaluation_pb";
import { EventEvaluationServiceClient } from "../../constants/proto/eventEvaluation/event-evaluation_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventEvaluationDetails = async ({
  userEventId,
  eventSectionId,
  eventMethodId,
  evaluationTestId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchEventEvaluationDetailsRequest();
    request.setUsereventid(userEventId);
    request.setEventsectionid(eventSectionId);
    request.setEventmethodid(eventMethodId);
    request.setEvaluationtestid(evaluationTestId);
    let eventEvaluationDetails: {} | null = null;
    const instance = new EventEvaluationServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchEventEvaluationDetails(request, metadata, async (err, response) => {
      try {
        console.log(
          "fetchEventEvaluationDetails request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventEvaluationDetails = parsedResponse;
        console.log(
          "fetchEventEvaluationDetails paredResponse:",
          parsedResponse
        );
        resolve(eventEvaluationDetails);
      } catch (error) {
        console.log(error, "fetchEventEvaluationDetails error");
        reject(error);
      }
    });
    return { eventEvaluationDetails: eventEvaluationDetails };
  });
};
