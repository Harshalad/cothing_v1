import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { UpdatePostServiceClient } from "../../../constants/proto/updatePosts/update-posts_grpc_web_pb";
//@ts-ignore
import { AddCommentRequest } from "../../../constants/proto/updatePosts/update-posts_pb";
import { fetchToken } from "../../auth/token";

export const addComment = async ({
  userWorksheetId,
  userId,
  programId,
  userGoalId,
  postId,
  type,
  commentText,
  commentedByUserId,
  commentedByName,
  commentedByDesignation,
  commentedByRole,
  commentedByEmail,
  commentId,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new AddCommentRequest();

    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);
    request.setPostid(postId);
    request.setType(type);
    request.setCommenttext(commentText);
    request.setCommentedbyuserid(commentedByUserId);
    request.setCommentedbyname(commentedByName);
    request.setCommentedbydesignation(commentedByDesignation);
    request.setCommentedbyrole(commentedByRole);
    request.setCommentedbyemail(commentedByEmail);
    request.setUserworksheetid(userWorksheetId);
    request.setCommentid(commentId);

    const instance = new UpdatePostServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addComment(request, metadata, async (err, response) => {
      try {
        console.log("ADD COMMENT", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ADD COMMENT error");
        reject(error);
      }
    });
  });
};
