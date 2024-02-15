import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchBatteryGroupRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchBatteryGroupDetails = async ({ userId, batteryGroupId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchBatteryGroupRequest();
    request.setUserid(userId);
    request.setBatterygroupid(batteryGroupId);

    let groupBatteryDetails: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchBatteryGroupDetails(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        groupBatteryDetails = parsedResponse?.response;
        console.log(
          "fetchBatteryGroupDetails request:",
          request,
          "response:",
          response,
          "parsedResponse:",
          groupBatteryDetails
        );
        //@ts-ignore
        resolve({ groupBatteryDetails });
      } catch (error) {
        console.log(error, "fetchBatteryGroupDetails error");
        reject(error);
      }
    });
    return { groupBatteryDetails };
  });
};
