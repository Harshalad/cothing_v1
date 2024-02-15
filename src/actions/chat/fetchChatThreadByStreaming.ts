import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchChatThreadServiceClient } from "../../constants/proto/chat/fetch-chat-thread_grpc_web_pb";
//@ts-ignore
import { FetchChatThreadRequest } from "../../constants/proto/chat/fetch-chat-thread_pb";
import { fetchToken } from "../auth/token";

export const fetchChatThreadByStreaming = async ({ chatThreadId }: any) => {
  const metadata = await fetchToken();

  const request = new FetchChatThreadRequest();
  request.setChatthreadid(chatThreadId);
  const streamOptions = {
    "grpc.keepalive_time_ms": 15000000,
  };
  const client = new FetchChatThreadServiceClient(
    NWORX_GRPC_HOSTNAME,
    null,
    streamOptions
  );
  const instance = client.fetchChatThreadStream(request, metadata);
  return instance;
};
