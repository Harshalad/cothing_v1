import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchAnswersForEvaluationRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchAnswersForEvaluation = async ({
  evaluatorUserId,
  userTestMapId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchAnswersForEvaluationRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    request.setUsertestmapid(userTestMapId);
    let testDeatils: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchAnswersForEvaluation(request, metadata, async (err, response) => {
      try {
        console.log(
          "fetchAnswersForEvaluation request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        testDeatils = parsedResponse;
        console.log("fetchAnswersForEvaluation paredResponse:", parsedResponse);
        resolve(testDeatils);
      } catch (error) {
        console.log(error, "fetchAnswersForEvaluation error");
        reject(error);
      }
    });
    return { testDeatils: testDeatils };
  });
};
