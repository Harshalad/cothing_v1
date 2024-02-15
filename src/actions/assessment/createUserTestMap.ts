import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
//@ts-ignore
import {CreateUserTestRequest,TestEventDetail,TestGoalDetail} from "../../constants/proto/assessment/assessment_pb";
import { AssessmentServiceClient } from "../../constants/proto/assessment/assessment_grpc_web_pb";
import { fetchToken } from "../auth/token";

export const createUserTestMap = async ({
  userId,
  testId,
  role,
  type,
  batteryGroupId,
  parentTestId,
  batteryId,
  startDate,
  endDate,
  attemptNo,
  programId,
  userGoalId,
  milestoneId,
  methodId,
  userEventId,
  userContentId,
  userMethodId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new CreateUserTestRequest();
    const testEventDetail = new TestEventDetail();
    const testGoalDetail = new TestGoalDetail();
    request.setUserid(userId);
    request.setTestid(testId);
    request.setRole(role);
    request.setType(type);
    request.setBatterygroupid(batteryGroupId);
    request.setParenttestid(parentTestId);
    request.setBatteryid(batteryId);
    request.setStartdate(startDate);
    request.setEnddate(endDate);
    request.setNoofattempts(attemptNo);
    

    testEventDetail.setUsereventid(userEventId);
    testEventDetail.setUsercontentid(userContentId);
    testEventDetail.setUsermethodid(userMethodId);
    request.setEventdetails(testEventDetail);

    testGoalDetail.setUserid(userId);
    testGoalDetail.setProgramid(programId);
    testGoalDetail.setUsergoalid(userGoalId);
    testGoalDetail.setMilestoneid(milestoneId);
    testGoalDetail.setMethodid(methodId);
    
    request.setGoaldetails(testGoalDetail);


    let userTestId: {} | null = null;
    const instance = new AssessmentServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    console.log(request, "1234");
    instance.createUserTestMap(request, metadata, async (err, response) => {
      try {
        console.log("createUserTestMap:", request, "response", response);
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse, "parsedResponse");
        userTestId = parsedResponse?.response;
        resolve(userTestId);
      } catch (error) {
        console.log(error, "createUserTestMap details error");
        reject(error);
      }
    });
    return { userTestId: userTestId };
  });
};
