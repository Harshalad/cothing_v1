import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_DEPARTMENT_GOALS";

export const fetchDepartmentGoalsRedux = createAsyncThunk(
  prefixStr,
  async ({ programId, }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      request.setProgramid(programId);

      let departmentGoals: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchDepartmentGoals(request,metadata , async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          departmentGoals = parsedResponse?.response;
          //@ts-ignore
          resolve({ departmentGoals: departmentGoals });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { departmentGoals: departmentGoals };
    });
  }
);

export const fetchDepartmentGoals = async ({ programId, department ,}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    request.setProgramid(programId);
    request.setDepartment(department);
    let departmentGoals: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchDepartmentGoals(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        departmentGoals = parsedResponse?.response;
        //@ts-ignore
        resolve(departmentGoals);
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { departmentGoals: departmentGoals };
  });
};
