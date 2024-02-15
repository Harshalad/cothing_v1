import { Box, Typography } from "@mui/material";

const CheckInPost = ({ post }: any) => {
  console.log(post);
  return (
    <Box className="aligngl_quest_box">
      <Typography className="aligngl_quest_heading mb">
        {post?.postedByName} has checked-in with {post?.postedToName}
      </Typography>
      <Typography className="aligngl_quest_heading">
        What is this check-in about?
      </Typography>
      <Typography className="aligngl_post_answ">
        {post?.typeAttributes?.category}
      </Typography>
      <Typography className="aligngl_quest_heading mt">
        Share your response to the following question by {post?.postedByName}
      </Typography>
      <Typography className="aligngl_post_answ">
        {post?.typeAttributes?.question}
      </Typography>
    </Box>
  );
};

export default CheckInPost;
