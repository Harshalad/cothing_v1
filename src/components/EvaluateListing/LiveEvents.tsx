import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

const LiveEvents = () => {
  return (
    <>
      <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
        <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text ntstrtd">
              Not Started
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_info_flx mb">
            <Typography className="active_assmnts_end_date">
              Start Date : 02/09/2023
            </Typography>
            <Typography className="active_assmnts_end_date">
              Start Time : 06:30 pm
            </Typography>
          </Stack>
          <Stack className="active_assmnts_info_flx">
            <Typography className="active_assmnts_end_date">
              End Date : 02/09/2023
            </Typography>
            <Typography className="active_assmnts_end_date">
              End Time : 06:30 pm
            </Typography>
          </Stack>
          <Stack className="active_assmnts_profile_flx">
            <Avatar
              sx={{
                width: "24px",
                height: "24px",
                bgcolor: "#DFFFF2",
                color: "#1BAD70",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              V
            </Avatar>
            <Typography className="active_assmnts_profile_title">
              Evaluate for Vidhi
            </Typography>
          </Stack>
          <Box className="analyze_cta">
            <Button className="standard_cta">Join Now</Button>
          </Box>
        </Box>
        <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text ntstrtd">
              Not Started
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_info_flx mb">
            <Typography className="active_assmnts_end_date">
              Start Date : 02/09/2023
            </Typography>
            <Typography className="active_assmnts_end_date">
              Start Time : 06:30 pm
            </Typography>
          </Stack>
          <Stack className="active_assmnts_info_flx">
            <Typography className="active_assmnts_end_date">
              End Date : 02/09/2023
            </Typography>
            <Typography className="active_assmnts_end_date">
              End Time : 06:30 pm
            </Typography>
          </Stack>
          <Stack className="active_assmnts_profile_flx">
            <Avatar
              sx={{
                width: "24px",
                height: "24px",
                bgcolor: "#DFFFF2",
                color: "#1BAD70",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              V
            </Avatar>
            <Typography className="active_assmnts_profile_title">
              Evaluate for Vidhi
            </Typography>
          </Stack>
          <Box className="analyze_cta">
            <Button className="standard_cta">Join Now</Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
export default LiveEvents;