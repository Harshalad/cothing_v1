import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} mb="16px">
      <CircularProgress style={{ color: "#F58A43" }} />
    </Box>
  );
};

export default Spinner;
