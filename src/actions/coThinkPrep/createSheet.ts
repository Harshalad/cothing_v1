import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { CreateSheetRequest } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";
import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const createSheet = async ( { userId, programId, gaolId, milestoneId, worksheetId, methodId, methodType, type }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new CreateSheetRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setGoalid( gaolId );
		request.setMilestoneid( milestoneId );
		request.setWorksheetid( worksheetId );
		request.setMethodid( methodId );
		request.setMethodtype( methodType );
		request.setType( type );
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.createSheet( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"createSheet request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse;
				console.log( "createSheet paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "createSheet error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
