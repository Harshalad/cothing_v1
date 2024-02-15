import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {FetchWsCpMappingRequest} from "../../constants/proto/quickprep/ws-cp-mapping_pb";
import { FetchWsCpMappingServiceClient } from "../../constants/proto/quickprep/ws-cp-mapping_grpc_web_pb";
import { resolve } from "path";
import { rejects } from "assert";
import { fetchToken } from "../auth/token";

export const FetchadditionalResource = async(data:any)=>{
  const metadata=await fetchToken();
  return new Promise((resolve,reject) =>{
    const request = new FetchWsCpMappingRequest();
    request.setWorksheetid(data?.id);
    request.setOrganisationid(data?.organisationId);
    console.log(request,"before");
    let additionResource: {} | null = null;
    const instance = new FetchWsCpMappingServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchWsCpMappingById(request, metadata, async(err,response)=>{
      try{
        console.log(request,"request for mapping");
        const parsedResponse = JSON.parse(response);
        additionResource = parsedResponse?.response;
        console.log(additionResource,"parsed data");
        //ts-ignore
        resolve(additionResource);
      }catch(error){
        console.log(error,"Mapping Error");
        reject(error);
      }
    });
    return { additionResource: additionResource};
  });
};

// export const FetchadditionalResource = async (
//   worksheetid: any,
//   organisationid: any
// ) => {
//   const request = new FetchWsCpMappingRequest();
//   request.setWorksheetid(worksheetid);
//   request.setOrganisationid(organisationid);

//   try {
//     const instance = new FetchWsCpMappingServiceClient(
//       NWORX_GRPC_HOSTNAME,
//       null,
//       null
//     );
//     const response = await instance.fetchWsCpMappingById(request, {},async =>(err,response) =>{

//     });
//     const parsedData = JSON.parse(response.toObject().response);
//     console.log(request ,"wp-cp Mapping Data");
//     console.log(response,"response");
//     const additionalResource = parsedData?.response;
//     return { additionalResource: additionalResource };
//   } catch (error) {
//     console.error(error);
//     return { additionalResource: null };
//   }
// };