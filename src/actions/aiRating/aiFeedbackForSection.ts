import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { AIFeedbackForSectionRequest } from "../../constants/proto/updateUserWorksheet/worksheet-ai_pb"
import { WorksheetAIRatingServiceClient } from "../../constants/proto/updateUserWorksheet/worksheet-ai_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const aiFeedbackForSection = async ( { worksheetId, userId, programId, goalName, milestoneName, sectionId }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {

		const request = new AIFeedbackForSectionRequest();
		request.setUserworksheetid( worksheetId );
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setGoalname( goalName );
		request.setMilestonename( milestoneName );
		request.setSectionid( sectionId );

		let airating: {} | null = null;
		const instance = new WorksheetAIRatingServiceClient( NWORX_GRPC_HOSTNAME, null, null );
		instance.aiFeedbackForSection( request, metadata, async ( err, response ) => {
			try {
				const parsedResponse = JSON.parse( response );

				airating = parsedResponse?.extra;
				console.log( "aiFeedbackForSection request , respone, error", request, response, err );
				resolve( airating );
			} catch ( error ) {
				console.log( error, "request rating error" );
				reject( error );
			}
		} );
		return { airating: airating };
	} );
};