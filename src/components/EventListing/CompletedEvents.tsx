import { Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/router";
const CompletedEvents = ( { completedEvents }: any ) => {
  const router = useRouter();
  const handleViewClick = ( event: any ) => {
    router.push( {
      pathname: "/events",
      query: {
        id: event?.id,
      },
    } );
  };
  return (
    <>
      <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
        { completedEvents?.map( ( event: any, index: any ) => {
          return (
            <Box className="active_assmnts_card" key={ index }>
              <Stack className="active_assmnts_status_flx">
                <CircleIcon sx={ { color: "#1BAD70", fontSize: "12px" } } />
                <Typography className="active_assmnts_status_text schld">
                  Completed
                </Typography>
              </Stack>
              <Typography className="active_assmnts_name">
                { event?.name }
              </Typography>
              <Stack className="active_assmnts_info_flx">
                <Typography className="active_assmnts_end_date">
                  Completed On : { new Date( event?.endDate ).toLocaleDateString() }
                </Typography>
              </Stack>
              <Box className="analyze_cta">
                <Button
                  className="standard_cta"
                  onClick={ () => handleViewClick( event ) }
                >
                  View
                </Button>
              </Box>
            </Box>
          );
        } ) }
        {/* <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#1BAD70", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text schld">
              Completed
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_info_flx">
            <Typography className="active_assmnts_end_date">
              Completed On : 02/09/2023
            </Typography>
          </Stack>
          <Box className="analyze_cta">
            <Button className="standard_cta">View</Button>
          </Box>
        </Box> */}
      </Stack>
    </>
  );
};
export default CompletedEvents;
