import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchUserProgramRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchUserActions = async ({ userId, programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchUserProgramRequest();

    request.setUserid(userId);
    request.setProgramid(programId);

    let userActions: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );


    instance.fetchUserAction(request,metadata , async (err, response) => {
      try {
        userActions = JSON.parse(response);
        //@ts-ignore
        resolve({ userActions: userActions?.response });
      } catch (error) {
        console.log(error, "userActions error");
        reject(error);
      }
    });
    return { userActions: userActions };
  });
};
