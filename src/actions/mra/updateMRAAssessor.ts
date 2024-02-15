import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {updateMRAAssessorRequest,MRADetails} from "../../constants/proto/mra/mra_pb";
import { MRAServiceClient } from "../../constants/proto/mra/mra_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateMRAAssessor = async({userId, mraId,assessorId,role,status}:any) =>{
  const metadata = await fetchToken();

    return new Promise((resolve, reject) =>{
        const mraDetails = new MRADetails();
        mraDetails.setUserid(userId);
        mraDetails.setMraid(mraId);

        const request = new  updateMRAAssessorRequest();
        request.setMradetails(mraDetails);
        request.setAssessorid(assessorId);
        request.setRole(role);
        request.setStatus(status);
        let mraDetail: {} | null = null;
        const instance = new MRAServiceClient(NWORX_GRPC_HOSTNAME, null, null);
        instance.updateMRAAssessor(request, metadata, async (err, response) => {
          try {
            console.log(
              "updateMRAAssessor request:",
              request,
              "updateMRAAssessor response:",
              response
            );
            const parsedResponse = JSON.parse(response);
            mraDetail = parsedResponse;
            console.log("updateMRAAssessor parsedResponse: ", mraDetails);
            resolve(mraDetail );
          } catch (error) {
            console.log("updateMRAAssessor error: ", error);
            reject(error);
          }
        });
        return { mraDetail };
    });
};