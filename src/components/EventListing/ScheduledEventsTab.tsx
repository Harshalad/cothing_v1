import {
  Box, Stack, Typography
} from "@mui/material";
import TodaysEvents from "./TodaysEvents";
import UpcomingEvents from "./UpcomingEvents";

const ScheduledEventsTab = ({
  todayScheduledEvents,
  upcomingScheduledEvents,
}: any) => {
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Todays Events
          </Typography>
        </Stack>
        <TodaysEvents todayScheduledEvents={todayScheduledEvents} />
      </Box>
      <Box className="avlbl_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Upcoming Events
          </Typography>
        </Stack>
        <UpcomingEvents upcomingScheduledEvents ={upcomingScheduledEvents}/>
      </Box>
    </>
  );
};
export default ScheduledEventsTab;