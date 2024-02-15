import {
  Box, Stack, Typography
} from "@mui/material";
import SelectEventSlots from "./SelectEventSlots";

const SelectEventSlotsTab = ({ selectEvents }:any) => {
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Select Event Slots
          </Typography>
        </Stack>
        <SelectEventSlots selectEvents ={selectEvents}/>
      </Box>
    </>
  );
};
export default SelectEventSlotsTab;