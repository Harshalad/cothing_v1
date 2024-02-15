import { Box, Stack, Typography, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const OrganizationalProgressTracker = ({ text }: any) => {

  const [value, setValue] = useState<any>(0);
  const [showGraphOption, setGraphOption] = useState<any>("v&c");
  
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleGraphOption = (clickedOption: any) => {
    setGraphOption(clickedOption ? clickedOption : false);
  };

  return (
    <>
      <Box className="dashboardv2_container benefit_container">
        <Typography className="dashboardv2_sub_title">
          Organizational Progress Tracker
        </Typography>
        <Box className="statement_title green">
          <Typography className="statement_text green">
            You have made great progress on the organizational statements
          </Typography>
        </Box>
        <Box>
        <Tabs
          className="predictors_tab"
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Targeted Performance" />
          <Tab label="Overall Performance" />
        </Tabs>
        {value === 0 ? (
          <>
            <Stack className="leaderboard_graph_tab">
              <Box
                className={`stat_container mt ${
                  showGraphOption === "v&c" ? "active" : ""
                }`}
                onClick={() => {
                  handleGraphOption("v&c");
                }}
              >
                <Typography className="stat_title">
                  Volume & Consistency
                </Typography>
              </Box>
              <Box
                className={`stat_container mt ${
                  showGraphOption === "q&t" ? "active" : ""
                }`}
                onClick={() => {
                  handleGraphOption("q&t");
                }}
              >
                <Typography className="stat_title">
                  Quality & Thoroughness
                </Typography>
              </Box>
            </Stack>
          </>
        ) : (
          <>
            <Stack className="leaderboard_graph_tab">
              <Box
                className={`stat_container mt ${
                  showGraphOption === "v&c" ? "active" : ""
                }`}
                onClick={() => {
                  handleGraphOption("v&c");
                }}
              >
                <Typography className="stat_title">
                  Volume & Consistency
                </Typography>
              </Box>
              <Box
                className={`stat_container mt ${
                  showGraphOption === "q&t" ? "active" : ""
                }`}
                onClick={() => {
                  handleGraphOption("q&t");
                }}
              >
                <Typography className="stat_title">
                  Quality & Thoroughness
                </Typography>
              </Box>
            </Stack>
          </>
        )}
        </Box>
      </Box>
    </>
  );
};
export default OrganizationalProgressTracker;