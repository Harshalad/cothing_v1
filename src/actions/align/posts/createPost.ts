import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { UpdatePostServiceClient } from "../../../constants/proto/updatePosts/update-posts_grpc_web_pb";
//@ts-ignore
import { CreatePostRequest } from "../../../constants/proto/updatePosts/update-posts_pb";
import { fetchToken } from "../../auth/token";

export const createPost = async ({
  userWorksheetId,
  userId,
  programId,
  userGoalId,
  type,
  title,
  text,
  subText,
  typeAttributes,
  postedByUserId,
  postedByName,
  postedByDesignation,
  postedByRole,
  postedByEmail,
  id,
  postedToName,
  postedToUserId,
  postedToRole,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    console.log(typeAttributes, "TYPE ATTRIBUTESs");
    const request = new CreatePostRequest();

    let typeAttributeMap = request.getPosttypeattributesMap();

    request.setUserid(userId);
    request.setProgramid(programId);
    request.setUsergoalid(userGoalId);
    request.setType(type);
    request.setTitle(title);
    request.setText(text);
    request.setSubtext("subText");

    Object.entries(typeAttributes).forEach((attribute: any, index: number) => {
      console.log(attribute, userGoalId, "loop attriute");
      typeAttributeMap.set(attribute[0].toString(), attribute[1].toString());
    });


    request.setPostedbyuserid(postedByUserId);
    request.setPostedbyname(postedByName);
    request.setPostedbydesignation(postedByDesignation);
    request.setPostedbyrole(postedByRole);
    request.setPostedbyemail(postedByEmail);
    request.setId(id);
    request.setUserworksheetid(userWorksheetId);
    request.setPostedtoname(postedToName);
    request.setPostedtouserid(postedToUserId);
    request.setPostedtorole(postedToRole);
    console.log(request.getPosttypeattributesMap(), " loop ");

    console.log(request, "request loop");
    const instance = new UpdatePostServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.createPost(request, metadata, async (err, response) => {
      try {
        console.log("CREATE_POST loop ", response, err);
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "create post error_");
        reject(error);
      }
    });
  });
};
