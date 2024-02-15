import { createAsyncThunk } from "@reduxjs/toolkit";
import { VerifyNworxUserServiceClient } from "../../constants/proto/verifyUser/verify-nworx-user_grpc_web_pb";
//@ts-ignore
import { VerifyNworxUserRequest } from "../../constants/proto/verifyUser/verify-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
export const verifyNworxUser = createAsyncThunk(
  "AUTH/VERIFY_NWORX_USER",
  async (email, thunkAPI) => {
    return new Promise((resolve, reject) => {
      const request = new VerifyNworxUserRequest();
      request.setAppname("nworx_user_app");
      request.setEmailmobile(email);
      let isVerifiedUser: boolean | null = null;
      let isMFAEnabled: boolean | null = null;
      let phoneNumber: string | null = null;
      const instance = new VerifyNworxUserServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );
      instance.verifyNworxUser(request, {}, async (err, response) => {
        try {
          console.log("verifyNworxUser Response", response, err, request);
          isVerifiedUser = response.array[0];
          isMFAEnabled = response.array[1];
          phoneNumber = response.array[2];
          //@ts-ignore TODO check
          resolve({ isVerifiedUser, isMFAEnabled, phoneNumber });
          // return { isVerifiedUser, isMFAEnabled, phoneNumber };
        } catch (error) {
          console.log(error, "error verifyNworxUser");
          reject(error);
        }
        return {
          isVerifiedUser,
          isMFAEnabled,
          phoneNumber,
        };
      });
    });
  }
);

export const checkIfNworxUser = async (email: any) => {
  return new Promise((resolve, reject) => {
    const request = new VerifyNworxUserRequest();
    request.setAppname("nworx_user_app");
    request.setEmailmobile(email);
    let isVerifiedUser: boolean | null = null;
    let isMFAEnabled: boolean | null = null;
    let phoneNumber: string | null = null;
    const instance = new VerifyNworxUserServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.verifyNworxUser(request, {}, async (err, response) => {
      try {
        isVerifiedUser = response.array[0];
        isMFAEnabled = response.array[1];
        phoneNumber = response.array[2];
        //@ts-ignore TODO check
        resolve({ isVerifiedUser, isMFAEnabled, phoneNumber });
        // return { isVerifiedUser, isMFAEnabled, phoneNumber };
      } catch (error) {
        console.log(error, "error verifyNworxUser");
        reject(error);
      }
      return {
        isVerifiedUser,
        isMFAEnabled,
        phoneNumber,
      };
    });
  });
};
