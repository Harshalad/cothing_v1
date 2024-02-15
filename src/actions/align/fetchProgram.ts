import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchProgramServiceClient } from "../../constants/proto/fetchProgram/fetch-program_grpc_web_pb";
//@ts-ignore
import { FetchProgramRequest } from "../../constants/proto/fetchProgram/fetch-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

const prefixStr = "ALIGN/FETCH_PROGRAM";

export const fetchProgram = createAsyncThunk(
  prefixStr,
  async ({ programId, }: any, thunkAPI: any) => {
    const metadata = await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchProgramRequest();
      // request.setAppname("nworx_user_app");
      request.setProgramid(programId);

      let program: {} | null = null;

      const instance = new FetchProgramServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.fetchProgram(request, metadata, async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          program = parsedResponse?.response;
          //@ts-ignore
          resolve({ program: program });
        } catch (error) {
          console.log(error, prefixStr, " error");
          reject(error);
        }
      });
      return { program: program };
    });
  }
);

// export const fetchProgramAPI = async ({ programId }: any) => {
//   return new Promise((resolve, reject)  => {
//     const request = new FetchProgramRequest();
//     // request.setAppname("nworx_user_app");
//     request.setProgramid(programId);

//     let program: {} | null = null;

//     const instance = new FetchProgramServiceClient(
//       NWORX_GRPC_HOSTNAME,
//       null,
//       null
//     );
//     instance.fetchProgram(request, {}, async (err, response) => {
//       try {
//         const parsedResponse = JSON.parse(response);
//         console.log(parsedResponse,"vsjhfvsahfas");
//         program = parsedResponse?.response;
//         //@ts-ignore
//         resolve({ program: program });
//       } catch (error) {
//         console.log(error, prefixStr, " error");
//         reject(error);
//       }
//     });
//     return { program: program };
//   })
// }

export const fetchProgramAPI = async ({ programId }: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new FetchProgramRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);

    let testDetail: {} | null = null;
    const instance = new FetchProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchProgram(request, metadata, async (err, response) => {
      try {
        console.log("fetchProgram request:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        testDetail = parsedResponse?.response;
        console.log("fetchProgram response:", parsedResponse);
        resolve(testDetail);
      } catch (error) {
        console.log(error, "fetchProgram error");
        reject(error);
      }
    });
    return { testDetail: testDetail };
  });
};
