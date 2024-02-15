import {
  Stack,
  Box,
  Avatar,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { addReplyToComment } from "../../../../../actions/align/posts/addReplyToComment";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
import Spinner from "../../../Spinner/Spinner";
import { Reply, AddReply } from "./Reply/Reply";
import { useSelector } from "react-redux";
import { logUserEngagement } from "../../../../../actions/actionCenter/logUserEngagement";
import React from "react";
export const AddComment = ({
  showComment,
  commentText,
  setCommentText,
  commentLoading,
  onAddComment,
  postIndex,
  postsLength,
  user,
  scrollToBottomOfPosts,
}: any) => {
  const addedCommentEndRef: any = useRef(null);

  const scrollToBottom = () => {
    addedCommentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (addedCommentEndRef && postIndex + 1 === postsLength) {
      console.log("effect run", addedCommentEndRef);
      scrollToBottom();
    }
  }, [addedCommentEndRef, postIndex, postsLength, showComment]);

  if (!showComment) return <></>;

  return (
    <>
      <Stack className="aligngl_cmnt_txtfld_flex" id="cmnt_txtfld_input">
        <Box>
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              bgcolor: "#DFFFF2",
              color: "#1BAD70",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {user?.name?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box className="algn_askqust_txtfld aligngl_cmnt_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Write your reply here"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#1C2129" },
            }}
            value={commentText}
            multiline
            onKeyDown={(e) => {
              if (
                ((e.key === "Enter" && e.shiftKey) ||
                  (e.key === "Enter" && e.ctrlKey)) &&
                commentText?.length > 0
              ) {
                e.preventDefault();
                setCommentText((prevChatText:any) => prevChatText + "\n");
              } else if (e.key === "Enter" && commentText.trim() !== "") {
                e.preventDefault();
                onAddComment( );
              }
            }}
            onChange={(e) => setCommentText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {commentLoading ? (
                    <Spinner />
                  ) : (
                    <img
                      src={"/images/icons/ask-question.svg"}
                      alt="Comment"
                      width={20}
                      height={17}
                      onClick={onAddComment}
                    ></img>
                  )}
                </InputAdornment>
              ),
              sx: { cursor: "pointer" },
            }}
          />
        </Box>
      </Stack>
      <div ref={addedCommentEndRef} />
    </>
  );
};

export const Comment = ({
  comment,
  goal,
  post,
  type,
  reportee,
  currentUserRole,
  userWorkSheetId,
  postIndex,
  postsLength,
  commentIndex,
  commentsLength,
  scrollToBottomOfPosts,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const onReplyToComment = async () => {
    try {
      setReplyLoading(true);
      const response = await addReplyToComment({
        userWorksheetId: userWorkSheetId,
        userId:
          currentUserRole === MANAGER_VIEW_STATE.LP
            ? user?.id
            : reportee?.userId
            ? reportee?.userId
            : reportee?.id,
        programId:
          currentUserRole === MANAGER_VIEW_STATE.LP
            ? user?.activeProgramId
            : reportee?.programId
            ? reportee?.programId
            : reportee?.activeProgramId,
        userGoalId: goal?.id,
        postId: post?.id,
        type,
        replyText,
        repliedByUserId: user?.id,
        repliedByName: user?.name,
        repliedByDesignation: user?.designation,
        repliedByRole: currentUserRole,
        repliedByEmail: user?.email,
        commentId: comment?.id,
        replyId: new Date().valueOf().toString(),
      });

      if(currentUserRole === MANAGER_VIEW_STATE.LP){
        logUserEngagement({
          userId: user?.id,
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "engagement",
          action: "employee_comment_align",
          contentName: goal?.name,
          contentId: "NA",
          milestoneId: "NA",
          marks:2,
        });
      }

      setReplyText("");
      setReplyLoading(false);
      scrollToBottomOfPosts();
    } catch (error) {
      console.log(error);
      setReplyLoading(false);
    }
  };

  return (
    <Box className="aligngl_cmnt_box">
      <Stack className="aligngl_auth_flex">
        <Box>
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              bgcolor: "#DFFFF2",
              color: "#1BAD70",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {comment?.commentedByName?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box>
          <Typography className="aligngl_auth_name">
            {comment?.commentedByName}
          </Typography>
          <Typography className="aligngl_auth_desg">
            {comment?.commentedByDesignation}
          </Typography>
        </Box>
      </Stack>
      <Typography className="aligngl_cmnt_answ">
        {/* {comment?.commentText} */}
        {comment?.commentText
          .trim()
          .split("\n")
          .map((line: any, index: any) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Typography>
      <Stack className="aligngl_cmnt_cta_flex">
        <img
          src={"/images/icons/reply.svg"}
          alt="comment"
          width={9}
          height={12}
        ></img>
        <Typography
          className="aligngl_cmnt_cta_heading"
          onClick={() => {
            setShowReply(!showReply);
          }}
        >
          Reply
        </Typography>
      </Stack>
      {comment?.replies?.length
        ? comment?.replies?.map((reply: any, index: number) => {
            return (
              <Reply
                reply={reply}
                key={index}
                showReply={showReply}
                setShowReply={setShowReply}
              />
            );
          })
        : null}

      <AddReply
        showReply={showReply}
        commentIndex={commentIndex}
        commentsLength={commentsLength}
        postIndex={postIndex}
        postsLength={postsLength}
        user={user}
        replyText={replyText}
        setReplyText={setReplyText}
        replyLoading={replyLoading}
        onReplyToComment={onReplyToComment}
      />
    </Box>
  );
};
