import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { FetchQuestionClarityRequest } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";
import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const fetchQuestionClarity = async ( { userId, programId, userWorksheetId, type, sectionId, pillName, pillChildName, question, questionType }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new FetchQuestionClarityRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setUserworksheetid( userWorksheetId );
		request.setType( type );
		request.setSectionid( sectionId );
		request.setPillname( pillName );
		request.setPillchildname( pillChildName );
		request.setQuestion( question );
		request.setQuestiontype( questionType )
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.fetchQuestionClarity( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"fetchQuestionClarity request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse;
				console.log( "fetchQuestionClarity paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "fetchQuestionClarity error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
