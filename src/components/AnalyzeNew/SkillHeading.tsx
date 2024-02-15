import { Box, Stack, Typography } from "@mui/material";

const SkillHeading = () => {
  return (
    <>
      <Stack className="active_assmnts_card_flx">
        <Box className="active_assmnts_card">
          <Typography className="active_assmnts_name">Adaptability in company</Typography>
          <Stack className="skill_head_stat_flx">
            <Typography className="skill_head_stat_rating">8.4</Typography>
            <Typography className="active_assmnts_end_date"><span className="skill_head_stat_perctg">+24%</span> in 30 days</Typography>
          </Stack>
          <Typography className="avlbl_assmnts_card_descrpt">
            Based on the assurance feedback, here are the possible goals that might help you 
            improve on these your low scoring areas.
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
export default SkillHeading;