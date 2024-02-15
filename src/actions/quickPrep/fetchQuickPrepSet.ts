import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchQuickPrepSetServiceClient } from "../../constants/proto/quickprep/fetch-quick-prep-set_grpc_web_pb";
//@ts-ignore
import { FetchQuickPrepSetRequest } from "../../constants/proto/quickprep/fetch-quick-prep-set_pb";
import { fetchToken } from "../auth/token";

export const fetchQuickPrepSet = async (programId: string) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchQuickPrepSetRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    let quickPrepSet: {} | null = null;

    const instance = new FetchQuickPrepSetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.fetchQuickPrepSetCategories(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        quickPrepSet = parsedResponse?.response;
        //@ts-ignore
        resolve(quickPrepSet);
      } catch (error) {
        console.log(error, " error");
        reject(error);
      }
    });
    return { quickPrepSet: quickPrepSet };
  });
};
