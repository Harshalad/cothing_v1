import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import { UpdateQPRatingRequestToDoneRequest } from "../../../../src/constants/proto/quickprep/update-rating-request-qp_pb";
import { UpdateQPRatingServiceClient } from "../../../../src/constants/proto/quickprep/update-rating-request-qp_grpc_web_pb";
import { resolve } from "path";
import { fetchToken } from "../../auth/token";

export const updateRatingRequestToDoneQp = async ({
  userWorksheetId,
  raterId,
  userId,
  programId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateQPRatingRequestToDoneRequest();
    request.setUserworksheetid(userWorksheetId);
    request.setRaterid(raterId);
    request.setUserid(userId);
    request.setProgramid(programId);

    const instance = new UpdateQPRatingServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.updateQPRatingRequestToDone(request, metadata, async (err, response) => {
      try {
        console.log("Update Rating Request/Response To Done Qp", response, request);
        const parsedResponse = JSON.parse(response);
        //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
};
