import { NWORX_GRPC_HOSTNAME } from "../../constants/constants"
//@ts-ignore
import {MRADetails} from "../../constants/proto/mra/mra_pb"
import {MRAServiceClient} from "../../constants/proto/mra/mra_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const fetchMRADetails =async({userId,mraId}:any) =>{
  const metadata = await fetchToken();

    return new Promise((resolve, reject) =>{
        const request = new MRADetails();
        request.setUserid(userId);
        request.setMraid(mraId);
        let mraDetails: {} | null = null;
        const instance = new MRAServiceClient(NWORX_GRPC_HOSTNAME,null,null);
        instance.fetchMRADetails(request,metadata,async(err,response)=>{
            try{
                console.log(
                  "fetchMRADetails request:",
                  request,
                  "fetchMRADetails response:",response
                );
                const parsedResponse = JSON.parse(response);
                mraDetails = parsedResponse?.response;
                console.log("fetchMRADetails parsedResponse: ", mraDetails);
                resolve(mraDetails);
            }catch(error){
                console.log("fetchMRADetails error: " , error);
                reject(error);
            }
        });
        return {mraDetails};
    })
}