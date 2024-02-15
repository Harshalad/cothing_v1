import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import {FetchQPRatingRequest} from "../../../../src/constants/proto/quickprep/fetch-rating-request-qp_pb"
import { FetchQPRatingServiceClient } from "../../../../src/constants/proto/quickprep/fetch-rating-request-qp_grpc_web_pb";
import { fetchToken } from "../../auth/token";

export const fetchRatingRequestQp = async({
  userWorksheetId,
  userId,
  programId,
}: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve,reject)=>{
        const request = new FetchQPRatingRequest();
        request.setUserworksheetid(userWorksheetId);
        request.setUserid(userId);
        request.setProgramid(programId);

        let requestRatings: {} | null = null;
        const instance = new FetchQPRatingServiceClient(NWORX_GRPC_HOSTNAME,null,null);
        instance.fetchQPRatingRequests(request,metadata,async(err,response)=>{
            try{
                console.log("rating Request QP", request);
                console.log("rating Response QP", response);
                const parsedResponse = JSON.parse(response);

                requestRatings = parsedResponse?.response;
                resolve(requestRatings);
            }catch(error){
                console.log("Fetch Error",error);
                reject(error);
            }

        })
    })
};