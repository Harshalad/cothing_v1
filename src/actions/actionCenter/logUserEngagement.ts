import { LogCuriosityEnagementServiceClient } from "../../constants/proto/logCuriosityAndEngagement/log-engagement-curiosity_grpc_web_pb";
//@ts-ignore
import { LogCuriosityEnagementRequest } from "../../constants/proto/logCuriosityAndEngagement/log-engagement-curiosity_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const logUserEngagement = async ({ userId, programId, goalId, milestoneId, contentId, action, contentName, marks, type  }: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new LogCuriosityEnagementRequest();

	// string userId = 1;
	// string programId = 2;
	// string goalId = 3;
	// string milestoneId = 4;
	// string contentId = 5;
	// string action = 6;
	// string contentName = 7;
	// int32 marks = 8;
	// string type = 9;

    request.setUserid(userId);
    request.setProgramid(programId);
    request.setGoalid(goalId);
    request.setMilestoneid(milestoneId);
    request.setContentid(contentId);
    request.setAction(action);
    request.setContentname(contentName);
    request.setMarks(marks);
    request.setType(type);

    let response: {} | null = null;

    const instance = new LogCuriosityEnagementServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );

    
    instance.logCuriosityEnagement(request, metadata, async (err, response) => {
      try {
        console.log(request,'request object log');
        console.log("logCuriosityEnagement Response", response, err);
        response = JSON.parse(response);
        console.log(response, "logCuriosityEnagement ");
        //@ts-ignore
        resolve({ response: response?.response });
      } catch (error) {
        console.log(error, "logCuriosityEnagement error");
        reject(error);
      }
    });
    return { response: response };
  });
};
