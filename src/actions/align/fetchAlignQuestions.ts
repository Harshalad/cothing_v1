import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchAlignQuestionRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchAlignQuestions = async ({ programId, type }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchAlignQuestionRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    request.setType(type);

    let testDetail: {} | null = null;
    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchAlignQuestions(request, metadata, async (err, response) => {
      try {
        console.log("fetchAlignQuestions request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        testDetail = parsedResponse?.response;
        console.log("fetchAlignQuestions response:", parsedResponse);
        resolve(testDetail);
      } catch (error) {
        console.log(error, "fetchAlignQuestions error");
        reject(error);
      }
    });
    return { testDetail: testDetail };
  });
};
