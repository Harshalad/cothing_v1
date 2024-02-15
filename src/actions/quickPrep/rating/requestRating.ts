import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import { AddQPRatingRequest } from "../../../../src/constants/proto/quickprep/update-rating-request-qp_pb";
import { UpdateQPRatingServiceClient } from "../../../../src/constants/proto/quickprep/update-rating-request-qp_grpc_web_pb";
import { rejects } from "assert";
import { fetchToken } from "../../auth/token";

export const requestRatingQp = async ({
  userWorksheetId,
  raterId,
  raterName,
  raterRole,
  userId,
  programId,
}: any) => {
  const metadata=await fetchToken();
    return new Promise((resolve,reject)=>{
        const request = new AddQPRatingRequest();
        request.setUserworksheetid(userWorksheetId);
        request.setRaterid(raterId);
        request.setRatername(raterName);
        request.setRaterrole(raterRole);
        request.setUserid(userId);
        request.setProgramid(programId);

        const instance = new UpdateQPRatingServiceClient(NWORX_GRPC_HOSTNAME,null,null);
        instance.addQPRequestRating(request,metadata, async(err,response)=>{
           try{
            console.log("Add Reqqest Rating Qp", response, request);
            const parsedResponse = JSON.parse(response);
            //@ts-ignore
            console.log();
            if (parsedResponse?.statusCode === 0) {
              resolve(parsedResponse);
            }

           }catch(error){
            console.log(error);
            reject(error);
           }
        });
    });
};
