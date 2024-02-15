import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {CompleteMethodStatusRequest,GoalDetail,EventDetail,
} from "../../constants/proto/update-status/status-update_pb";
import { MethodStatusUpdateServiceClient } from "../../constants/proto/update-status/status-update_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const completeMethodStatus = async ({
  userId,
  milestoneId,
  methodId,
  goalId,
  programId,
  userEventId,
  userContentId,
  userMethodId,
}: any) => {
  const metadata = await fetchToken();

  return new Promise((resolve, reject) => {
    const request = new CompleteMethodStatusRequest();

    const goalDetails = new GoalDetail();
    goalDetails.setUserid(userId);
    goalDetails.setProgramid(programId);
    goalDetails.setUsergoalid(goalId);
    goalDetails.setMilestoneid(milestoneId);
    goalDetails.setMethodid(methodId);

    const eventDetails = new EventDetail();
    eventDetails.setUsereventid(userEventId);
    eventDetails.setUsercontentid(userContentId);
    eventDetails.setUsermethodid(userMethodId);

    request.setGoaldetails(goalDetails);
    request.setEventdetails(eventDetails);
    const instance = new MethodStatusUpdateServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.completeMethodStatus(
      request,
      metadata,
      async (err, response) => {
        try {
          console.log(
            "completeMethodStatus request:",request,"response",
            response,
          );
          const parsedResponse = JSON.parse(response);
          //   //@ts-ignore
          console.log("completeMethodStatus parsedResponse",parsedResponse);
          if (parsedResponse?.statusCode === 0) {
            resolve(parsedResponse);
          }
        } catch (error) {
          console.log(
            error,
            "completeMethodStatus error"
          );
          reject(error);
        }
      }
    );
  });
};
