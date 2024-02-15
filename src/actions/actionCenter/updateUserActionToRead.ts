import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import { CompleteActionRequest } from "../../../src/constants/proto/updateUserActions/update-user-action_pb";
import { UpdateUserActionClient } from "../../../src/constants/proto/updateUserActions/update-user-action_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const updateUserActionToRead = async(actionId:any)=>{
    const metadata=await fetchToken();
    return new Promise((resolve,reject)=>{
        const request = new CompleteActionRequest();
        request.setActioncompleteid(actionId);

        let userActions: {} | null = null;

        const instance = new UpdateUserActionClient(
          NWORX_GRPC_HOSTNAME,
          null,
          null
        );
        instance.markActionAsRead(request,metadata,async(err,response)=>{
            try{
                console.log("Read Request/Response", request,response);
                userActions = JSON.parse(response);
                //@ts-ignore
                resolve({ userActions: userActions?.response });

            }catch(error){
                console.log(error, "completeAction error");
                reject(error);
            }
        });
        return { userActions: userActions };
    });
};
