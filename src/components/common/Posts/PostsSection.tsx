import {useState,useEffect,useRef} from "react";
import {fetchPostsByStreaming} from "../../../actions/align/posts/fetchPosts";
import {useSelector} from "react-redux";
import FloatingPostCreator from "./FloatingPostCreator/FloatingPostCreator";
import {Avatar,Box,Divider,Rating,Stack,Typography} from "@mui/material";
import Spinner from "../Spinner/Spinner";
import AskQuestionPost from "./AskQuestionPost/AskQuestionPost";
import Post from "./Post/Post";
import {MANAGER_VIEW_STATE} from "../../../constants/auth";
import ApproveRejectGoal from "./ApproveRejectGoal/ApproveRejectGoal";
import {isEmptyObject} from "../../../utils/isEmptyObject";
import AlignEmployeeQuotient from "./AlignEmployeeQuotient/AlignEmployeeQuotient";
import AlignExpertQuotient from "./AlignExpertQuotient/AlignExpertQuotient";
import {fetchQPPostsByStreaming} from "../../../actions/quickPrep/fetchQuickPrepWorksheetByStreaming";
import {Console} from "console";

const PostsSection=({
  preparePage,
  type,
  goal,
  showAskQuestion: passedShowAskQuestion,
  reportee,
  userWorkSheetId,
  fetchDirectReports,
  setShowGoalOverview,
}: any) => {
  const [postsLoading,setPostsLoading]=useState(false);
  const [showAskQuestion,setShowAskQuestion]=useState(
    passedShowAskQuestion? passedShowAskQuestion:false
  );
  const [postsObject,setPostsObject]=useState<any>(null);
  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);

  const currentUserRole=useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [updatePostFlag,setUpdatePostFlag]=useState(0);
  const [scrollDown,setScrollDown]=useState(false);

  let localPosts: any={};

  console.log("type 123456",type);

  useEffect(() => {
    if(Object.keys(localPosts)?.length) {
      setPostsObject(localPosts);
    }
  },[localPosts,updatePostFlag]);

  useEffect(() => {
    let instance: any=null;
    if(true) {
      const getPosts=async () => {
        let parsedResponse: any;
        try {
          setPostsLoading(true);

          instance=await fetchPostsByStreaming({
            type,
            userId:
              currentUserRole===MANAGER_VIEW_STATE.LP
                ? user.id
                :reportee?.userId
                  ? reportee?.userId
                  :reportee?.id,
            programId:
              currentUserRole===MANAGER_VIEW_STATE.LP
                ? user?.activeProgramId
                :reportee?.programId
                  ? reportee?.programId
                  :reportee?.activeProgramId,
            userGoalId: goal?.id,
          });

          setPostsLoading(false);

          instance.on("data",(response: any) => {
            console.log("DATA POSTS ALIGN ACHIEVE",response);

            parsedResponse=JSON.parse(response?.array?.[0]);
            console.log(parsedResponse,"parsedPostResponse");

            if(!isEmptyObject(parsedResponse)) {
              if(currentUserRole===MANAGER_VIEW_STATE.MANAGER) {
                if(
                  parsedResponse?.response?.document.postedToUserId===
                  user?.id||
                  parsedResponse?.response?.document.postedByUserId===user?.id
                ) {
                  localPosts[parsedResponse?.response?.document?.id]=
                    parsedResponse?.response?.document;
                }
              } else {
                localPosts[parsedResponse?.response?.document?.id]=
                  parsedResponse?.response?.document;
              }
            }
            setPostsObject(localPosts);
            setUpdatePostFlag((prevState: any) => prevState+1);

            setPostsLoading(false);
          });
        } catch(error) {
          console.log(error);
          setPostsLoading(false);
        }
      };

      const getPreparePosts=async () => {
        let parsedResponse: any;
        try {
          setPostsLoading(true);

          // instance = await fetchPostsByStreaming({
          //   type,
          //   userId:
          //     currentUserRole === MANAGER_VIEW_STATE.LP
          //       ? user.id
          //       : reportee?.userId,
          //   programId:
          //     currentUserRole === MANAGER_VIEW_STATE.LP
          //       ? user?.activeProgramId
          //       : reportee?.programId,
          //   uwsId: userWorkSheetId,
          // });

          if(type==="PREPARE") {
            instance=await fetchPostsByStreaming({
              type,
              userId:
                currentUserRole===MANAGER_VIEW_STATE.LP
                  ? user.id
                  :reportee?.userId
                    ? reportee?.userId
                    :reportee?.id,
              programId:
                currentUserRole===MANAGER_VIEW_STATE.LP
                  ? user?.activeProgramId
                  :reportee?.programId
                    ? reportee?.programId
                    :reportee?.activeProgramId,
              uwsId: userWorkSheetId,
            });
          } else {
            instance=await fetchQPPostsByStreaming({
              type,
              userId:
                currentUserRole===MANAGER_VIEW_STATE.LP
                  ? user.id
                  :reportee?.userId
                    ? reportee?.userId
                    :reportee?.id,
              programId:
                currentUserRole===MANAGER_VIEW_STATE.LP
                  ? user?.activeProgramId
                  :reportee?.programId
                    ? reportee?.programId
                    :reportee?.activeProgramId,
              uwsId: userWorkSheetId,
            });
          }
          console.log(instance,"adadadatya");
          instance.on("data",(response: any) => {
            console.log("DATA POSTS PREPARE",response);
            parsedResponse=JSON.parse(response?.array?.[0]);
            if(!isEmptyObject(parsedResponse)) {
              if(currentUserRole===MANAGER_VIEW_STATE.MANAGER) {
                if(
                  parsedResponse?.response?.document.postedToUserId===
                  user?.id||
                  parsedResponse?.response?.document.postedByUserId===user?.id
                ) {
                  localPosts[parsedResponse?.response?.document?.id]=
                    parsedResponse?.response?.document;
                }
              } else {
                localPosts[parsedResponse?.response?.document?.id]=
                  parsedResponse?.response?.document;
              }
            }
            setPostsObject(localPosts);
            setUpdatePostFlag((prevState: any) => prevState+1);

            setPostsLoading(false);
          });
        } catch(error) {
          console.log(error);
          setPostsLoading(false);
        }
      };

      if(
        currentUserRole===MANAGER_VIEW_STATE.EXPERT||
        currentUserRole===MANAGER_VIEW_STATE.LP||
        currentUserRole===MANAGER_VIEW_STATE.MANAGER
      ) {
        if(type==="PREPARE"||type==="QUICK_PREPARE") {
          getPreparePosts();
        } else {
          getPosts();
        }
      }
    }
    return () => {
      if(instance) {
        instance?.cancel();
      }
    };
  },[goal?.id,type,user?.activeProgramId,reportee,user?.id]);

  const postsEndRef: any=useRef(null);

  const scrollToBottomOfPosts=() => {
    postsEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottomOfPosts();
  },[updatePostFlag,postsLoading]);

  return (
    <>
      <Box
        className="popup_right_box bgcolor aligngl_dtls_popup_rght"
      // sx={{ backgroundColor: "#ffffff" }}
      >
        {currentUserRole===MANAGER_VIEW_STATE.EXPERT&&type==="ALIGN"? (
          <AlignExpertQuotient
            preparePage={preparePage}
            reportee={reportee}
            goal={goal}
            fetchDirectReports={fetchDirectReports}
            setShowGoalOverview={setShowGoalOverview}
          />
        ):null}
        {(currentUserRole===MANAGER_VIEW_STATE.LP||
          currentUserRole===MANAGER_VIEW_STATE.JP)&&
          type==="ALIGN"? (
          <AlignEmployeeQuotient goal={goal} />
        ):null}
        {currentUserRole===MANAGER_VIEW_STATE.EXPERT||
          currentUserRole===MANAGER_VIEW_STATE.LP||
          currentUserRole===MANAGER_VIEW_STATE.MANAGER? (
          <Box className="aligngl_dtls_rght_innr">
            <Box className="aligngl_rght_innr_top">
              <Box className="aligngl_post_cont">
                {showAskQuestion? (
                  <AskQuestionPost
                    goal={goal}
                    showAskQuestion={showAskQuestion}
                    setShowAskQuestion={setShowAskQuestion}
                  />
                ):postsLoading? (
                  <Spinner />
                ):!isEmptyObject(postsObject)? (
                  <Posts
                    postsObject={postsObject}
                    goal={goal}
                    type={type}
                    currentUserRole={currentUserRole}
                    reportee={reportee}
                    userWorkSheetId={userWorkSheetId}
                    postsEndRef={postsEndRef}
                    scrollToBottomOfPosts={scrollToBottomOfPosts}
                  />
                ):(
                  <div>
                    <p style={{textAlign: "center"}}>
                      Send a message below to get started!
                    </p>
                  </div>
                )}
              </Box>
              <FloatingPostCreator
                showAskQuestion={!showAskQuestion}
                goal={goal}
                type={type}
                currentUserRole={currentUserRole}
                reportee={reportee}
                userWorkSheetId={userWorkSheetId}
                scrollToBottomOfPosts={scrollToBottomOfPosts}
              />
            </Box>
          </Box>
        ):null}
        {
          // TOSO SATEESH FIX LOGIC FOR HIDING APPROVE OR REJECT GOAL BY MANAGER CHECK FOR SENT FOR APPROVAL
          currentUserRole===MANAGER_VIEW_STATE.MANAGER&&
            goal?.status==="SENT_FOR_APPROVAL"? (
            <ApproveRejectGoal
              reportee={reportee}
              goal={goal}
              fetchDirectReports={fetchDirectReports}
              setShowGoalOverview={setShowGoalOverview}
            />
          ):null
        }
        {/* <DiscussionWithRating /> */}
      </Box>
    </>
  );
};

export default PostsSection;

const Posts=({
  postsObject,
  goal,
  type,
  currentUserRole,
  reportee,
  userWorkSheetId,
  postsEndRef,
  scrollToBottomOfPosts,
}: any) => {
  return (
    <div>
      {Object.entries(postsObject)
        ?.sort((a: any,b: any) => a[1]?.id-b[1]?.id)
        ?.map((post: any,index: number) => {
          return (
            <>
              <Post
                post={post[1]}
                key={index}
                goal={goal}
                type={type}
                currentUserRole={currentUserRole}
                reportee={reportee}
                userWorkSheetId={userWorkSheetId}
                postIndex={index}
                postsLength={Object.entries(postsObject)?.length}
                scrollToBottomOfPosts={scrollToBottomOfPosts}
              />
              <Divider className="aligngl_status_hr" />
            </>
          );
        })}
      <div ref={postsEndRef} />
    </div>
  );
};
