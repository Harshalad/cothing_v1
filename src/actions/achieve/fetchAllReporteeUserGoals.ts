import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchReporteeGoalsRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchAllReporteeUserGoals = async ({ managerId, role, }: any) => {
  console.log("fetchUserGoalMilestone ");

  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchReporteeGoalsRequest();

    request.setSuperiorid(managerId);
    request.setRole(role);

    let allReporteeUserGoals: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchAllReporteeUserGoals(request, metadata, async (err, response) => {
      try {
        console.log("fetchAllReporteeUserGoals Response", response, err, request);
        allReporteeUserGoals = JSON.parse(response);
        console.log(allReporteeUserGoals, "userGoalMilestone ");
        //@ts-ignore
        resolve({ allReporteeUserGoals: allReporteeUserGoals?.response });
      } catch (error) {
        console.log(error, "fetchAllReporteeUserGoals error");
        reject(error);
      }
    });
    return { allReporteeUserGoals: allReporteeUserGoals };
  });
};
