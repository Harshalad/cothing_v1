import { Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
const SelectEventSlots = ( { selectEvents }: any ) => {
  const router = useRouter();
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  console.log( "selectEvents", selectEvents );
  const handleSelectSlotClick = ( event: any ) => {
    event?.anchorUser === false
      ? router.push( {
        pathname: "pre-events",
        query: {
          id: event?.id,
          role: event?.eventRole,
        },
      } )
      : router.push( {
        pathname: "anchor-event",
        query: {
          id: event?.id,
          role: event?.eventRole,
        },
      } );
  };
  return (
    <>
      <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
        { selectEvents?.map( ( event: any, index: any ) => {
          return (
            <Box className="active_assmnts_card" key={ index }>
              <Stack className="active_assmnts_status_flx">
                <CircleIcon sx={ { color: "#E74649", fontSize: "12px" } } />
                <Typography className="active_assmnts_status_text ntstrtd">
                  Not Started
                </Typography>
              </Stack>
              <Typography className="active_assmnts_name">
                { event?.name }
              </Typography>
              <Stack className="active_assmnts_info_flx">
                { currentUserRole === MANAGER_VIEW_STATE.EXPERT ? (
                  <Typography className="active_assmnts_end_date">
                    Deadline : Date -{ " " }
                    { new Date(
                      event?.autoPublishSlotsDateTime
                    ).toLocaleDateString() }{ " " }
                    and Time
                    { new Date(
                      event?.autoPublishSlotsDateTime
                    ).toLocaleTimeString() }
                  </Typography>
                ) : (
                  <Typography className="active_assmnts_end_date">
                    Deadline : Date -{ " " }
                    { new Date( event?.shortNotice ).toLocaleDateString() } and Time { " " }
                    { new Date( event?.shortNotice ).toLocaleTimeString() }
                  </Typography>
                ) }
              </Stack>
              <Box className="analyze_cta">
                <Button
                  className="standard_cta"
                  onClick={ () => handleSelectSlotClick( event ) }
                >
                  { !event?.anchorUser ? "Select Slot" : "Share Slot" }
                </Button>
              </Box>
            </Box>
          );
        } ) }
        {/* <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text ntstrtd">
              Not Started
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_info_flx">
            <Typography className="active_assmnts_end_date">
              Deadline : Date - 02/09/2023 and Time 06:30 pm
            </Typography>
          </Stack>
          <Box className="analyze_cta">
            <Button className="standard_cta">Select Slot</Button>
          </Box>
        </Box> */}
      </Stack>
    </>
  );
};
export default SelectEventSlots;
