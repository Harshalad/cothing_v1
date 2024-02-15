import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { StartEvaluationRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const startEvaluation = async ({ evaluatorUserId, userTestMapId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new StartEvaluationRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    request.setUsertestmapid(userTestMapId);
    let completedTest: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.startEvaluation(request, metadata, async (err, response) => {
      try {
        console.log("startEvaluation request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        completedTest = parsedResponse;
        console.log("startEvaluation paredResponse:", parsedResponse);
        resolve(completedTest);
      } catch (error) {
        console.log(error, "startEvaluation error");
        reject(error);
      }
    });
    return { completedTest: completedTest };
  });
};
