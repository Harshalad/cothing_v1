import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
import { UpdateNworxUserServiceClient } from "../../constants/proto/updateNworxUser/update-nworx-user_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
// import { UpdateNworxUserRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { useSelector } from "react-redux";
import { fetchToken } from "../auth/token";


 

export const onboardNworxUser = createAsyncThunk(
  "USER/ONBOARD_NWORX_USER",
  async (updateObject: any, thunkAPI: any) => {
    const metadata=await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new UpdateRequest();

      let boolMap = request.getBoolfieldstoupdateMap();
      let stringMap = request.getStringfieldstoupdateMap();
      //   const request = new UpdateRequest();
      //@ts-ignore
      request.setId(updateObject.id);
      //   let boolMap = request.getBoolfieldstoupdateMap();
      // boolMap.set("showGoalOverview", true);
      boolMap.set("onboarded", true);
      if (
        updateObject?.showGoalOverview === true ||
        updateObject?.showGoalOverview === false
      ) {
        boolMap.set("showGoalOverview", false);
      } else {
        boolMap.set("showGoalOverview", true);
      }
      //@ts-ignore
      boolMap.set("managerPermissions", updateObject.managerPermissions);
      //@ts-ignore
      boolMap.set("expertPermissions", updateObject.expertPermissions);
      //@ts-ignore
      stringMap.set("nextSixMonthsFocus", updateObject.nextSixMonthsFocus);
      // request.setAppname("nworx_user_app");
      //   request.setEmailmobile(email);

      //   let user: {} | null = null;

      const instance = new UpdateNworxUserServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );

      instance.updateNworxUser(request, metadata, async (err, response) => {
        try {
          console.log("updateNworxUser Response is this", response, err);
          const parsedResponse = JSON.parse(response);
          console.log(parsedResponse, "parsedResponse");
          //   //@ts-ignore
          resolve(parsedResponse);
        } catch (error) {
          console.log(error, "fetchNworxUser error");
          reject(error);
        }
      });
      //   return { nWorxUser: user };
    });
  }
);

export const updateReport = createAsyncThunk(
  "USER/ONBOARD_NWORX_USER",
  async (updateObject: any, thunkAPI: any) => {
    const metadata = await fetchToken();
    return new Promise((resolve, reject) => {
      const request = new UpdateRequest();
      let stringMap = request.getStringfieldstoupdateMap();
      let longMap = request.getIntfieldstoupdateMap();
      //   const request = new UpdateRequest();
      //@ts-ignore
      // console.log(updateObject,"adityaupdatedobject")
      request.setId(updateObject.id);
 
      longMap.set("lastSignInTime", updateObject?.lastSignInTime);
      stringMap.set("lastUsedDeviceType", "Desktop");
      stringMap.set("lastUsedDeviceModel", updateObject?.lastUsedDeviceModel);
      stringMap.set("lastUsedBrowser", updateObject?.lastUsedBrowser);
      stringMap.set("lastUsedPlatform", updateObject?.lastUsedPlatform);

      const instance = new UpdateNworxUserServiceClient(
        NWORX_GRPC_HOSTNAME,
        null,
        null
      );

      instance.updateNworxUser(request, metadata, async (err, response) => {
        try {
          console.log("updatereport response, and request", response, request, err);
          const parsedResponse = JSON.parse(response);
          console.log(parsedResponse, "parsedResponse");
          //   //@ts-ignore
          resolve(parsedResponse);
        } catch (error) {
          console.log(error, "fetchNworxUser error");
          reject(error);
        }
      });
      //   return { nWorxUser: user };
    });
  }
);
