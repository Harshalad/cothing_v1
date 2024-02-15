import { Box, LinearProgress, Link, Stack, Typography } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchHulDashboard } from "../../actions/dashboard/fetchHulDashboard";
import { Dashboard } from "@mui/icons-material";
import dashboard from "../../constants/proto/fetchDashboard/fetch-dashboard_grpc_web_pb";
import { MANAGER_VIEW_STATE } from "../../constants/auth";

const drawerWidth = 250;

const NewDashboard = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [dashboardData, setDashboardData] = useState<any>(null);
  useEffect(() => {
    const getDashboardData = async () => {
      const response = await fetchHulDashboard({ userId: user?.id, role: currentUserRole });
      if (response) {
        //@ts-ignore
        setDashboardData(response?.response);
      }

    }
    getDashboardData();
  }, [])
  const getDate = (d: any) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  };
  const colorMap = new Map<any, any>(new Map());
  colorMap.set("Did not attend", "red");
  colorMap.set("Did not pass", "red");
  colorMap.set("Not yet attempted", "ylw");
  colorMap.set("NA", "ylw");
  colorMap.set("Passed", "grn");
  colorMap.set("Attended", "grn");
  colorMap.set("Yet to be enabled", "gry");
  colorMap.set("Pending", "gry");


  console.log(dashboardData, "dashboardData");
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
              <Stack>
                {dashboardData?.date && <Typography className="dash_two_last_updtd">
                  Last updated on {getDate(dashboardData?.date)}
                </Typography>}
                {currentUserRole === MANAGER_VIEW_STATE.REPORT_VIEWER && <Stack className="dash_two_btn_flx">
                  {dashboardData?.group_report &&
                    <Link href={dashboardData?.group_report}>Score Report</Link>
                  }
                  {dashboardData?.score_report &&
                    <Link href={dashboardData?.score_report}>Progress Report</Link>
                  }
                </Stack>}
              </Stack>

            </Stack>
            <Box className="dash_two_tab_contr">
              <Box className="dash_two_tab_hdng">
                <Typography className="dash_two_tab_title">Goal</Typography>
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
            {dashboardData?.sections?.map((dashboard: any, index: number) => {
              return (<Box className="dashtwo_tab_cntnt_contr" key={index}>
                <Typography className="dashtwo_tab_cntnt_title">
                  {dashboard?.title}
                </Typography>
                <Typography className="dashtwo_tab_cntnt_dscp topic_title">
                  {dashboard?.description}
                </Typography>
                <Box className="dashtwo_tab_cntnt_sect">
                  <Box className="dashtwo_row_contr">
                    <Box className="dashtwo_row_cntnt align_cntnt">
                      <Typography className="dashtwo_tab_cntnt_hdng">
                        Goal
                      </Typography>
                    </Box>
                    <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                      <Typography className="dashtwo_tab_cntnt_hdng">
                        Watch Video
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng">
                        Live Session
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
                  {dashboard?.data?.map((rowData: any, innerIndex: number) => {
                    return (
                      <Box className="dashtwo_row_contr top_border" key={innerIndex}>
                        <Box className="dashtwo_row_cntnt align_cntnt">
                          <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                            {rowData?.goalName}
                          </Typography>
                        </Box>
                        <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                          <Typography className={`dashtwo_tab_cntnt_hdng ${colorMap.has(rowData?.cpStatus) ? colorMap.get(rowData?.cpStatus) : "blck"}`}>
                            {rowData?.cpStatus}
                          </Typography>
                          <Typography className={`dashtwo_tab_cntnt_hdng ${colorMap.has(rowData?.sessionStatus) ? colorMap.get(rowData?.sessionStatus) : "blck"}`}>
                            {rowData?.sessionStatus}
                          </Typography>
                          <Typography className={`dashtwo_tab_cntnt_hdng ${colorMap.has(rowData?.testStatus) ? colorMap.get(rowData?.testStatus) : "blck"}`}>
                            {rowData?.testStatus}
                          </Typography>
                        </Box>
                        <Box className="dashtwo_row_cntnt inner_grid">
                          <Box className="dashtwo_attmpts_contr">
                            {rowData?.attemptDetails?.map((attempt: any, ind: number) => {
                              return (
                                <Stack className="dashtwo_attmpts_flx" key={ind}>
                                  <Typography className="dashtwo_tab_cntnt_hdng attmpts_title">
                                    {ind + 1}
                                  </Typography>
                                  <LinearProgress
                                    variant="determinate"
                                    value={attempt?.progress}
                                    sx={{
                                      height: "6px",
                                      borderRadius: "24px",
                                      "&.MuiLinearProgress-root": {
                                        width: "100%",
                                        backgroundColor: "#EAECEF",
                                      },
                                      "& .MuiLinearProgress-bar": {
                                        backgroundColor: attempt?.pass ? "#21C262" : "#ef2e2e"
                                      },
                                    }}
                                  />
                                </Stack>
                              )
                            })}
                            {/* <Stack className="dashtwo_attmpts_flx">
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
                                value={20}
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
                            </Stack> */}
                          </Box>
                          <Box className="dashtwo_score_contr">
                            {rowData?.attemptDetails?.map((attempt: any, ind: any) => {
                              return (
                                <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score" key={ind}>
                                  {attempt?.score}
                                </Typography>
                              )
                            })}
                            {/*                            
                            <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                              8.5
                            </Typography>
                            <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                              NA
                            </Typography> */}
                          </Box>
                          <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                            {rowData?.passStatus}
                          </Typography>
                        </Box>
                      </Box>
                    )

                  })}
                  {/* <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Placeholder 2
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 3
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                          Not yet
                      attempted
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
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
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Placeholder 4
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                         {" "}
                      Attended
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 5
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
                          Yet to
                      start
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
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Case Study
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      24%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      Three attempts expired. Result: Did not pass
                    </Typography>
                  </Box>
                </Box> */}
                </Box>
              </Box>)
            })}
            {/* <Box className="dashtwo_tab_cntnt_contr">
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
                      Watch Video
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Live Session
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
                      Pass %
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Placeholder 1
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                          NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                          Passed
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      85%
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Placeholder 2
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 3
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                          Not yet
                      attempted
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 4
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                         {" "}
                      Attended
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 5
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
                          Yet to
                      start
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Case Study
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      24%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      Three attempts expired. Result: Did not pass
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
                      Watch Video
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng">
                      Live Session
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
                      Pass %
                    </Typography>
                  </Box>
                </Box>
                <Box className="dashtwo_row_contr top_border">
                  <Box className="dashtwo_row_cntnt align_cntnt">
                    <Typography className="dashtwo_tab_cntnt_hdng topic_title">
                      Placeholder 1
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                          NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                          Passed
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 2
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 3
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng red">
                          Did not
                      attend
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng ylw">
                          Not yet
                      attempted
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 4
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng grn">
                         {" "}
                      Attended
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Placeholder 5
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      2/3
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
                          Yet to
                      start
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
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
                      Case Study
                    </Typography>
                  </Box>
                  <Box className="dashtwo_row_cntnt inner_grid border_left_right">
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      NA
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng blck">
                      24%
                    </Typography>
                    <Typography className="dashtwo_tab_cntnt_hdng gry">
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
                          value={20}
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
                        06
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        8.5
                      </Typography>
                      <Typography className="dashtwo_tab_cntnt_hdng txt_cntr attmpts_score">
                        NA
                      </Typography>
                    </Box>
                    <Typography className="dashtwo_tab_cntnt_hdng attmpts_status">
                      Three attempts expired. Result: Did not pass
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NewDashboard;