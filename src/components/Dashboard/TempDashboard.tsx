import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const drawerWidth = 250;

const NewDashboard = () => {
  return (
    <>
      <Box className="dashboard_two_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Dashboard</title>
          </Helmet>
        </HelmetProvider>
        <HeaderNav />
        <Box
          component="main"
          sx={{
            width: { tablet: `calc(100% - ${drawerWidth}px)` },
            ml: { tablet: "auto" },
            marginLeft: "250px",
          }}
        >
          <Box
            sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}
            className="dashboard_two"
          >
            <Stack className="dash_two_hdng_flx">
              <Typography
                variant="h1"
                sx={{ fontWeight: "700", color: "#1C2129" }}
                className="dash_title"
              >
                Dashboard
              </Typography>
              <Typography className="dash_two_last_updtd">
                Last updated on 23-AUG-2023 at 10:00 AM
              </Typography>
            </Stack>
            <Box className="dash_two_tab_contr">
              <Box className="dash_two_tab_hdng">
                <Typography className="dash_two_tab_title">Topic</Typography>
              </Box>
              <Box className="dash_two_tab_hdng">
                <Typography className="dash_two_tab_title">
                  Completion
                </Typography>
              </Box>
              <Box className="dash_two_tab_hdng">
                <Typography className="dash_two_tab_title">
                  Effectiveness
                </Typography>
              </Box>
            </Box>
            <Box className="dashtwo_tab_cntnt_contr">
              <Typography className="dashtwo_tab_cntnt_title">
                Individual
              </Typography>
              <Box className="dashtwo_tab_cntnt_sect">
                <Box className="dashtwo_row_contr">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Topic
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Learning Content
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Workshop
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Quiz Status
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Attempts on Quiz
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng txt_cntr">
                      Score
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Pass Status
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Elevate Overview
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/2
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                       NA
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Develop Commercial Acumen
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      100%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                      Did not
                      pass
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={40}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={50}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        4.2
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        0
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      Three attempts expired. Result: Did not pass
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                     Effective Communication & Leadership
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      1/2
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      Pending
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={50}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={80}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={40}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        6
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        4
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      Kudos! Great job
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Manage Talent
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      0/2
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} />{" "} */}
                      Yet to start
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                       Yet to
                      be enabled
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                    Available on 23-FEB-2023
                    </Typography>
                  </Box>
                </Box>
                
              </Box>
            </Box>
            <Box className="dashtwo_tab_cntnt_contr">
              <Typography className="dashtwo_tab_cntnt_title">
                Manager
              </Typography>
              <Box className="dashtwo_tab_cntnt_sect">
                <Box className="dashtwo_row_contr">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Topic
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Learning Content
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Workshop
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Quiz Status
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Attempts on Quiz
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng txt_cntr">
                      Score
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Pass Status
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Elevate Overview
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      92%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                     NA
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Develop Commercial Acumen
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      40%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      100%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Did not */}
                      75%
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={59}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={59}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={59}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      54%
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                     Effective Communication & Leadership
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      5%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Not yet */}
                      Pending
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={59}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={59}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={52}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        4
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      52%
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Manage Talent
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng ">
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} />{" "} */}
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Yet to */}
                      Pending
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                    Available on 23-FEB-2023
                    </Typography>
                  </Box>
                </Box>
                
              </Box>
            </Box>
            <Box className="dashtwo_tab_cntnt_contr">
              <Typography className="dashtwo_tab_cntnt_title">
              Organization
              </Typography>
              <Box className="dashtwo_tab_cntnt_sect">
                <Box className="dashtwo_row_contr">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Topic
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Learning Content
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Workshop
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Quiz Status
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Attempts on Quiz
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng txt_cntr">
                      Score
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Pass Status
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Elevate Overview
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      92%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                        89%
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Develop Commercial Acumen
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      40%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      100%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Did not */}
                      75%
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={58}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={58}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={58}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      54%
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                     Effective Communication & Leadership
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      5%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> */}
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Not yet */}
                      Pending
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={52}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        4
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      52%
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Manage Talent
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} />{" "} */}
                      Pending
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                      {/* <FiberManualRecordIcon sx={{ fontSize: "8px" }} /> Yet to */}
                      Pending
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid">
                    <Box className="dashtwo_attmpts_contr">
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          1
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          2
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="dashtwo_attmpts_flx">
                        <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                          3
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: "6px",
                            borderRadius: "24px",
                            "&.MuiLinearProgress-root": {
                              width: "100%",
                              backgroundColor: "#EAECEF",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                            },
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box className="dashtwo_score_contr">
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                    Available on 23-FEB-2023
                    </Typography>
                  </Box>
                </Box>
                
              </Box>
            </Box>
            
           
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NewDashboard;