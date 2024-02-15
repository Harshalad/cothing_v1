import { UpdateNworxUserServiceClient } from "../../constants/proto/updateNworxUser/update-nworx-user_grpc_web_pb";
//@ts-ignore
import { CreateUserRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const createUser = async (
	{ name, designation, band, department, email, employeeCode, manager, managerEmail, city, hostUrl }: any
) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new CreateUserRequest();
		request.setName( name );
		request.setDesignation( designation );
		request.setBand( band );
		request.setDepartment( department );
		request.setEmail( email );
		request.setEmployeecode( employeeCode );
		request.setManager( manager );
		request.setManageremail( managerEmail );
		request.setCity( city );
		request.setHosturl( hostUrl );

		const instance = new UpdateNworxUserServiceClient(
			"https://n4indiaapi.nworx.app",
			null,
			null
		);

		instance.createUser( request, metadata, async ( err, response ) => {
			try {
				console.log( "createUser", response, err, request );
				const parsedResponse = JSON.parse( response );
				console.log( parsedResponse, "createUser parsedResponse" );
				//   //@ts-ignore
				resolve( parsedResponse );
			} catch ( error ) {
				console.log( error, "createUser error" );
				reject( error );
			}
		} );
		//   return { nWorxUser: user };
	} );
};
