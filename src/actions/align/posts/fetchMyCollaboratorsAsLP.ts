import { FetchUserCollaboratorServiceClient } from "../../../constants/proto/updatePosts/fetch-user-collaborator-map_grpc_web_pb";
//@ts-ignore
import { FetchUserCollaboratorRequest } from "../../../constants/proto/updatePosts/fetch-user-collaborator-map_pb"
import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { fetchToken } from "../../auth/token";

export const fetchMyCollaboratorsAsLP = async ( { userId }: any ) => {
  const metadata = await fetchToken();

  return new Promise( ( resolve, reject ) => {
    const request = new FetchUserCollaboratorRequest();
    request.setCollaboratorid( userId );

    let detail: {} | null = null;
    const instance = new FetchUserCollaboratorServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchCollaboratorsOfLP( request, metadata, async ( err, response ) => {
      try {
        console.log( "fetchCollaboratorsOfLP request:", request, "response", response );
        const parsedResponse = JSON.parse( response );
        detail = parsedResponse?.response;
        console.log( "fetchCollaboratorsOfLP response:", parsedResponse );
        resolve( detail );
      } catch ( error ) {
        console.log( error, "fetchCollaboratorsOfLP error" );
        reject( error );
      }
    } );
    return { detail: detail };
  } );
};
