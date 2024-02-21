import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchUserSheetRequest } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";

import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchUserSheet = async ( { userId, programId, userWorksheetId, type }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new FetchUserSheetRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setUserworksheetid( userWorksheetId );
		request.setType( type );
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.fetchUserSheet( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"fetchUserSheet request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse?.response;
				console.log( "fetchUserSheet paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "fetchUserSheet error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
