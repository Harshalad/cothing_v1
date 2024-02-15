import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { EvaluateAnswerRequest } from "../../constants/proto/evaluator/evaluator_pb";
import { EvaluatorServiceClient } from "../../constants/proto/evaluator/evaluator_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const evaluateAnswer = async ({
  evaluatorUserId,
  userTestMapId,
  notes,
  correct,
  marksScored,
  answerId,
  evaluationType,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new EvaluateAnswerRequest();
    request.setEvaluatoruserid(evaluatorUserId);
    request.setNote(notes);
    request.setCorrect(correct);
    request.setMarksscored(marksScored);
    request.setEvaluationtype(evaluationType);
    request.setAnswerid(answerId);
    request.setUsertestmapid(userTestMapId);


    let paresedResp: {} | null = null;
    const instance = new EvaluatorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.evaluateAnswer(request, metadata, async (err, response) => {
      try {
        console.log("evaluateAnswer request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        paresedResp = parsedResponse;
        console.log("evaluateAnswer paredResponse:", parsedResponse);
        resolve(paresedResp);
      } catch (error) {
        console.log(error, "evaluateAnswer error");
        reject(error);
      }
    });
    return { paresedResp: paresedResp };
  });
};
