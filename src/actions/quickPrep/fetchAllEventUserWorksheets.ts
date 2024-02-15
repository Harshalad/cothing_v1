import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { FetchUserWorksheetQuickPrepServiceClient } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_grpc_web_pb";
//@ts-ignore
import { FetchUserWorksheetQuickPrepRequest } from "../../constants/proto/quickprep/fetch-user-work-sheet-quick-prep_pb";
import { fetchToken } from "../auth/token";

export const fetchAllEventUserWorksheets = async ({ userId, programId }: any) => {
    const metadata = await fetchToken();
    return new Promise((resolve, reject) => {
        console.log(userId,programId,"dajskdbas");
        const request = new FetchUserWorksheetQuickPrepRequest();
        // request.setAppname("nworx_user_app");
        request.setProgramid(programId);
        request.setUserid(userId);
        let allEventPreps: {} | null = null;

        const instance = new FetchUserWorksheetQuickPrepServiceClient(
            NWORX_GRPC_HOSTNAME,
            null,
            null
        );
        console.log(request, "requestsdsddsf");

        instance.fetchAllEventUserWorksheets(
            request,
            metadata,
            async (err, response) => {
                try {
                    console.log("dfsdkj", request,response);
                    const parsedResponse = JSON.parse(response);
                    console.log(parsedResponse);
                    allEventPreps = parsedResponse?.response;
                   
                    //@ts-ignore
                    resolve(allEventPreps);
                } catch (error) {
                    console.log(error, " fetchAllEventUserWorksheets error");
                    reject(error);
                }
            }
        );
        return { allEventPreps: allEventPreps };
    });
};
