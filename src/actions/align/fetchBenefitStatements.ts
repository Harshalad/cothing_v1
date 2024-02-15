import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchBenefitStatements = async ({ programId ,}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);

    let benefitStatements: {} | null = null;

    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchBenefitStatements(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        benefitStatements = parsedResponse?.response;
        console.log(benefitStatements, "benefitStatements");
        //@ts-ignore
        resolve({ benefitStatements: benefitStatements });
      } catch (error) {
        console.log(error, " error");
        reject(error);
      }
    });
    return { benefitStatements: benefitStatements };
  });
};
