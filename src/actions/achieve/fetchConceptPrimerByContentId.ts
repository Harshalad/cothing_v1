import { FetchConceptPrimerServiceClient } from "../../constants/proto/fetchConceptPrimer/fetch-concept-primer_grpc_web_pb";
//@ts-ignore
import { FetchConceptPrimerRequest } from "../../constants/proto/fetchConceptPrimer/fetch-concept-primer_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchConceptPrimerByContentId = async ({
  contentId,
  programId,
  userId,
  goalId,
  methodTitle
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchConceptPrimerRequest();
    request.setConceptprimerid(contentId);
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setGoalid(goalId);
    request.setMethodtitle(methodTitle);

    let conceptPrimer: {} | null = null;

    const instance = new FetchConceptPrimerServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchConceptPrimerId(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        conceptPrimer = parsedResponse;
        //@ts-ignore
        resolve(parsedResponse?.response);
      } catch (error) {
        console.log(error, "conceptPrimer error");
        reject(error);
      }
    });
    return { conceptPrimer: conceptPrimer };
  });
};
