import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchUserActivity = async ({ userId, programId ,}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();

    request.setUserid(userId);
    request.setProgramid(programId);

    let activity: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );


    instance.fetchUserActivity(request, metadata, async (err, response) => {
      try {
        activity = JSON.parse(response);
        //@ts-ignore
        resolve({ userActivity: activity?.response });
      } catch (error) {
        console.log(error, "activity error");
        reject(error);
      }
    });
    return { activity: activity };
  });
};
