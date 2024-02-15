import {
  Box, Stack, Typography
} from "@mui/material";
import Pending from "./Pending";

const PendingTab = ({ activeClass }:any) => {
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Evaluation Pending
          </Typography>
        </Stack>
        <Pending activeClass={activeClass} />
      </Box>
    </>
  );
};
export default PendingTab;