import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_DEVELOPMENT_AREAS";

export const fetchDevelopmentAreasRedux = createAsyncThunk(
  prefixStr,
  async ({ programId, }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      request.setProgramid(programId);

      let developmentAreas: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchDevelopmentAreas(request,metadata , async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          developmentAreas = parsedResponse?.response;
          console.log(developmentAreas, "developmentAreas");
          //@ts-ignore
          resolve({ developmentAreas: developmentAreas });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { developmentAreas };
    });
  }
);

export const fetchDevelopmentAreas = async ({ programId, }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    request.setProgramid(programId);
    let developmentAreas: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchDevelopmentAreas(request,metadata , async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        developmentAreas = parsedResponse?.response;
        //@ts-ignore
        resolve(developmentAreas);
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { developmentAreas };
  });
};
