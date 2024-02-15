import axios from "axios";
import {
  CLOUD_FUNCTIONS_BASE_URL,
  NWORX_GRPC_HOSTNAME,
} from "../../constants/constants";
import { UpdateUserChatThreadServiceClient } from "../../constants/proto/chat/update-chat-thread_grpc_web_pb";
//@ts-ignore
import { addChatRequest as AddChatRequest } from "../../constants/proto/chat/update-chat-thread_pb";
import { fetchToken } from "../auth/token";

export const addChatRequest = async ({
  id,
  message,
  formattedMessage,
  chatThreadId,
  repliedToChatMessage,
  repliedToChatId,
  status,
  messageFromUserId,
  messageFromUserName,
  messageToUserId,
  messageToUserName,
  serviceProvider,
  orgName,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new AddChatRequest();
    console.log(request, "request");
    request.setId(id);
    request.setMessage(message);
    request.setFormattedmessage(formattedMessage);
    request.setChatthreadid(chatThreadId);
    request.setRepliedtochatmessage(repliedToChatMessage);
    request.setRepliedtochatid(repliedToChatId);
    request.setStatus(status);
    request.setMessagefromuserid(messageFromUserId);
    request.setMessagefromusername(messageFromUserName);
    request.setMessagetouserid(messageToUserId);
    request.setMessagetousername(messageToUserName);
    request.setServiceprovider(serviceProvider);
    request.setOrgname(orgName);

    // let orgChatUsers: {} | null = null;

    const instance = new UpdateUserChatThreadServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addChat(request, metadata, async (err: any, response: any) => {
      try {
        console.log(response, err);
        const parsedResponse = JSON.parse(response);
        // orgChatUsers = parsedResponse?.response;
        //@ts-ignore
        resolve(parsedResponse);
      } catch (error) {
        console.log(error, " error");
        reject(error);
      }
    });
    // return { orgChatUsers: orgChatUsers };
  });
  // const response = axios.patch(`${CLOUD_FUNCTIONS_BASE_URL}addChatRequest`, {
  //   id,
  //   message,
  //   formattedMessage,
  //   chatThreadId,
  //   repliedToChatMessage,
  //   repliedToChatId,
  //   status,
  //   messageFromUserId,
  //   messageFromUserName,
  // });

  // return response;
};
