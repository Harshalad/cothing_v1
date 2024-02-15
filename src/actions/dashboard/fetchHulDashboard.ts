import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchDashboardHULRequest } from "../../constants/proto/fetchDashboard/fetch-dashboard_pb";
import { FetchDashboardServiceClient } from "../../constants/proto/fetchDashboard/fetch-dashboard_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchHulDashboard = async ({
  userId,
  role,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchDashboardHULRequest();
    request.setUserid(userId);
    request.setRole(role);
    let dashboardDetails: {} | null = null;
    const instance = new FetchDashboardServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchHulDashboard(request, metadata, async (err, response) => {
      try {
        console.log(
          "fetchHulDashboard request:",
          request,
          "response",
          response
        );
        const parsedResponse = JSON.parse(response);
        dashboardDetails = parsedResponse;
        console.log("fetchHulDashboard paredResponse:", parsedResponse);
        resolve(dashboardDetails);
      } catch (error) {
        console.log(error, "fetchHulDashboard error");
        reject(error);
      }
    });
    return { dashboardDetails: dashboardDetails };
  });
};
