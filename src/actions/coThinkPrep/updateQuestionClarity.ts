import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { UpdateQuestionClarityRequest } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";
import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateQuestionClarity = async ( { userId, programId, userWorksheetId, type, sectionId, pillName, pillChildName, question, questionType, responseIndex, status, answer }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new UpdateQuestionClarityRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setUserworksheetid( userWorksheetId );
		request.setType( type );
		request.setSectionid( sectionId );
		request.setPillname( pillName );
		request.setPillchildname( pillChildName );
		request.setQuestion( question );
		request.setQuestiontype( questionType );
		request.setResponseindex( responseIndex );
		request.setAnswer( answer );
		request.setStatus( status );
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.updateQuestionClarity( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"updateQuestionClarity request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse;
				console.log( "updateQuestionClarity paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "updateQuestionClarity error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
