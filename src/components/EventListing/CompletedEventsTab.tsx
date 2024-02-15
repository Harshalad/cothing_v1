import {
  Box, Stack, Typography
} from "@mui/material";
import CompletedEvents from "./CompletedEvents";

const CompletedEventsTab = ({ completedEvents }:any) => {
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Completed Events
          </Typography>
        </Stack>
        <CompletedEvents completedEvents={completedEvents} />
      </Box>
    </>
  );
};
export default CompletedEventsTab;