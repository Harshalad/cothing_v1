import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchTestOfEvaluatorRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchInProgressTestEvaluation = async ({ evaluatorUserId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchTestOfEvaluatorRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    let inProgressTest: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchInProgressTestEvaluation(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "fetchInProgressTestEvaluation request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          inProgressTest = parsedResponse;
          console.log(
            "fetchInProgressTestEvaluation paredResponse:",
            parsedResponse
          );
          resolve(inProgressTest);
        } catch (error) {
          console.log(error, "fetchInProgressTestEvaluation error");
          reject(error);
        }
      }
    );
    return { inProgressTest: inProgressTest };
  });
};
