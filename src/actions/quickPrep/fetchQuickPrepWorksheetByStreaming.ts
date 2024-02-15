import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { FetchUserWorksheetQuickPrepRequest } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_pb";
import { fetchToken } from "../auth/token";

export const fetchQuickPrepWorksheetByStreaming = async ({
  worksheetId,
  userId,
  programId,
}: any) => {
  const metadata = await fetchToken();

  const request = new FetchUserWorksheetQuickPrepRequest();
  request.setUserworksheetid(worksheetId);
  request.setUserid(userId);
  request.setProgramid(programId);

  const streamOptions = {
    "grpc.keepalive_time_ms": 15000000,
  };

  const client = new FetchUserWorksheetQuickPrepServiceClient(
    NWORX_GRPC_HOSTNAME,
    null,
    streamOptions
  );

  const instance = client.fetchUserWorksheetQuickPrepStream(request, metadata);
  return instance;
};

export const fetchQPPostsByStreaming = async ({
  userId,
  programId,
  type,
  uwsId,
}: any) => {
  const metadata = await fetchToken();

  let instance;
  const streamOptions = {
    "grpc.keepalive_time_ms": 15000000,
  };

  console.log("type : " , type);
  if (type === "QUICK_PREPARE" && uwsId) {
    const request = new FetchUserWorksheetQuickPrepRequest();
    request.setUserid(userId);
    request.setProgramid(programId);
    console.log(request, "LABEL REQUEST");
    request.setUserworksheetid(uwsId);

    const client = new FetchUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      streamOptions
    );
    instance = client.fetchUserWorksheetQPStreamPosts(request, metadata);
  }

  return instance;
};
