import { FetchUserWorksheetServiceClient } from "../../constants/proto/fetchUserWorksheet/fetch-user-work-sheet_grpc_web_pb";
//@ts-ignore
import { FetchUserWorksheetRequest } from "../../constants/proto/fetchUserWorksheet/fetch-user-work-sheet_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "USER/FETCH_USER_GOALS";

// service FetchWorksheetService{
// 	rpc fetchWorksheetById(FetchWorksheetRequest) returns (ai.nworx.api.proto.common.ResponseProto);
// }

export const fetchUserWorksheet = async ({ worksheetId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserWorksheetRequest();

    request.setUserworksheetid(worksheetId);

    let userWorksheet: {} | null = null;

    const instance = new FetchUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchUserWorksheetById(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        userWorksheet = parsedResponse;
        //@ts-ignore
        resolve(parsedResponse?.response);
      } catch (error) {
        console.log(error, "worksheet error");
        reject(error);
      }
    });
    return { userWorksheet };
  });
};

export const fetchUserWorksheetByStreaming = async ({ worksheetId }: any) => {
  const metadata=await fetchToken();

  const request = new FetchUserWorksheetRequest();
  // request.setName("ok");
  let methodResponse = "";
  request.setUserworksheetid(worksheetId);

  const streamOptions = {
    // send pings every X seconds if there is no activity,
    // it is limited by min_sent_ping_interval_without_data_ms/min_time_between_pings_ms, but prints out
    // some logs if `DEBUG=1 GRPC_VERBOSITY=DEBUG GRPC_TRACE=connectivity_state,http_keepalive`
    // enabled  :-)
    "grpc.keepalive_time_ms": 15000000,

    /**
     * Following values cannot be set as they cause a GOAWAY from server :-(
     */
    // wait timeout for ping ack before considering the connection dead
    // 'grpc.keepalive_timeout_ms': 15000
    // send pings even without active streams
    // 'grpc.keepalive_permit_without_calls': 1
    // always send pings
    // 'grpc.http2.max_pings_without_data': 0,
    // same ping interval without data, as with data
    // 'grpc.http2.min_sent_ping_interval_without_data_ms': 5000,
    // same as above for compatibility reasons, see https://grpc.github.io/grpc/core/group__grpc__arg__keys.html#ga69583c8efdbdcb7cdf9055ee80a07014
    // 'grpc.http2.min_time_between_pings_ms': 30000
    // recreate connection after 2m? consider if useful for debugging
    // 'grpc.grpc.max_connection_age_ms': 2 * 60 * 1000
  };

  const client = new FetchUserWorksheetServiceClient(
    NWORX_GRPC_HOSTNAME,
    null,
    streamOptions
  );

  const instance = client.fetchUserWorksheetByIdStream(
    request,
    metadata
    // (err: any, response: any) => {
    //   console.log(response);
    //   console.log(err);
    //   return;
    // }
  );

  return instance;

  // instance.on("data", function (response: any) {
  //   // console.log();
  //   console.log("data :", response);
  //   if (response?.length) {
  //     console.log(JSON.parse(response?.[0]));
  //     methodResponse = response;
  //     // return JSON.parse(response?.[0]);
  //   }
  // });

  // instance.on("end", function () {
  //   console.log("Call ended");
  // });

  // instance.on("error", function (e: any) {
  //   console.log("an error occured : ", e);
  // });

  // instance.on("status", function (status: any) {
  //   console.log("status :", status);
  // });

  // if (methodResponse) {
  //   return methodResponse;
  // }

  // instance.cancel();
};
