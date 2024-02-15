import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchBatteryRequest } from "../../constants/proto/analyze/analyse_pb";
import { AnalyseServiceClient } from "../../constants/proto/analyze/analyse_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchBatteryDetails = async ({ userId, batteryId }: any) => {
    const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchBatteryRequest();
    request.setUserid(userId);
    request.setBatteryid(batteryId);

    let batteryDetails: {} | null = null;

    const instance = new AnalyseServiceClient(NWORX_GRPC_HOSTNAME, null, null);
    instance.fetchBatteryDetails(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        batteryDetails = parsedResponse?.response;
        console.log(
          "fetchBatteryDetails request:",
          request,
          "response:",
          response,
          "parsedResponse:",
          batteryDetails
        );
        //@ts-ignore
        resolve({ batteryDetails });
      } catch (error) {
        console.log(error, "fetchBatteryDetails error");
        reject(error);
      }
    });
    return { batteryDetails };
  });
};
