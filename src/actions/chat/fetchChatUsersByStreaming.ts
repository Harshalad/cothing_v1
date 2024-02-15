import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchUserChatsServiceClient } from "../../constants/proto/chat/fetch-user-chats_grpc_web_pb";
//@ts-ignore
import { FetchUserChats } from "../../constants/proto/chat/fetch-user-chats_pb";
import { fetchToken } from "../auth/token";

export const fetchChatUsersByStreaming = async ({ userId }: any) => {
  const request = new FetchUserChats();
  const metadata = await fetchToken();

  request.setUserid(userId);
  const streamOptions = {
    "grpc.keepalive_time_ms": 15000000,
  };
  const client = new FetchUserChatsServiceClient(
    NWORX_GRPC_HOSTNAME,
    null,
    streamOptions
  );
  const instance = client.fetchUserChatsStream(request, metadata);
  return instance;
};
