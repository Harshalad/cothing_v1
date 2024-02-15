import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { UpdateNworxUserServiceClient } from "../../constants/proto/updateNworxUser/update-nworx-user_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { fetchToken } from "../auth/token";

export const updatePrivacyPolicies = async ( userId: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new UpdateRequest();
		request.setId( userId );
		let boolMap = request.getBoolfieldstoupdateMap();
		boolMap.set( "privacy", true );
		const instance = new UpdateNworxUserServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.updateNworxUser( request, metadata, async ( err, response ) => {
			try {
				console.log( "updatePrivacyPolicies Response is this", response, request, err );
				const parsedResponse = JSON.parse( response );
				console.log( parsedResponse, "parsedResponse" );
				//   //@ts-ignore
				resolve( parsedResponse );
			} catch ( error ) {
				console.log( error, "updatePrivacyPolicies error" );
				reject( error );
			}
		} );

	} );
};
