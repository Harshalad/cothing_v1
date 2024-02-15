import {
  Stack,
  Box,
  Avatar,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRef, useEffect } from "react";
import Spinner from "../../../../Spinner/Spinner";

export const AddReply = ({
  showReply,
  postIndex,
  postsLength,
  commentIndex,
  commmentsLength,
  user,
  replyText,
  setReplyText,
  replyLoading,
  onReplyToComment,
}: any) => {
  const addedReplyEndRef: any = useRef(null);

  const scrollToBottom = () => {
    addedReplyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (
      addedReplyEndRef &&
      postIndex + 1 === postsLength
      // commentIndex + 1 === commmentsLength
    ) {
      console.log("effect run", addedReplyEndRef);
      scrollToBottom();
    }
  }, [addedReplyEndRef, postIndex, postsLength, showReply]);

  if (!showReply) return <></>;

  return (
    <Stack className="aligngl_rply_txtfld_flex" id="rply_txtfld_input">
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
      <Box className="algn_askqust_txtfld aligngl_rply_txtfld">
        <TextField
          id="aligngl_rply_txtfld"
          placeholder="Write your reply here"
          variant="outlined"
          size="small"
          fullWidth
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          inputProps={{
            sx: { fontSize: "16px", color: "#1C2129" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {replyLoading ? (
                  <Spinner />
                ) : (
                  <img
                    src={"/images/icons/ask-question.svg"}
                    alt="Comment"
                    width={20}
                    height={17}
                    onClick={onReplyToComment}
                  ></img>
                )}
              </InputAdornment>
            ),
            sx: { cursor: "pointer" },
          }}
        />
      </Box>
    </Stack>
  );
};

export const Reply = ({ reply, showReply, setShowReply }: any) => {
  if (!reply) return <></>;
  return (
    <Box className="aligngl_reply_box">
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
            {reply?.repliedByName?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box>
          <Typography className="aligngl_auth_name">
            {reply?.repliedByName}
          </Typography>
          <Typography className="aligngl_auth_desg">
            {reply?.repliedByDesignation}
          </Typography>
        </Box>
      </Stack>
      <Typography className="aligngl_rply_answ">{reply?.replyText}</Typography>
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
            // addRplyTxtFld(2);
          }}
        >
          Reply
        </Typography>
      </Stack>
    </Box>
  );
};
