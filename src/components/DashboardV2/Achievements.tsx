import { Box, Typography } from "@mui/material";

const Achievements = () => {
  return (
    <>
      <Box className="dashboardv2_container achievements_container">
        <Typography className="dashboardv2_sub_title">Achievements</Typography>
        <Box className="achievements_content_container">
          <Box className="achievement_flex">
            <Box className="achievement_image_container">
              <img
                src="/images/icons/achievement.svg"
                alt="achievement"
                width="24px"
                height="24px"
              />
            </Box>
            <Typography className="achievement_text">7 Days in a row</Typography>
          </Box>
          <Box className="achievement_flex">
            <Box className="achievement_image_container">
              <img
                src="/images/icons/achievement.svg"
                alt="achievement"
                width="24px"
                height="24px"
              />
            </Box>
            <Typography className="achievement_text">
              10 Goals completed successfully within the timeframe
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Achievements;
