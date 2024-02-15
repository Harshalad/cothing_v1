import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { UpdatePostServiceClient } from "../../../constants/proto/updatePosts/update-posts_grpc_web_pb";
//@ts-ignore
import { AddReplyToCommentRequest } from "../../../constants/proto/updatePosts/update-posts_pb";
import { fetchToken } from "../../auth/token";

export const addReplyToComment = async ({
  userWorksheetId,
  userId,
  programId,
  userGoalId,
  postId,
  type,
  replyText,
  repliedByUserId,
  repliedByName,
  repliedByDesignation,
  repliedByRole,
  repliedByEmail,
  commentId,
  replyId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new AddReplyToCommentRequest();
    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);
    request.setPostid(postId);
    request.setType(type);
    request.setReplytext(replyText);
    request.setRepliedbyuserid(repliedByUserId);
    request.setRepliedbyname(repliedByName);
    request.setRepliedbydesignation(repliedByDesignation);
    request.setRepliedbyrole(repliedByRole);
    request.setRepliedbyemail(repliedByEmail);
    request.setUserworksheetid(userWorksheetId);
    request.setCommentid(commentId);
    request.setReplyid(replyId);

    const instance = new UpdatePostServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addReplyToComment(request, metadata, async (err, response) => {
      try {
        console.log("ADD REPLY TO COMMENT", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ADD REPLY TO COMMENT error");
        reject(error);
      }
    });
  });
};
