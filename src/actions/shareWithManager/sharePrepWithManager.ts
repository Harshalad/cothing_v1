//@ts-ignore
import {ShareManagerPrepRequest} from "../../constants/proto/shareWithManager/share-manager-prep_pb";
import {ShareManagerServiceClient} from "../../constants/proto/shareWithManager/share-manager-prep_grpc_web_pb";

import { fetchToken } from "../auth/token";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";

export const sharePrepWithManager = async ({ userId, programId,qp,shareManager,worksheetId }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new ShareManagerPrepRequest();
    request.setProgramid(programId);
    request.setUserid(userId);
    request.setWorksheetid(worksheetId);
    request.setQp(qp);
    request.setSharemanager(shareManager);


    const instance = new ShareManagerServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.sharePrepWithManager(
      request,
      metadata,
      async (err, response) => {
        try {
          const parsedResponse = JSON.parse(response);
          console.log(parsedResponse);
          
          console.log("sharePrepWithManager request, response, errror", request,response,err);
        } catch (error) {
          console.log(error, " sharePrepWithManager error");
          reject(error);
        }
      }
    );
  });
};