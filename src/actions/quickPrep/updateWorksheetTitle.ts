import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { UpdateUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { UpdateUserWorksheetQuickPrepRequest } from "../../constants/proto/quickprep/update-user-work-sheet-quick-prep_pb";
import { fetchToken } from "../auth/token";

// updateWorksheetTitle(UpdateUserWorksheetQuickPrepRequest)
export const updateWorksheetTitle = async ({
  programId,
  userId,
  userWorkSheetId,
  worksheetId,
  title,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new UpdateUserWorksheetQuickPrepRequest();
    // request.setAppname("nworx_user_app");
    request.setProgramid(programId);
    request.setUserid(userId);
    request.setUserworksheetid(userWorkSheetId);
    request.setWorksheetid(worksheetId);
    request.setTitle(title);

    let quickPrepSet: {} | null = null;

    const instance = new UpdateUserWorksheetQuickPrepServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    instance.updateWorksheetTitle(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
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
