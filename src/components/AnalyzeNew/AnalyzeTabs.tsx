import { Box, Typography, useMediaQuery } from "@mui/material";

const AnalyzeTabs = ({handleActiveClass, activeClass}: any) => {
  
  const matches = useMediaQuery("(max-width:991px)");

  return (
    <>
      <Box className="analyze_tabs_contr">
        <Box className="analyze_tabs_grid">
          <Box className={`analyze_tab_cont ${activeClass === "one" ? "active" : ""}`} onClick={() => { handleActiveClass("one") }}>
            <Typography className={`analyze_tab_name ${activeClass === "one" ? "active" : ""}`}>Analyze your skill</Typography>
          </Box>
          <Box className={`analyze_tab_cont ${activeClass === "two" ? "active" : ""}`} onClick={() => { handleActiveClass("two") }}>
            <Typography className={`analyze_tab_name ${activeClass === "two" ? "active" : ""}`}>Seek Feedback</Typography>
          </Box>
          {/* <Box className={`analyze_tab_cont ${activeClass === "three" ? "active" : ""}`} onClick={() => { handleActiveClass("three") }}>
            <Typography className={`analyze_tab_name ${activeClass === "three" ? "active" : ""}`}>Personal Statistics</Typography>
          </Box> */}
          <Box className={`analyze_tab_cont ${activeClass === "four" ? "active" : ""}`} onClick={() => { handleActiveClass("four") }}>
            {/* <Box className="new_msg_badge">
              <Typography className="badge_text">
                {3}
              </Typography>
            </Box> */}
            <Typography className={`analyze_tab_name ${activeClass === "four" ? "active" : ""}`}>Give{matches === true ? <br /> : ""} Feedback</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default AnalyzeTabs;