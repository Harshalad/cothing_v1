import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchEventQuestionsForEvaluationRequest } from "../../constants/proto/eventEvaluation/event-evaluation_pb";
import { EventEvaluationServiceClient } from "../../constants/proto/eventEvaluation/event-evaluation_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchEventQuestionsForEvaluation = async ({ userTestMapId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchEventQuestionsForEvaluationRequest();
    request.setUsertestmapid(userTestMapId);
    let eventEvaluationDetails: {} | null = null;
    const instance = new EventEvaluationServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchEventQuestionsForEvaluation(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "fetchEventQuestionsForEvaluation request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          eventEvaluationDetails = parsedResponse;
          console.log(
            "fetchEventQuestionsForEvaluation paredResponse:",
            parsedResponse
          );
          resolve(eventEvaluationDetails);
        } catch (error) {
          console.log(error, "fetchEventQuestionsForEvaluation error");
          reject(error);
        }
      }
    );
    return { eventEvaluationDetails: eventEvaluationDetails };
  });
};
