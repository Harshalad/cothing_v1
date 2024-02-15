import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {SubmitAnswerRequest,File} from "../../../src/constants/proto/assessment/assessment_pb";
import { AssessmentServiceClient } from "../../../src/constants/proto/assessment/assessment_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const submitTestAnswer = async ({
  userTestMapId,
  sectionId,
  caseId,
  questionId,
  answer,
  answerOption,
  questionType,
  fileName,
  fileExtension,
  fileInBytes,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new SubmitAnswerRequest();
    request.setUsertestmapid(userTestMapId);
    request.setSectionid(sectionId);
    request.setCaseid(caseId);
    request.setQuestionid(questionId);
    request.setAnswer(answer);
    let answerOptionList = request.getAnsweroptionList();
    for (let i = 0; i < answerOption?.length; i++) {
      answerOptionList.push(parseInt(answerOption[i]));
    }
    console.log(answerOptionList, "answerOptionList");
    request.setQuestiontype(questionType);
    
    const file = new File();
    file.setContenttype(fileExtension);
    file.setContent(fileInBytes);
    file.setName(fileName);
    request.setFiledetails(file);

    const instance = new AssessmentServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.submitAnswer(request, metadata, async (err, response) => {
      try {
        console.log("submitAnswer request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        //@ts-ignore
        console.log("submitAnswer Parsed Response", parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "Submit Answer details error");
        reject(error);
      }
    });
  });
};
