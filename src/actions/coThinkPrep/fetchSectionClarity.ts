import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchSectionClarityRequest } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";
import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchSectionClarity = async ( { userId, programId, userWorksheetId, type, sectionId, pillName, pillChildName }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new FetchSectionClarityRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setUserworksheetid( userWorksheetId );
		request.setType( type );
		request.setSectionid( sectionId );
		request.setPillname( pillName );
		request.setPillchildname( pillChildName );
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.fetchSectionClarity( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"fetchSectionClarity request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse;
				console.log( "fetchSectionClarity paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "fetchSectionClarity error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
