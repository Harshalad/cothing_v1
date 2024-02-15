import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { SaveEventEvaluationAnswerRequest } from "../../constants/proto/eventEvaluation/event-evaluation_pb";
import { EventEvaluationServiceClient } from "../../constants/proto/eventEvaluation/event-evaluation_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const saveEventEvaluationAnswer = async ({
  userTestMapId,
  sectionId,
  caseId,
  questionId,
  answer,
  answerOption,
  questionType,
  centralNote,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new SaveEventEvaluationAnswerRequest();
    request.setUsertestmapid(userTestMapId);
    request.setSectionid(sectionId);
    request.setCaseid(caseId);
    request.setQuestionid(questionId);
    request.setAnswer(answer);
    let answerOptionList = request.getAnsweroptionList();
    for (let i = 0; i < answerOption?.length; i++) {
      answerOptionList.push(parseInt(answerOption[i]));
    }
    // request.setSectionid(answerOption);
    request.setQuestiontype(questionType);
    request.setCentralnote(centralNote);
    
    let eventEvaluationDetails: {} | null = null;
    const instance = new EventEvaluationServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.saveEventEvaluationAnswer(request, metadata, async (err, response) => {
      try {
        console.log(
          "saveEventEvaluationAnswer request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        eventEvaluationDetails = parsedResponse;
        console.log("saveEventEvaluationAnswer paredResponse:", parsedResponse);
        resolve(eventEvaluationDetails);
      } catch (error) {
        console.log(error, "saveEventEvaluationAnswer error");
        reject(error);
      }
    });
    return { eventEvaluationDetails: eventEvaluationDetails };
  });
};
