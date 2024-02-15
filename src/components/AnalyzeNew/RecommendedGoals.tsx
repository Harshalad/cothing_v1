import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const RecommendedGoals = () => {

  return (
    <>
      <Box className="recmnd_goals">
        <Typography
          //@ts-ignore
          variant="span"
          sx={{
            fontWeight: "500",
            color: "#2D3648",
            margin: "24px 0",
            cursor: "pointer",
          }}
          className="go_back_flex"
        >
          <ChevronLeftIcon /> Go Back
        </Typography>
        <Typography className="recmnd_goals_title">Recommended Goals</Typography>
        <Box className="avlbl_assmnts_card">
          <Stack className="assmnts_view_more_flex">
            <Box className="assmnts_view_more_contr">
              <Typography className="avlbl_assmnts_card_title">
                Build Emotional Intelligence to regulate oneself and build stakeholder relationships
              </Typography>
              <Typography className="avlbl_assmnts_card_descrpt">
                Collaborate effectively with key stakeholders to drive improved business results.
                Promote open communication, mutual understanding, and shared goals.
                Leverage collective expertise and resources for success in achieving org.
              </Typography>
              <Typography className="active_assmnts_totl_quests">
                Skills evaluated :  Skill Utilized | Data Driven | Emotional Intelligence | Category Growth Management
              </Typography>
            </Box>
            <Box className="analyze_cta">
              <Button className="standard_cta">Add Goal</Button>
            </Box>
          </Stack>
        </Box>
        <Box className="avlbl_assmnts_card">
          <Stack className="assmnts_view_more_flex">
            <Box className="assmnts_view_more_contr">
              <Typography className="avlbl_assmnts_card_title">
                Build Emotional Intelligence to regulate oneself and build stakeholder relationships
              </Typography>
              <Typography className="avlbl_assmnts_card_descrpt">
                Collaborate effectively with key stakeholders to drive improved business results.
                Promote open communication, mutual understanding, and shared goals.
                Leverage collective expertise and resources for success in achieving org.
              </Typography>
              <Typography className="active_assmnts_totl_quests">
                Skills evaluated :  Skill Utilized | Data Driven | Emotional Intelligence | Category Growth Management
              </Typography>
            </Box>
            <Box className="analyze_cta">
              <Button className="standard_cta">Add Goal</Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
export default RecommendedGoals;