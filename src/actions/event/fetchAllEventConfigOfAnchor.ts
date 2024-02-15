import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {FetchAllEventConfigOfAnchorRequest} from "../../constants/proto/event/event_pb"
import {EventServiceClient} from "../../constants/proto/event/event_grpc_web_pb"
import { fetchToken } from "../auth/token";

export  const  fetchAllEventConfigOfAnchor = async({anchorUserRole,anchorUserId}:any)=>{
  const metadata = await fetchToken();

    return new Promise((resolve, reject) =>{
        const request = new FetchAllEventConfigOfAnchorRequest();
        request.setAnchoruserid(anchorUserId);
        request.setAnchoruserrole(anchorUserRole);
        let eventDetails :{} | null = null;
        const instance = new EventServiceClient(NWORX_GRPC_HOSTNAME, null ,null);

        instance.fetchAllEventConfigOfAnchor(
          request,
          metadata,
          async (err, response) => {
            try {
              console.log(
                "fetchAllEventConfigOfAnchor request:",
                request,
                "response",
                response
              );
              const parsedResponse = JSON.parse(response);
              eventDetails = parsedResponse;
              console.log(
                "fetchAllEventConfigOfAnchor paredResponse:",
                parsedResponse
              );
              resolve(eventDetails);
            } catch (error) {
              console.log(error, "fetchAllEventConfigOfAnchor error");
              reject(error);
            }
          }
        );
        return { eventDetails: eventDetails };
    });
};