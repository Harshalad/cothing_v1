import {
  Box, Stack, Typography
} from "@mui/material";
import Completed from "./Completed";

const CompletedTab = ({ activeClass }:any) => {
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Evaluation Completed
          </Typography>
        </Stack>
        <Completed activeClass={activeClass} />
      </Box>
    </>
  );
};
export default CompletedTab;