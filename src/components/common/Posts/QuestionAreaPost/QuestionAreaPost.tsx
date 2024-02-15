import { Box, Stack, Typography } from "@mui/material";

const QuestionAreaPost = ({ post }: any) => {
  return (
    <Box className="aligngl_quest_box">
      <Typography className="aligngl_quest_heading mb">
        You have asked a question to {post?.postedToName}
      </Typography>
      <Typography className="aligngl_quest_heading">
        Your Question Area
      </Typography>
      <Typography className="aligngl_post_answ">
        {post?.typeAttributes?.questionArea}
      </Typography>
      <Typography className="aligngl_quest_heading mt">
        Your Question
      </Typography>
      <Typography className="aligngl_post_answ">
        {post?.typeAttributes?.questionText}
      </Typography>
    </Box>
  );
};

export default QuestionAreaPost;
