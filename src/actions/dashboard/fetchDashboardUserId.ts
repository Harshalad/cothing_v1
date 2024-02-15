import {NWORX_GRPC_HOSTNAME} from "../../constants/constants";
//@ts-ignore
import {FetchDashboardRequest} from "../../constants/proto/fetchDashboard/fetch-dashboard_pb";
import {FetchDashboardServiceClient} from "../../constants/proto/fetchDashboard/fetch-dashboard_grpc_web_pb";
import {fetchToken} from "../auth/token";

export const fetchDashboardUserId=async ({
	userId,
}: any) => {
	const metadata=await fetchToken();

	return new Promise((resolve,reject) => {
		const request=new FetchDashboardRequest();
		request.setUserid(userId);
		let dashboardDetails: {}|null=null;
		const instance=new FetchDashboardServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.fetchDashboardV2ByUserId(request,metadata,async (err,response) => {
			try {
				console.log(
					"fetchDashboardV2ByUserId request:",
					request,
					"response",
					response
				);
				const parsedResponse=JSON.parse(response);
				dashboardDetails=parsedResponse;
				console.log("fetchDashboardV2ByUserId paredResponse:",parsedResponse);
				resolve(dashboardDetails);
			} catch(error) {
				console.log(error,"fetchDashboardV2ByUserId error");
				reject(error);
			}
		});
		return {dashboardDetails: dashboardDetails};
	});
};
