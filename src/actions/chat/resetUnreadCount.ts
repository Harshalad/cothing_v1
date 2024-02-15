import { UpdateUserChatsServiceClient } from "../../constants/proto/chat/update-user-chats_grpc_web_pb";
//@ts-ignore
import { UpdateUserChats } from "../../constants/proto/chat/update-user-chats_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const resetUnreadCount = async ({ userId, partnerId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserChats();
    request.setUserid(userId);
    request.setPartnerid(partnerId);
    let orgChatUsers: {} | null = null;

    const instance = new UpdateUserChatsServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.resetChatUnreadCount(
      request,
      metadata,
      async (err: any, response: any) => {
        try {
          const parsedResponse = JSON.parse(response);
          //   orgChatUsers = parsedResponse?.response;
          //@ts-ignore
          resolve(parsedResponse);
        } catch (error) {
          console.log(error, " error");
          reject(error);
        }
      }
    );
    // return { orgChatUsers: orgChatUsers };
  });
};
