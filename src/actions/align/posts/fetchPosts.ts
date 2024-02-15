// ALIGN AND ACHIEVE
import { FetchUserProgramServiceClient } from "../../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramGoalRequest } from "../../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";

//PREPARE
import { FetchUserWorksheetServiceClient } from "../../../constants/proto/fetchUserWorksheet/fetch-user-work-sheet_grpc_web_pb";
//@ts-ignore
import { FetchUserWorksheetRequest } from "../../../constants/proto/fetchUserWorksheet/fetch-user-work-sheet_grpc_web_pb";
import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { fetchToken } from "../../auth/token";

export const fetchPostsByStreaming = async ({
  userId,
  programId,
  userGoalId,
  type,
  uwsId,
}: any) => {
  const metadata=await fetchToken();

  let instance;
  const streamOptions = {
    "grpc.keepalive_time_ms": 15000000,
  };
  if (type === "PREPARE" && uwsId) {
    const request = new FetchUserWorksheetRequest();
    // request.setUserid(userId);
    // request.setProgramid(programId);
    console.log(request, "LABEL REQUEST");
    request.setUserworksheetid(uwsId);

    const client = new FetchUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      streamOptions
    );
    instance = client.fetchStreamPreparationPosts(request, metadata);
  }

  if (type === "ALIGN" || type === "ACHIEVE") {
    const request = new FetchUserProgramGoalRequest();
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);
    console.log(request, "posts section LABEL REQUEST");

    const client = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      streamOptions
    );

    if (type === "ALIGN") {
      instance = client.fetchStreamAlignPosts(request,metadata);
    }

    if (type === "ACHIEVE") {
      instance = client.fetchStreamAchievePosts(request,metadata);
    }
  }

  return instance;
};
