import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
import { UpdateNworxUserServiceClient } from "../../constants/proto/updateNworxUser/update-nworx-user_grpc_web_pb";
//@ts-ignore
import { UpdateRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
// import { UpdateNworxUserRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const updateShowGoalOverviewNworxUser = async (
  showGoalOverview: any,
  userId: any,
) => {
  console.log(showGoalOverview, "updateObject");
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateRequest();

    let boolMap = request.getBoolfieldstoupdateMap();
    let stringMap = request.getStringfieldstoupdateMap();
    //   const request = new UpdateRequest();
    //@ts-ignore
    request.setId(userId);
    //   let boolMap = request.getBoolfieldstoupdateMap();
    // boolMap.set("showGoalOverview", true);
    boolMap.set("showGoalOverview", showGoalOverview);

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
        console.log("fetchNworxUser Response", response, err);
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
};
