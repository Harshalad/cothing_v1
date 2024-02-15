import { useState } from "react";
import { Box, Typography, Divider, Stack, Avatar, Rating } from "@mui/material";

const RatingsPost = ({ post }: any) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      {post?.typeAttributes?.ratedByRole === "EXPERT" ? (
        <ExpertRatingsPost post={post} />
      ) : post?.typeAttributes?.ratedByRole === "MANAGER" ? (
        <ManagerRatingPost post={post} />
      ) : null}
    </>
  );
};

export default RatingsPost;

const ManagerRatingPost = ({ post }: any) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  console.log(post);
  const generalComment = post?.typeAttributes?.generalComment;
  return (
    <Box className="prep_fedbck_msg_box">
      <Stack className="aligngl_auth_flex">
        <Box>
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              bgcolor: "#DFFFF2",
              color: "#1BAD70",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {post?.typeAttributes?.ratedBy?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box>
          <Typography className="aligngl_auth_name">
            {" "}
            {post?.typeAttributes?.ratedBy}
          </Typography>
        </Box>
      </Stack>
      <Typography className="prep_msg_text">
        Your Manager has shared their rating/feedback with you
      </Typography>
      <Typography className="prep_msg_subtitle">Rating</Typography>
      <Rating
        name="quality rating"
        value={post?.typeAttributes?.rating}
        readOnly
        className="prep_rating"
      />
      <Box className="prep_msg_text_box">
        <Typography className="prep_more_text">
          {isReadMore
            ? generalComment.length > 50
              ? generalComment.slice(0, 50) + "..."
              : generalComment
            : generalComment}
        </Typography>
        {generalComment?.length > 50 ? (
          <span className="prep_msg_readmore" onClick={toggleReadMore}>
            {isReadMore ? "Read more" : "Read less"}
          </span>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

const ExpertRatingsPost = ({ post }: any) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const qualityComment = post?.typeAttributes?.qualityComment;
  const thoroughnessComment = post?.typeAttributes?.thoroughnessComment;
  return (
    <Box className="prep_fedbck_msg_box">
      <Stack className="aligngl_auth_flex">
        <Box>
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              bgcolor: "#DFFFF2",
              color: "#1BAD70",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {post?.typeAttributes?.ratedBy?.substring(0, 1)}
          </Avatar>
        </Box>
        <Box>
          <Typography className="aligngl_auth_name">
            {post?.typeAttributes?.ratedBy}
          </Typography>
        </Box>
      </Stack>
      <Typography className="prep_msg_text">
        Your Expert has shared their rating/feedback with you
      </Typography>
      <Typography className="prep_msg_subtitle">Quality Rating</Typography>
      <Rating
        name="quality rating"
        value={post?.typeAttributes?.qualityRating}
        readOnly
        className="prep_rating"
      />
      <Box className="prep_msg_text_box">
        <Typography className="prep_more_text">
          {isReadMore
            ? qualityComment.length > 50
              ? qualityComment.slice(0, 50) + "..."
              : qualityComment
            : qualityComment}
        </Typography>
        {qualityComment.length > 50 ? (
          <span className="prep_msg_readmore" onClick={toggleReadMore}>
            {isReadMore ? "Read more" : "Read less"}
          </span>
        ) : (
          ""
        )}
      </Box>
      <Typography className="prep_msg_subtitle">Thoroughness Rating</Typography>
      <Rating
        name="quality rating"
        value={post?.typeAttributes?.thoroughnessRating}
        readOnly
        className="prep_rating"
      />
      <Box className="prep_msg_text_box">
        <Typography className="prep_more_text">
          {isReadMore
            ? thoroughnessComment.length > 50
              ? thoroughnessComment.slice(0, 50) + "..."
              : thoroughnessComment
            : thoroughnessComment}
        </Typography>
        {thoroughnessComment.length > 50 ? (
          <span className="prep_msg_readmore" onClick={toggleReadMore}>
            {isReadMore ? "Read more" : "Read less"}
          </span>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

const RatingsQuestionPost = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const text = "hi";
  return (
    <Box className="prep_ask_msg_box">
      <Typography className="prep_msg_title">
        You have asked a question to Mathew
      </Typography>
      <Typography className="prep_msg_subtitle">Your Question</Typography>
      <Box className="prep_msg_text_box">
        <Typography className="prep_msg_text">
          This goal is not aligned with next 6 month team goals
        </Typography>
      </Box>
    </Box>
  );
};

const RequestedRatingPost = ({ post }: any) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const text = "hi";
  return (
    <Box className="prep_msg_box">
      <Typography className="prep_msg_title">
        You have requested for rating from NWORX Expert/Manager
      </Typography>
      <Typography className="prep_msg_subtitle">Reason</Typography>
      <Box className="prep_msg_text_box">
        <Typography className="prep_msg_text">
          {isReadMore
            ? text.length > 200
              ? text.slice(0, 200) + "..."
              : text
            : text}
        </Typography>
        {text.length > 200 ? (
          <span className="prep_msg_readmore" onClick={toggleReadMore}>
            {isReadMore ? "Read more" : "Read less"}
          </span>
        ) : (
          ""
        )}
      </Box>
      <Divider className="prep_msg_hr" />
    </Box>
  );
};
