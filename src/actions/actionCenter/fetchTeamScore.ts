import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchReporteeGoalsRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchTeamScore = async ({ managerId, role, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchReporteeGoalsRequest();
    request.setSuperiorid(managerId);
    request.setRole(role);
    let teamScore: {} | null = null;
    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    // message FetchReporteeGoalsRequest{
    //   string superiorId = 1;
    //   string role = 2;
    // }
    instance.fetchTeamScore(request,metadata , async (err, response) => {
      try {
        teamScore = JSON.parse(response);
        resolve({ teamScore: teamScore });
      } catch (error) {
        console.log(error, "fetchTeamScore error");
        reject(error);
      }
    });
    return { teamScore: teamScore };
  });
};
