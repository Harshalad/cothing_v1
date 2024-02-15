import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import { UpdateRatingRequestToDoneRequest } from "../../../constants/proto/quickprep/update-rating-request_pb";
import { UpdateRatingServiceClient } from "../../../constants/proto/quickprep/update-rating-request_grpc_web_pb";
import { fetchToken } from "../../auth/token";

export const updateRatingRequestToDone = async(userWorksheetId:any,raterId:any)=>{
  const metadata=await fetchToken();
  return new Promise((resolve,reject)=>{
    const request = new UpdateRatingRequestToDoneRequest();
    request.setUserworksheetid(userWorksheetId);
    request.setRaterid(raterId);

    const instance = new UpdateRatingServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.updateRatingRequestToDone(request,metadata, async(err,response)=>{
       try {
         console.log("Update Rating Request To Done", response, err);
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

// const updateRatingRequestToDone = async ({ userWorksheetId, raterId }: any) => {
//   try {
//     const response = await axios.post(
//       `${CLOUD_FUNCTIONS_BASE_URL}updateRatingRequestToDone`,
//       {
//         userWorksheetId,
//         raterId,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default updateRatingRequestToDone;
