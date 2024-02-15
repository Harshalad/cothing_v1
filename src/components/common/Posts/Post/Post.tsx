import {
  Avatar,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import QuestionAreaPost from "../QuestionAreaPost/QuestionAreaPost";
import {useEffect,useRef,useState} from "react";
import {useSelector} from "react-redux";
import Spinner from "../../Spinner/Spinner";
import {addComment} from "../../../../actions/align/posts/addComment";
import {addReplyToComment} from "../../../../actions/align/posts/addReplyToComment";
import UnstructuredQuestionPost from "../UnstructuredQuestionPost/UnstructuredQuestionPost";
import {MANAGER_VIEW_STATE} from "../../../../constants/auth";
import GoalOverviewPost from "../GoalOverviewPost/GoalOverviewPost";
import RejectionReasonPost from "../RejectionReasonPost/RejectionReasonPost";
import GoalApprovedPost from "../GoalApprovedPost/GoalApprovedPost";
import RatingsPost from "../RatingsPost/RatingsPost";
import {Comment,AddComment} from "./Comment/Comment";
import AlignmentQuotientPost from "../AlignmentQuotientPost/AlignmentQuotientPost";
import {logUserEngagement} from "../../../../actions/actionCenter/logUserEngagement";
import CheckInPost from "../CheckInPost/CheckInPost";
import ApplaudPost from "../ApplaudPost/ApplaudPost";
import CustomGoalApprovedPost from "../CustomGoalApprovedPost";
import CustomGoalApproveRejectionPost from "../CustomGoalApproveRejectionPost";
import CustomGoalOverviewPost from "../CustomGoalOverviewPost";

const Post=({
  post,
  goal,
  type,
  reportee,
  currentUserRole,
  userWorkSheetId,
  postIndex,
  postsLength,
  scrollToBottomOfPosts,
}: any) => {
  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);
  const [commentText,setCommentText]=useState("");
  const [commentLoading,setCommentLoading]=useState(false);
  const [showComment,setShowComment]=useState(false);
  console.log(post,"postpost");

  const onAddComment=async () => {
    setCommentLoading(true);
    try {
      await addComment({
        userWorksheetId: userWorkSheetId,
        userId:
          currentUserRole===MANAGER_VIEW_STATE.LP
            ? user?.id
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
        postId: post?.id,
        type,
        commentText,
        commentedByUserId: user?.id,
        commentedByName: user?.name,
        commentedByDesignation: user?.designation,
        commentedByRole: currentUserRole,
        commentedByEmail: user?.email,
        commentId: new Date().valueOf().toString(),
      });

      if(currentUserRole===MANAGER_VIEW_STATE.LP) {
        logUserEngagement({
          userId: user?.id,
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "engagement",
          action: "employee_added_comment",
          contentName: goal?.name,
          contentId: "NA",
          milestoneId: "NA",
          marks: 1,
        });
      }

      setCommentText("");
      setCommentLoading(false);
      scrollToBottomOfPosts();
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Box className="aligngl_quest_cont">
      {post?.typeAttributes?.type==="QUESTION_TEXT_AND_AREA"? (
        <QuestionAreaPost post={post} />
      ):post?.typeAttributes?.type==="UNSTRUCTURED_QUESTION"? (
        <UnstructuredQuestionPost post={post} />
      ):post?.typeAttributes?.type==="GOAL_OVERVIEW_POST"? (
        <GoalOverviewPost post={post} />
      ):post?.typeAttributes?.type==="APPROVE_GOAL_POST"? (
        <GoalApprovedPost post={post} />
      ):post?.typeAttributes?.type==="REJECTION_GOAL_POST"? (
        <RejectionReasonPost post={post} />
      ):post?.typeAttributes?.type==="RATINGS_POST"? (
        <RatingsPost post={post} />
      ):post?.typeAttributes?.type==="ALIGNMENT_QUOTIENT_POST"? (
        <AlignmentQuotientPost post={post} />
      ):post?.typeAttributes?.type==="CHECK_IN_POST"? (
        <CheckInPost post={post} />
      ):post?.typeAttributes?.type==="APPLAUD_POST"? (
        <ApplaudPost post={post} />
      ):post?.typeAttributes?.type==="CUSTOM_APPROVE_GOAL_POST"?
        <CustomGoalApprovedPost post={post} />
        :post?.typeAttributes?.type==="CUSTOM_REJECTION_GOAL_POST"?
          <CustomGoalApproveRejectionPost post={post} />
          :post?.typeAttributes?.type==="CUSTOM_GOAL_OVERVIEW_POST"?
            <CustomGoalOverviewPost post={post} />
            :null}
      {post?.typeAttributes?.type!=="APPROVE_GOAL_POST"&&
        ((currentUserRole===MANAGER_VIEW_STATE.EXPERT&&
          (post.postedToUserId===user?.id||
            post.postedByUserId===user?.id))||
          currentUserRole!==MANAGER_VIEW_STATE.EXPERT)? (
        <Stack
          className="aligngl_cmnt_cta_flex"
          sx={{marginTop: "10px"}}
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <img
            src={"/images/icons/comment.svg"}
            alt="comment"
            width={12}
            height={11}
          ></img>
          {/* discuss change here */}
          <Typography className="aligngl_cmnt_cta_heading">Reply</Typography>
        </Stack>
      ):null}
      {post?.comments&&post?.comments?.length
        ? post.comments.map((comment: any,index: number) => {
          return (
            <Comment
              comment={comment}
              key={index}
              goal={goal}
              post={post}
              type={type}
              reportee={reportee}
              currentUserRole={currentUserRole}
              userWorkSheetId={userWorkSheetId}
              postIndex={postIndex}
              postsLength={postsLength}
              commentIndex={index}
              commentsLength={post?.comments?.length}
              scrollToBottomOfPosts={scrollToBottomOfPosts}
            />
          );
        })
        :null}

      {(currentUserRole===MANAGER_VIEW_STATE.EXPERT&&
        (post.postedToUserId===user?.id||
          post.postedByUserId===user?.id))||
        currentUserRole!==MANAGER_VIEW_STATE.EXPERT? (
        <AddComment
          showComment={showComment}
          commentText={commentText}
          setCommentText={setCommentText}
          commentLoading={commentLoading}
          onAddComment={onAddComment}
          postIndex={postIndex}
          postsLength={postsLength}
          user={user}
          scrollToBottomOfPosts={scrollToBottomOfPosts}
        />
      ):null}
    </Box>
  );
  return <></>;
};

export default Post;
