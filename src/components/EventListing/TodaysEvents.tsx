import { Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useRouter } from "next/router";
const TodaysEvents = ({ todayScheduledEvents }:any) => {
  const router = useRouter();
  const handleEnterEventClick = (event: any) => {
    router.push({
      pathname: "/events",
      query: {
        id: event?.id,
      },
    });
  };
  return (
    <>
      <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
       {todayScheduledEvents?.map((event:any, index:any)=>{
        return (
          <Box className="active_assmnts_card" key={index}>
            <Stack className="active_assmnts_status_flx">
              <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
              <Typography className="active_assmnts_status_text ntstrtd">
                Not Started
              </Typography>
            </Stack>
            <Typography className="active_assmnts_name">
              {event?.name}
            </Typography>
            <Stack className="active_assmnts_info_flx mb">
              <Typography className="active_assmnts_end_date">
                Start Date : {new Date(event?.startDate).toLocaleDateString()}
              </Typography>
              <Typography className="active_assmnts_end_date">
                Start Time : {new Date(event?.startDate).toLocaleTimeString()}
              </Typography>
            </Stack>
            <Stack className="active_assmnts_info_flx">
              <Typography className="active_assmnts_end_date">
                End Date : {new Date(event?.endDate).toLocaleDateString()}
              </Typography>
              <Typography className="active_assmnts_end_date">
                End Time : {new Date(event?.endDate).toLocaleTimeString()}
              </Typography>
            </Stack>
            <Box className="analyze_cta">
              <Button className="standard_cta" onClick={()=> handleEnterEventClick(event)}>Enter Event</Button>
            </Box>
          </Box>
        );
       })}
        {/* <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#E1C04B", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text inprog">
              In Progress
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
          <Box className="analyze_cta">
            <Button className="standard_cta">Enter Event</Button>
          </Box>
        </Box> */}
      </Stack>
    </>
  );
};
export default TodaysEvents;