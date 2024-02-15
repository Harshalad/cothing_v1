import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
//@ts-ignore
import {FetchRatingRequest} from "../../../constants/proto/quickprep/fetch-rating-request_pb"
import { FetchRatingServiceClient } from "../../../constants/proto/quickprep/fetch-rating-request_grpc_web_pb";
import { fetchToken } from "../../auth/token";

export const fetchRatingRequests = async (userWorksheetId:any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject)=>{
        const request = new FetchRatingRequest();
        request.setUserworksheetid(userWorksheetId);

        let requestRatings:{} | null = null;
        const instance = new FetchRatingServiceClient(NWORX_GRPC_HOSTNAME,null,null);
        instance.fetchRatingRequests(request,metadata,async(err,response)=>{
            try{
                const parsedResponse = JSON.parse(response);

                requestRatings = parsedResponse?.response;
                resolve(requestRatings);
            }catch(error){
                console.log(error,"request rating error");
                reject(error);
            }
        });
        return {requestRatings: requestRatings};
    });
};