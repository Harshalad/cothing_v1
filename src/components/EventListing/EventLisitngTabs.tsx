import { Box, Typography, useMediaQuery } from "@mui/material";

const EventLisitngTabs = ({handleActiveClass, activeClass}: any) => {
  
  const matches = useMediaQuery("(max-width:991px)");

  return (
    <>
      <Box className="analyze_tabs_contr">
        <Box className="analyze_tabs_grid">
          <Box className={`analyze_tab_cont ${activeClass === "one" ? "active" : ""}`} onClick={() => { handleActiveClass("one") }}>
            <Typography className={`analyze_tab_name ${activeClass === "one" ? "active" : ""}`}>Select Event Slots</Typography>
          </Box>
          <Box className={`analyze_tab_cont ${activeClass === "two" ? "active" : ""}`} onClick={() => { handleActiveClass("two") }}>
            <Typography className={`analyze_tab_name ${activeClass === "two" ? "active" : ""}`}>Scheduled Events</Typography>
          </Box>
          <Box className={`analyze_tab_cont ${activeClass === "three" ? "active" : ""}`} onClick={() => { handleActiveClass("three") }}>
            <Typography className={`analyze_tab_name ${activeClass === "three" ? "active" : ""}`}>Completed Events</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default EventLisitngTabs;