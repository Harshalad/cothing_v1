import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {MRADetails,scheduleMRARequest} from "../../constants/proto/mra/mra_pb";
import { MRAServiceClient } from "../../constants/proto/mra/mra_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const scheduleMRA = async({
  userId,
  mraId,
  startDate,
  endDate,
  generalMessage,
  personalMsgs
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const mraDetails = new MRADetails();
    mraDetails.setUserid(userId);
    mraDetails.setMraid(mraId);

    const request = new scheduleMRARequest();
    request.setMradetails(mraDetails);
    request.setStartdate(startDate);
    request.setEnddate(endDate);
    request.setGeneralmessage(generalMessage);
    let personalMsgsCpyMap = request.getPersonalmsgsMap();
    console.log(personalMsgs,"personalMsgsCpyMap")
    // Object.entries(personalMsgs).forEach((attribute: any, index: number) => {
    //     console.log(attribute, "loop attriute");
    //     personalMsgsCpyMap.set(attribute[0]+"", attribute[1]+"");
    //   }
    // );
    console.log(personalMsgs,"personalMsgsCpyMap");
    personalMsgs.forEach((value:any, key:any) => {
      console.log(value, key, "loop attribute");
      personalMsgsCpyMap.set(key, value);
    });
    console.log(personalMsgsCpyMap, personalMsgs,"map and map");
    const instance = new MRAServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.scheduleMRA(request, metadata, async (err, response) => {
      try {
        console.log(
          "scheduleMRA request:",
          request,
          "scheduleMRA response:",
          response
        );
        const parsedResponse = JSON.parse(response);
        console.log("scheduleMRA parsedResponse: ", parsedResponse);
        resolve(parsedResponse);
      } catch (error) {
        console.log("scheduleMRA error: ", error);
        reject(error);
      }
    });
  });
};
