import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { UpdateSituationContextRequest, SituaionContext } from "../../constants/proto/coThinkPrep/cothink-sheet_pb";
import { CothinkSheetServiceClient } from "../../constants/proto/coThinkPrep/cothink-sheet_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateSituationContext = async ( { userId, programId, userWorksheetId, type, data }: any ) => {
	const metadata = await fetchToken();
	return new Promise( ( resolve, reject ) => {
		const request = new UpdateSituationContextRequest();
		request.setUserid( userId );
		request.setProgramid( programId );
		request.setUserworksheetid( userWorksheetId );
		request.setType( type );
		console.log( data, "updateSituationContextData" )
		let situaioncontextList = request.getSituaioncontextList();
		data?.map( ( item: any, index: any ) => {
			const situaionContext = new SituaionContext();
			situaionContext.setQuestion( item?.question );
			situaionContext.setAnswer();
			let tagsList = situaionContext.getSelectedtagsList();
			item?.selectedText?.map( ( tag: any ) => {
				console.log( tag, "updateSituationContextData" );
				tagsList.push( tag );
			} )
			situaioncontextList.push( situaionContext );
		} )
		let userWorksheet: {} | null = null;
		const instance = new CothinkSheetServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);

		instance.updateSituationContext( request, metadata, async ( err, response ) => {
			try {
				console.log(
					"updateSituationContext request:",
					request,
					"response",
					response
				);
				const parsedResponse = JSON.parse( response );
				userWorksheet = parsedResponse;
				console.log( "updateSituationContext paredResponse:", parsedResponse );
				resolve( userWorksheet );
			} catch ( error ) {
				console.log( error, "updateSituationContext error" );
				reject( error );
			}
		} );
		return { userWorksheet: userWorksheet };
	} );
}
