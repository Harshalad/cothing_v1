import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {FetchWorksheetAIRatingRequest} from "../../constants/proto/updateUserWorksheet/worksheet-ai_pb"
import {WorksheetAIRatingServiceClient} from "../../constants/proto/updateUserWorksheet/worksheet-ai_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const fetchWorksheetAIRating = async ({worksheetId, userId, programId, qp}:any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject)=>{
        
        const request = new FetchWorksheetAIRatingRequest();
        request.setWorksheetid(worksheetId);
        request.setUserid(userId);
        request.setProgramid(programId);
        request.setQp(qp);
        console.log(qp,"dsda");
        let airating:{} | null = null;
        const instance = new WorksheetAIRatingServiceClient(NWORX_GRPC_HOSTNAME,null,null);
        instance.fetchWorksheetAIRating(request,metadata,async(err,response)=>{
            try{
                const parsedResponse = JSON.parse(response);

                airating = parsedResponse?.response;
                console.log("fetchWorksheetAIRating request , respone, error", request,response,err);
                resolve(airating);
            }catch(error){
                console.log(error,"request rating error");
                reject(error);
            }
        });
        return {airating: airating};
    });
};