import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {MRADetails,UpdateAssesseeRequest} from "../../constants/proto/mra/mra_pb";
import { MRAServiceClient } from "../../constants/proto/mra/mra_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateAssessee = async({ userId, mraId, role, enable }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const mraDetails = new MRADetails();
    mraDetails.setUserid(userId);
    mraDetails.setMraid(mraId);
    const request = new UpdateAssesseeRequest();
    request.setMradetails(mraDetails);
    request.setRole(role);
    request.setEnable(enable);
    let mraDetail: {} | null = null;
    const instance = new MRAServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.updateAssessee(request, metadata, async (err, response) => {
      try {
        console.log(
          "updateAssessee request:",
          request,
          "updateAssessee response:",
          response
        );
        const parsedResponse = JSON.parse(response);
         mraDetail = parsedResponse;
        console.log("updateAssessee parsedResponse: ", parsedResponse?.response);
        resolve(mraDetail);
      } catch (error) {
        console.log("updateAssessee error: ", error);
        reject(error);
      }
    });
    return { mraDetail };
  });
};
