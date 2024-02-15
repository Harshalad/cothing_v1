import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { AIFeedbackForPrepRequest } from "../../constants/proto/updateUserWorksheet/worksheet-ai_pb"
import { WorksheetAIRatingServiceClient } from "../../constants/proto/updateUserWorksheet/worksheet-ai_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const aiFeedbackForPrep = async ( { worksheetId, userId, programId, goalName, milestoneName }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {

		const request = new AIFeedbackForPrepRequest();
		request.setUserworksheetid( worksheetId );
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setGoalname( goalName );
		request.setMilestonename( milestoneName );

		let airating: {} | null = null;
		const instance = new WorksheetAIRatingServiceClient( NWORX_GRPC_HOSTNAME, null, null );
		instance.aiFeedbackForPrep( request, metadata, async ( err, response ) => {
			try {
				const parsedResponse = JSON.parse( response );

				airating = parsedResponse?.extra;
				console.log( "aiFeedbackForPrep request , respone, error", request, response, err );
				resolve( airating );
			} catch ( error ) {
				console.log( error, "request rating error" );
				reject( error );
			}
		} );
		return { airating: airating };
	} );
};