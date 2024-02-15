import { UpdateUserProgramServiceClient } from "../../../constants/proto/updateUserProgram/update-user-program_grpc_web_pb";
//@ts-ignore
import { AddAQinUserGoalRequest } from "../../../constants/proto/updateUserProgram/update-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { fetchToken } from "../../auth/token";

export const addAlignQuotientByExpert = async ({
  userId,
  programId,
  goalId,
  alignmentQuotient,
  expertUserId,
  expertUserName,
}: any) => {
  console.log({
    userId,
    programId,
    goalId,
    alignmentQuotient,
    expertUserId,
    expertUserName,
  });
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new AddAQinUserGoalRequest();
    request.setGoalid(goalId);
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setRating(alignmentQuotient.rating);
    request.setFeedback(alignmentQuotient.feedback);
    request.setExpertuserid(expertUserId);
    request.setExpertusername(expertUserName);

    console.log(request, "req");
    //@ts-ignore
    const instance = new UpdateUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addAQinUserGoal(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ALIGN/UPDATE_USER_GOAL_PURPOSES error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};
