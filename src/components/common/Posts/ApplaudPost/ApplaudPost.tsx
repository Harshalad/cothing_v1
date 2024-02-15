import { Box, Typography } from "@mui/material";

const ApplaudPost = ({ post }: any) => {
  console.log(post);
  return (
    <Box className="aligngl_quest_box">
      <Typography className="aligngl_quest_heading mb">
        {post?.postedByName} has applauded {post?.postedToName}
      </Typography>
      <Typography className="aligngl_quest_heading">
        Appreciation Note
      </Typography>
      <Typography className="aligngl_post_answ">
        {post?.typeAttributes?.messageText}
      </Typography>
    </Box>
  );
};

export default ApplaudPost;
