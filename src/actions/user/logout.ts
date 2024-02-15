import { UpdateNworxUserServiceClient } from "../../constants/proto/updateNworxUser/update-nworx-user_grpc_web_pb";
//@ts-ignore
import { LogOutRequest } from "../../constants/proto/updateNworxUser/update-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const logOut = async (
  userId: any,
) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new LogOutRequest();
    request.setUserid(userId);
    const instance = new UpdateNworxUserServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.logOut(request, metadata, async (err, response) => {
      try {
        console.log("logout", response, err,request);
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse, "logout parsedResponse");
        //   //@ts-ignore
        resolve(parsedResponse);
      } catch (error) {
        console.log(error, "logout error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
