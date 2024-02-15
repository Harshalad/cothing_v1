import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {FetchTestOfEvaluatorRequest} from "../../constants/proto/evaluator/evaluator_pb";
import {EvaluatorServiceClient} from "../../constants/proto/evaluator/evaluator_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const fetchPendingTestEvaluation = async ({ evaluatorUserId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchTestOfEvaluatorRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    let completedTest: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchPendingTestEvaluation(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "fetchPendingTestEvaluation request:",
            request,
            "response",
            response
          );
          const parsedResponse = JSON.parse(response);
          completedTest = parsedResponse;
          console.log(
            "fetchPendingTestEvaluation paredResponse:",
            parsedResponse
          );
          resolve(completedTest);
        } catch (error) {
          console.log(error, "fetchPendingTestEvaluation error");
          reject(error);
        }
      }
    );
    return { completedTest: completedTest };
  });
};