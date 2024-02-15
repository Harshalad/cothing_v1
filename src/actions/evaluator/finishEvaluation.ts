import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FinishEvaluationRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const finishEvaluation = async ({ evaluatorUserId, userTestMapId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FinishEvaluationRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    request.setUsertestmapid(userTestMapId);
    let paredResponseTest: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.finishEvaluation(request, metadata, async (err, response) => {
      try {
        console.log("finishEvaluation request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        paredResponseTest = parsedResponse;
        console.log("finishEvaluation paredResponse:", parsedResponse);
        resolve(paredResponseTest);
      } catch (error) {
        console.log(error, "finishEvaluation error");
        reject(error);
      }
    });
    return { paredResponseTest: paredResponseTest };
  });
};
