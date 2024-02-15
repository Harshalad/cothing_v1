import { FetchNworxUserServiceClient } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
//@ts-ignore
import { FetchOrgRequest } from "../../constants/proto/fetchNworxUser/fetch-nworx-user_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchChatUsersFromOrg = async ({ orgId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchOrgRequest();
    request.setOrgid(orgId);
    let orgChatUsers: {} | null = null;
    console.log(request, "REQUEST", orgId);
    const instance = new FetchNworxUserServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchAllChatUsersFromOrganisationByLimit(
      request,
      metadata,
      async (err: any, response: any) => {
        try {
          const parsedResponse = JSON.parse(response);
          orgChatUsers = parsedResponse?.response;
          console.log(parsedResponse, "PARSED RESPONSE");
          //@ts-ignore
          resolve(orgChatUsers);
        } catch (error) {
          console.log(error, " error");
          reject(error);
        }
      }
    );
    return { orgChatUsers: orgChatUsers };
  });
};
