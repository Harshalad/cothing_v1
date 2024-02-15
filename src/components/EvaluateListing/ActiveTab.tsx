import {
  Box, Stack, Typography
} from "@mui/material";
import LiveEvents from "./LiveEvents";
import Active from "./Active";

const ActiveTab = ({ activeClass }:any) => {
  return (
    <>
      {/* <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">Live Events</Typography>
        </Stack>
        <LiveEvents />
      </Box> */}
      <Box className="avlbl_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Active Evaluation
          </Typography>
        </Stack>
        <Active activeClass ={activeClass}/>
      </Box>
    </>
  );
};
export default ActiveTab;