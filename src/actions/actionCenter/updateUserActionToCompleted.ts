import { UpdateUserActionClient } from "../../constants/proto/updateUserActions/update-user-action_grpc_web_pb";
//@ts-ignore
import { CompleteActionRequest } from "../../constants/proto/updateUserActions/update-user-action_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const updateUserActionToCompleted = async (actionId : any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new CompleteActionRequest();
    request.setActioncompleteid(actionId);

    let userActions: {} | null = null;

    const instance = new UpdateUserActionClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.completeAction(request, metadata, async (err, response) => {
      try {
        console.log("completeAction Response", response, err);
        userActions = JSON.parse(response);
        console.log(request, "completeAction ");
        //@ts-ignore
        resolve({ userActions: userActions?.response });
      } catch (error) {
        console.log(error, "completeAction error");
        reject(error);
      }
    });
    return { userActions: userActions };
  });
};
