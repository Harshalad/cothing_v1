import { FetchWorksheetServiceClient } from "../../constants/proto/fetchWorksheet/fetch-work-sheet_grpc_web_pb";
//@ts-ignore
import { FetchWorksheetRequest } from "../../constants/proto/fetchWorksheet/fetch-work-sheet_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_USER_GOALS";

// service FetchWorksheetService{
// 	rpc fetchWorksheetById(FetchWorksheetRequest) returns (ai.nworx.api.proto.common.ResponseProto);
// }

export const fetchWorksheet = async ({ worksheetId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchWorksheetRequest();
   
    request.setWorksheetid(worksheetId);

    let worksheet: {} | null = null;

    const instance = new FetchWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchWorksheetById(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        worksheet = parsedResponse;
        //@ts-ignore
        resolve(parsedResponse?.response);
      } catch (error) {
        console.log(error, "worksheet error");
        reject(error);
      }
    });
    return { worksheet };
  });
};
