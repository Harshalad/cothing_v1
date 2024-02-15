import { Box, LinearProgress, Stack, Typography } from "@mui/material";

const DevArea = () => {
  return (
    <>
      <Box className="dashboardv2_container dev_container">
        <Typography className="dashboardv2_sub_title">Dev Area</Typography>
        <Box className="statement_title red">
          <Typography className="statement_text red">
            The quality of conversation responses have decreased by 10%
          </Typography>
        </Box>
        <Box className="table_container">
          <Stack className="table_heading_container">
            <Typography className="table_heading flex_2">Statement</Typography>
            <Typography className="table_heading flex_1">Progress</Typography>
            <Typography className="table_heading flex_1">
              No of Goals
            </Typography>
          </Stack>
          <Box className="table_content_container">
            <Stack className="table_data_container">
              <Typography className="table_data flex_2">
                Maximize Profitability
              </Typography>
              <Box className="table_data_progress_bar flex_1">
                <LinearProgress
                  variant="determinate"
                  value={80}
                  sx={{
                    height: "6px",
                    borderRadius: "24px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#1BAD70",
                    },
                  }}
                />
              </Box>
              <Typography className="table_data flex_1">5</Typography>
            </Stack>
            <Stack className="table_data_container">
              <Typography className="table_data flex_2">
                Organizational Development Goals
              </Typography>
              <Box className="table_data_progress_bar flex_1">
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: "6px",
                    borderRadius: "24px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#DEBD0F",
                    },
                  }}
                />
              </Box>
              <Typography className="table_data flex_1">6</Typography>
            </Stack>
            <Stack className="table_data_container">
              <Typography className="table_data flex_2">
                Growth Management
              </Typography>
              <Box className="table_data_progress_bar flex_1">
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    height: "6px",
                    borderRadius: "24px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#E74649",
                    },
                  }}
                />
              </Box>
              <Typography className="table_data flex_1">25</Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default DevArea;