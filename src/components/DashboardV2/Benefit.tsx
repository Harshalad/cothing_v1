import { Box, Stack, Typography } from "@mui/material";

const Benefit = ({ text }: any) => {
  return (
    <>
      <Box className="dashboardv2_container benefit_container">
        <Typography className="dashboardv2_sub_title">
          Benefit to {text}
        </Typography>
        <Box className="statement_title green">
          <Typography className="statement_text green">
            You have made great progress on the organizational statements
          </Typography>
        </Box>
        <Box className="table_container">
          <Stack className="table_heading_container">
            <Typography className="table_heading flex_2">Statement</Typography>
            {/* <Typography className="table_heading flex_1">Progress</Typography> */}
            <Typography className="table_heading flex_1">
              No of Goals
            </Typography>
          </Stack>
          <Box className="table_content_container">
            <Box className="table_data_block">
              <Stack className="table_data_container">
                <Typography className="table_data flex_2">
                  Maximize Profitability
                </Typography>
                {/* <Box className="table_data_progress_bar flex_1">
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
                    </Box> */}
                <Typography className="table_data flex_1">5</Typography>
              </Stack>
              {/* {showPopUp === "one"
                  ? */}
              <Box className="table_data_pop_up">
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color red"></Box>
                  <Typography className="pop_up_text">Yet to start(2)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color orange"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Start (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color yellow"></Box>
                  <Typography className="pop_up_text">In Progress(3)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color blue"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Complete (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color green"></Box>
                  <Typography className="pop_up_text">Completed (5)</Typography>
                </Stack>
              </Box>
              {/* :
                    ""
                  } */}
            </Box>
            <Box className="table_data_block">
              <Stack className="table_data_container">
                <Typography className="table_data flex_2">
                  Organizational Development Goals
                </Typography>
                {/* <Box className="table_data_progress_bar flex_1">
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
                    </Box> */}
                <Typography className="table_data flex_1">5</Typography>
              </Stack>
              {/* {showPopUp === "one"
                  ? */}
              <Box className="table_data_pop_up">
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color red"></Box>
                  <Typography className="pop_up_text">Yet to start(2)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color orange"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Start (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color yellow"></Box>
                  <Typography className="pop_up_text">In Progress(3)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color blue"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Complete (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color green"></Box>
                  <Typography className="pop_up_text">Completed (5)</Typography>
                </Stack>
              </Box>
              {/* :
                    ""
                  } */}
            </Box>
            <Box className="table_data_block">
              <Stack className="table_data_container">
                <Typography className="table_data flex_2">
                  Growth Management
                </Typography>
                {/* <Box className="table_data_progress_bar flex_1">
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
                    </Box> */}
                <Typography className="table_data flex_1">5</Typography>
              </Stack>
              {/* {showPopUp === "one"
                  ? */}
              <Box className="table_data_pop_up">
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color red"></Box>
                  <Typography className="pop_up_text">Yet to start(2)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color orange"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Start (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color yellow"></Box>
                  <Typography className="pop_up_text">In Progress(3)</Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color blue"></Box>
                  <Typography className="pop_up_text">
                    Overdue to Complete (5)
                  </Typography>
                </Stack>
                <Stack className="pop_up_flex">
                  <Box className="pop_up_color green"></Box>
                  <Typography className="pop_up_text">Completed (5)</Typography>
                </Stack>
              </Box>
              {/* :
                    ""
                  } */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Benefit;