import { Box, Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import LinearGradient from "../DashboardV2/LinearGradient";

const RecentGoals = () => {
  return (
    <>
      <Box className="dashboardv2_container goals_container">
        <Typography className="dashboardv2_sub_title">Recent Goals</Typography>
        <Box className="goals_content_container">
          <Box className="goal_circular_progress_flex">
            <Box className="goal_circular_progress goal1">
              <CircularProgressbar
                value={80}
                styles={{ path: { stroke: `url(#goal1)`, height: "100%" } }}
              />
              <LinearGradient
                cssId={"goal1"}
                startColor={"#21C262"}
                endColor={"#9FE7BC"}
              />
            </Box>
            <Typography className="goal_text">
              Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam
              nulla.
            </Typography>
          </Box>
          <Box className="goal_circular_progress_flex">
            <Box className="goal_circular_progress goal1">
              <CircularProgressbar
                value={50}
                styles={{ path: { stroke: `url(#goal2)`, height: "100%" } }}
              />
              <LinearGradient
                cssId={"goal2"}
                startColor={"#FFBF00"}
                endColor={"#FFECB1"}
              />
            </Box>
            <Typography className="goal_text">
              Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam
              nulla.
            </Typography>
          </Box>
          <Box className="goal_circular_progress_flex">
            <Box className="goal_circular_progress goal1">
              <CircularProgressbar
                value={50}
                styles={{ path: { stroke: `url(#goal2)`, height: "100%" } }}
              />
              <LinearGradient
                cssId={"goal2"}
                startColor={"#EE4412"}
                endColor={"#E29C88"}
              />
            </Box>
            <Typography className="goal_text">
              Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam
              nulla.
            </Typography>
          </Box>
          <Box className="goal_circular_progress_flex">
            <Box className="goal_circular_progress">
              <img
                src="/images/icons/goal-completed.svg"
                alt="goal completed"
                width="30px"
                height="30px"
              />
            </Box>
            <Typography className="goal_text">
              Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam
              nulla.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default RecentGoals;