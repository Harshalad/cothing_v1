import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { AIFeedbackForQuestionRequest } from "../../constants/proto/updateUserWorksheet/worksheet-ai_pb"
import { WorksheetAIRatingServiceClient } from "../../constants/proto/updateUserWorksheet/worksheet-ai_grpc_web_pb"
import { fetchToken } from "../auth/token";

export const aiFeedbackForQuestion = async ( { worksheetId, userId, programId, goalName, milestoneName, question, answer, sectionId }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {

		const request = new AIFeedbackForQuestionRequest();
		request.setUserworksheetid( worksheetId );
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setGoalname( goalName );
		request.setMilestonename( milestoneName );
		request.setQuestion( question );
		request.setAnswer( answer );
		request.setSectionid( sectionId );

		let airating: {} | null = null;
		const instance = new WorksheetAIRatingServiceClient( NWORX_GRPC_HOSTNAME, null, null );
		instance.aiFeedbackForQuestion( request, metadata, async ( err, response ) => {
			try {
				const parsedResponse = JSON.parse( response );

				airating = parsedResponse?.extra;
				console.log( "aiFeedbackForQuestion request , respone, error", request, response, err );
				resolve( airating );
			} catch ( error ) {
				console.log( error, "request rating error" );
				reject( error );
			}
		} );
		return { airating: airating };
	} );
};