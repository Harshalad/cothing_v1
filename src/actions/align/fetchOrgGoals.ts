import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {Metadata} from 'grpc-web'
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_ORG_GOALS";

export const fetchOrgGoalsRedux = createAsyncThunk(
  prefixStr,
  async ({ programId, }: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      // request.setAppname("nworx_user_app");
      request.setProgramid(programId);

      let orgGoals: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchOrgGoals(request, metadata, async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          orgGoals = parsedResponse?.response;
          //@ts-ignore
          resolve({ orgGoals: orgGoals });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { orgGoals: orgGoals };
    });
  }
);



export const fetchOrgGoals = async (programId: string,) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    let orgGoals: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    // let bearerToken={
    //   'Authorization':'Bearer '+
    // }


    instance.fetchOrgGoals(request,metadata , async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        orgGoals = parsedResponse?.response;
        //@ts-ignore
        resolve(orgGoals);
      } catch (error) {
        console.log(error, prefixStr, " error");
        reject(error);
      }
    });
    return { orgGoals: orgGoals };
  });
};
