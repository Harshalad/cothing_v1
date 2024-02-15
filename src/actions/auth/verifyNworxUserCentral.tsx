import {useSelector} from "react-redux";
import {FetchNworxCentralUserServiceClient} from "../../constants/proto/verifyUser/fetch-nworx-central-user_grpc_web_pb";
//@ts-ignore
import {FetchNworxCentralUserRequest} from "../../constants/proto/verifyUser/fetch-nworx-central-user_pb";
import {NWORX_GRPC_HOSTNAME,setingNWORX_GRPC_HOSTNAME} from "../../constants/constants";

export const verifyNworxUserCentral=async (email: any,hostUrl: any) => {

	return new Promise((resolve,reject) => {
		const request=new FetchNworxCentralUserRequest();
		request.setEmailmobile(email);
		let isVerifiedUser: boolean|null=null;
		let isMFAEnabled: boolean|null=null;
		let phoneNumber: string|null=null;
		let hostingUrl: string|null=null;
		const instance=new FetchNworxCentralUserServiceClient(
			hostUrl,
			null,
			null
		);
		instance.fetchNworxCentralUser(request,{},async (err,response) => {
			try {
				//const parsedResponse=JSON.parse(response);
				console.log("fetchNworxCentralUser",response,request);

				isVerifiedUser=response.array[3];
				isMFAEnabled=response.array[2];
				phoneNumber=response.array[5];
				hostingUrl=response?.array[6];
				if(hostingUrl&&hostingUrl?.length>0) {
					setingNWORX_GRPC_HOSTNAME(hostingUrl);

				}
				console.log("fetchNworxCentralUser",isVerifiedUser,isMFAEnabled,phoneNumber);

				resolve({isVerifiedUser,isMFAEnabled,phoneNumber,hostingUrl});
			} catch(error) {
				console.log(error,"error fetchNworxCentralUser");
				reject(error);
			}
			return {
				isVerifiedUser,
				isMFAEnabled,
				phoneNumber,
				hostingUrl

			};
		});
	});
};
