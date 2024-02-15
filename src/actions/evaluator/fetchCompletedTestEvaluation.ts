import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchTestOfEvaluatorRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchCompletedTestEvaluation = async ({ evaluatorUserId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchTestOfEvaluatorRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    let pendingTest: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchCompletedTestEvaluation(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "fetchCompletedTestEvaluation request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          pendingTest = parsedResponse;
          console.log(
            "fetchCompletedTestEvaluation paredResponse:",
            parsedResponse
          );
          resolve(pendingTest);
        } catch (error) {
          console.log(error, "fetchCompletedTestEvaluation error");
          reject(error);
        }
      }
    );
    return { pendingTest: pendingTest };
  });
};
