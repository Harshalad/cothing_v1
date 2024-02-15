import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import { AddRatingRequest } from "../../../constants/proto/quickprep/update-rating-request_pb";
import { UpdateRatingServiceClient } from "../../../constants/proto/quickprep/update-rating-request_grpc_web_pb";
import { fetchToken } from "../../auth/token";

export const requestRating = async (
  userWorksheetId: any,
  raterId: any,
  raterName: any,
  raterRole: any
) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new AddRatingRequest();
    request.setUserworksheetid(userWorksheetId);
    request.setRaterid(raterId);
    request.setRatername(raterName);
    request.setRaterrole(raterRole);

    const instance = new UpdateRatingServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addRequestRating(request, metadata, async (err, response) => {
      try {
        console.log("ADD Reqqest Rating", response, err);
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

// import axios from "axios";
// import { CLOUD_FUNCTIONS_BASE_URL } from "../../../constants/constants";

// const requestRating = async ({
//   userWorksheetId,
//   raterId,
//   raterName,
//   raterRole,
// }: any) => {
//   try {
//     const response = await axios.post(
//       `${CLOUD_FUNCTIONS_BASE_URL}requestRating`,
//       { userWorksheetId, raterId, raterName, raterRole }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default requestRating;
