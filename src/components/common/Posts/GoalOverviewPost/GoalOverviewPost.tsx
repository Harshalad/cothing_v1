import { Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";

const GoalOverviewPost = ({ post }: any) => {
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  console.log(post,"1234567890");
  return (
    <Box className="aligngl_quest_cont">
      <Box className="aligngl_quest_box">
        <Typography className="aligngl_quest_heading mb">
          {currentUserRole === MANAGER_VIEW_STATE.MANAGER
            ? "Your direct report has shared their take on this goal, by answering the following questions:"
            : "You have shared the take on this Goal"}
        </Typography>
        <Typography className="aligngl_quest_heading">
          {post?.typeAttributes?.question1}
        </Typography>
        <Typography className="aligngl_post_answ">
          {" "}
          {post?.typeAttributes?.answer1}
        </Typography>
        <Typography className="aligngl_quest_heading mt">
          {post?.typeAttributes?.question2}
        </Typography>
        <Typography className="aligngl_post_answ">
          {post?.typeAttributes?.answer2}
        </Typography>
        <Typography className="aligngl_quest_heading mt">
          {post?.typeAttributes?.question3}
        </Typography>
        <Typography className="aligngl_post_answ">
          {post?.typeAttributes?.answer3}
        </Typography>
      </Box>
    </Box>
  );
};

export default GoalOverviewPost;
