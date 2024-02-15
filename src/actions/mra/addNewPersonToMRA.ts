import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {MRADetails, AddNewPersonToMRARequest} from "../../constants/proto/mra/mra_pb";
import { MRAServiceClient } from "../../constants/proto/mra/mra_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const addNewPersonToMRA = async({ userId, mraId, name, designation, email, role }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const mraDetails = new MRADetails();
    mraDetails.setUserid(userId);
    mraDetails.setMraid(mraId);
    const request = new AddNewPersonToMRARequest();
    request.setMradetails(mraDetails);
    request.setName(name);
    request.setDesignation(designation);
    request.setEmail(email);
    request.setRole(role);
     let mraDetail: {} | null = null;
    const instance = new MRAServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.addNewPersonToMRA(request, metadata, async (err, response) => {
      try {
        console.log(
          "addNewPersonToMRA request:",
          request,
          "addNewPersonToMRA response:",
          response
        );
        const parsedResponse = JSON.parse(response);
        mraDetail = parsedResponse;
        console.log("addNewPersonToMRA parsedResponse: ", mraDetails);
        resolve(mraDetail);
      } catch (error) {
        console.log("addNewPersonToMRA error: ", error);
        reject(error);
      }
    });
    return {mraDetail}
  });
};
