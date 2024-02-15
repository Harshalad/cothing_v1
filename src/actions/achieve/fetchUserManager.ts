import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
//@ts-ignore
import { FetchUserRequest } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchUserManager = createAsyncThunk(
  "ACHIEVE/FETCH_USER_MANAGER",
  async (userId: string, thunkAPI: any,) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new FetchUserRequest();
      // request.setAppname("nworx_user_app");
      request.setUserid(userId);

      let manager: {} | null = null;

      const instance = new FetchNworxUserServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );

      

      instance.fetchUserManager(request, metadata, async (err, response) => {
        try {
          console.log("fetchNworxUser Response", response, err);
          const parsedResponse = JSON.parse(response);
          manager = parsedResponse;
          //@ts-ignore
          resolve({ manager: manager });
        } catch (error) {
          console.log(error, "fetchNworxUser error");
          reject(error);
        }
      });
      return { manager: manager };
    });
  }
);
