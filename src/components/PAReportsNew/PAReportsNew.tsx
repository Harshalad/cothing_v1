import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Box, Button, Collapse, Divider, LinearProgress, Stack, Tab, Tabs, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMore';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import SkillTrendAanlysisGraph from "./SkillTrendAanlysisGraph";

const PAReportsNew = () => {

  const [expanded, setExpanded] = useState<any>(false);
  const [workNow, setWorkNow] = useState<any>(false);
  const [tabValue, setTabValue] = useState<any>("1");

  const handleRprtTab = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const handleCollapse = () => {
    setExpanded(!expanded);
  };

  const handleWorkNow = () => {
    setWorkNow(!workNow);
  }

  return (
    <>
      <Box className="report_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Potential Assessment Report</title>
          </Helmet>
        </HelmetProvider>
        {/* Navbar */}
        <Box className="rprt_logo">
          <img src="/images/logo.png" alt="Logo" width={175} height={40} />
        </Box>
        {/* Hero */}
        <Box className="rprt_hero_section">
          <Typography className="rprt_title">
            Junior Level Potential Assssment Report
          </Typography>
          <Typography className="rprt_emp_name">Rohit Kumar</Typography>
          <Typography className="rprt_date">Date : DD/MM/YYYY</Typography>
          <Box className="rprt_hero_img">
            <img
              src="/images/report-hero.png"
              alt="report image"
              width={552}
              height={484}
            ></img>
          </Box>
          <Box className="abt_rprt_contr">
            <Typography className="abt_rprt_title">
              About this Report
            </Typography>
            <Typography className="abt_rprt_descp">
              Lorem ipsum dolor sit amet consectetur. Ullamcorper ut donec
              mauris arcu tellus curabitur justo. Nibh vitae proin mauris cum
              condimentum mollis sed vulputate. At integer faucibus nunc orci
              enim. Viverra turpis adipiscing varius maecenas. Lorem ipsum dolor
              sit amet consectetur. Ullamcorper ut donec mauris arcu tellus
              curabitur justo. Nibh vitae proin mauris cum condimentum mollis
              sed vulputate. At integer faucibus nunc orci enim. Viverra turpis
              adipiscing varius maecenas. Lorem ipsum dolor sit amet
              consectetur. Ullamcorper ut donec mauris arcu tellus curabitur
              justo. Nibh vitae proin mauris cum condimentum mollis sed
              vulputate. At integer faucibus nunc orci enim. Viverra turpis
              adipiscing varius maecenas. Lorem ipsum dolor sit amet
              consectetur. Ullamcorper ut donec mauris arcu tellus curabitur
              justo. Nibh vitae proin mauris cum condimentum mollis sed
              vulputate. At integer faucibus nunc orci enim. Viverra turpis
              adipiscing varius maecenas.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur. Ullamcorper ut donec
              mauris arcu tellus curabitur justo. Nibh vitae proin mauris cum
              condimentum mollis sed vulputate. At integer faucibus nunc orci
              enim. Viverra turpis adipiscing varius maecenas.Lorem ipsum dolor
              sit amet consectetur. Ullamcorper ut donec mauris arcu tellus
              curabitur justo. Nibh vitae proin mauris cum condimentum mollis
              sed vulputate. At integer faucibus nunc orci enim. Viverra turpis
              adipiscing varius maecenas.Lorem ipsum dolor sit amet consectetur.
              Ullamcorper ut donec mauris arcu tellus curabitur justo. Nibh
              vitae proin mauris cum condimentum mollis sed vulputate. At
              integer faucibus nunc orci enim. Viverra turpis adipiscing varius
              maecenas.
            </Typography>
          </Box>
        </Box>
        {/* Reviewers - Section 1 */}
        <Box className="revwrs_contr rprt_sect_mt">
          <Typography className="rprt_headng">No of Reviewers</Typography>
          <Typography className="rprt_subheadng">
            The following chart indicates the number of individuals that
            responded to your request for feedback.
          </Typography>
          <Box className="rprt_progbar_contr">
            <Stack className="rprt_progbar_flx">
              <Typography className="rprt_progbar_text">Manager</Typography>
              <LinearProgress
                variant="determinate"
                value={25}
                sx={{
                  height: "8px",
                  borderRadius: "16px",
                  "&.MuiLinearProgress-root": {
                    backgroundColor: "#EAECEF",
                    width: "100%",
                  },
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#E74649",
                    borderRadius: "16px",
                  },
                }}
              />
            </Stack>
            <Stack className="rprt_progbar_flx">
              <Typography className="rprt_progbar_text">Peers</Typography>
              <LinearProgress
                variant="determinate"
                value={45}
                sx={{
                  height: "8px",
                  borderRadius: "16px",
                  "&.MuiLinearProgress-root": {
                    backgroundColor: "#EAECEF",
                    width: "100%",
                  },
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#EFD02E",
                    borderRadius: "16px",
                  },
                }}
              />
            </Stack>
            <Stack className="rprt_progbar_flx">
              <Typography className="rprt_progbar_text">
                Direct Reports
              </Typography>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{
                  height: "8px",
                  borderRadius: "16px",
                  "&.MuiLinearProgress-root": {
                    backgroundColor: "#EAECEF",
                    width: "100%",
                  },
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#1BAD70",
                    borderRadius: "16px",
                  },
                }}
              />
            </Stack>
            <Stack className="rprt_progbar_flx">
              <Typography className="rprt_progbar_text">
                Senior Stakeholders
              </Typography>
              <Box className="rprt_last_progbar_contr">
                <LinearProgress
                  variant="determinate"
                  value={25}
                  sx={{
                    height: "8px",
                    borderRadius: "16px",
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#EAECEF",
                      width: "100%",
                    },
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#E74649",
                      borderRadius: "16px",
                    },
                  }}
                />
                <Stack className="rprt_progbar_values_flx">
                  <Typography className="rprt_progbar_value_txt">0</Typography>
                  <Typography className="rprt_progbar_value_txt">1</Typography>
                  <Typography className="rprt_progbar_value_txt">2</Typography>
                  <Typography className="rprt_progbar_value_txt">3</Typography>
                  <Typography className="rprt_progbar_value_txt">4</Typography>
                  <Typography className="rprt_progbar_value_txt">5</Typography>
                  <Typography className="rprt_progbar_value_txt">6</Typography>
                  <Typography className="rprt_progbar_value_txt">7</Typography>
                  <Typography className="rprt_progbar_value_txt">8</Typography>
                  <Typography className="rprt_progbar_value_txt">9</Typography>
                  <Typography className="rprt_progbar_value_txt">10</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
          {/* Result Summary - Section 2 - Option 1 */}
          <Box className="reslt_sumry_contr rprt_sect_mt">
            <Typography className="rprt_headng">
              Summary of your Result
            </Typography>
            <Typography className="rprt_subheadng">
              Summary of the results from the Assessment
            </Typography>
            <Box className="reslt_sumry_box">
              <Box className="top_comptncy_box">
                <Typography className="copmtncy_headng">
                  Top performing competency
                </Typography>
                <Stack className="copmtncy_flx">
                  <Typography className="copmtncy_title">
                    Category Growth Management
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: "8px",
                      borderRadius: "16px",
                      "&.MuiLinearProgress-root": {
                        backgroundColor: "#EAECEF",
                        width: "100%",
                      },
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#1BAD70",
                        borderRadius: "16px",
                      },
                    }}
                  />
                  <Typography className="copmtncy_perctg green">
                    83.43%
                  </Typography>
                  <Typography className="copmtncy_text green">
                    Area of Strength
                  </Typography>
                </Stack>
                <Collapse in={expanded}>
                  <Stack className="copmtncy_flx">
                    <Typography className="copmtncy_title">
                      Category Growth Management2
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={55}
                      sx={{
                        height: "8px",
                        borderRadius: "16px",
                        "&.MuiLinearProgress-root": {
                          backgroundColor: "#EAECEF",
                          width: "100%",
                        },
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#EFD02E",
                          borderRadius: "16px",
                        },
                      }}
                    />
                    <Typography className="copmtncy_perctg yellow">
                      53.43%
                    </Typography>
                    <Typography className="copmtncy_text yellow">
                      Can be enhanced further
                    </Typography>
                  </Stack>
                </Collapse>
              </Box>
              <Box className="low_comptncy_box">
                <Typography className="copmtncy_headng">
                  Low performing competency
                </Typography>
                <Stack className="copmtncy_flx">
                  <Typography className="copmtncy_title">
                    Category Growth Management
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={25}
                    sx={{
                      height: "8px",
                      borderRadius: "16px",
                      "&.MuiLinearProgress-root": {
                        backgroundColor: "#EAECEF",
                        width: "100%",
                      },
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#E74649",
                        borderRadius: "16px",
                      },
                    }}
                  />
                  <Typography className="copmtncy_perctg red">
                    23.43%
                  </Typography>
                  <Typography className="copmtncy_text red">
                    Area of Development
                  </Typography>
                </Stack>
                <Collapse in={expanded}>
                  <Stack className="copmtncy_flx">
                    <Typography className="copmtncy_title">
                      Category Growth Management2
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={35}
                      sx={{
                        height: "8px",
                        borderRadius: "16px",
                        "&.MuiLinearProgress-root": {
                          backgroundColor: "#EAECEF",
                          width: "100%",
                        },
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#E74649",
                          borderRadius: "16px",
                        },
                      }}
                    />
                    <Typography className="copmtncy_perctg red">
                      33.43%
                    </Typography>
                    <Typography className="copmtncy_text red">
                      Area of Development
                    </Typography>
                  </Stack>
                </Collapse>
              </Box>
              <Box className="copmtncy_cta_contr">
                <Button
                  className="outlined_cta"
                  onClick={() => handleCollapse()}
                >
                  View More
                </Button>
              </Box>
            </Box>
          </Box>
          {/* Result Summary - Section 2 - Option 2 */}
          <Box className="reslt_sumry_contr rprt_sect_mt">
            <Typography className="rprt_headng">
              Summary of your Result
            </Typography>
            <Typography className="rprt_subheadng">
              Summary of the results from the Assessment
            </Typography>
            <Box className="reslt_sumry_box">
              <Stack className="copmtncy_flx">
                <Typography className="copmtncy_title">Competency 1</Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    height: "8px",
                    borderRadius: "16px",
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#EAECEF",
                      width: "100%",
                    },
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#1BAD70",
                      borderRadius: "16px",
                    },
                  }}
                />
                <Typography className="copmtncy_perctg green">
                  83.43%
                </Typography>
                <Typography className="copmtncy_text green">
                  Area of Strength
                </Typography>
              </Stack>
              <Stack className="copmtncy_flx">
                <Typography className="copmtncy_title">Competency 2</Typography>
                <LinearProgress
                  variant="determinate"
                  value={55}
                  sx={{
                    height: "8px",
                    borderRadius: "16px",
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#EAECEF",
                      width: "100%",
                    },
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#EFD02E",
                      borderRadius: "16px",
                    },
                  }}
                />
                <Typography className="copmtncy_perctg yellow">
                  53.43%
                </Typography>
                <Typography className="copmtncy_text yellow">
                  Can be enhanced further
                </Typography>
              </Stack>
              <Stack className="copmtncy_flx">
                <Typography className="copmtncy_title">Competency 3</Typography>
                <LinearProgress
                  variant="determinate"
                  value={25}
                  sx={{
                    height: "8px",
                    borderRadius: "16px",
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#EAECEF",
                      width: "100%",
                    },
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#E74649",
                      borderRadius: "16px",
                    },
                  }}
                />
                <Typography className="copmtncy_perctg red">23.43%</Typography>
                <Typography className="copmtncy_text red">
                  Area of Development
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* Deep Dive Result - Section 3 */}
          <Box className="deep_rslt_contr rprt_sect_mt">
            <Typography className="rprt_headng">
              Deep dive of your result
            </Typography>
            <Typography className="rprt_subheadng">
              Summary of the results from the Assessment
            </Typography>
            <Box className="deep_rslt_box">
              <Stack className="deep_rslt_prgbar_flx">
                <Typography className="copmtncy_title">
                  {tabValue === "1"
                    ? "Competency 1 / Competency 2 - without work now - Summary vs except self"
                    : tabValue === "2"
                    ? "Competency - Self vs Others"
                    : tabValue === "3"
                    ? "Competency - Skill trend Analysis"
                    : "Competency - Sub - skill Info"}
                </Typography>
                <Typography className="copmtncy_perctg red">23.43%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={25}
                sx={{
                  height: "8px",
                  borderRadius: "16px",
                  margin: "16px 0 8px",
                  "&.MuiLinearProgress-root": {
                    backgroundColor: "#EAECEF",
                    width: "100%",
                  },
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#E74649",
                    borderRadius: "16px",
                  },
                }}
              />
              <Typography className="copmtncy_text red">
                Area of Development
              </Typography>
              <Typography className="deep_rslt_descp">
                Lorem ipsum dolor sit amet consectetur. Ullamcorper ut donec
                mauris arcu tellus curabitur justo. Nibh vitae proin mauris cum
                condimentum mollis sed vulputate. At integer faucibus nunc orci
                enim. Viverra turpis adipiscing varius maecenas. Lorem ipsum
                dolor sit amet consectetur. Ullamcorper ut donec mauris arcu
                tellus curabitur justo.
              </Typography>
              <Box className="wrknw_drpdwn_contr">
                <Stack className="wrknw_drpdwn_contr_flx">
                  <Typography className="wrknw_drpdwn_contr_title">
                    Work on this Skill
                  </Typography>
                  <Button
                    className="standard_cta"
                    endIcon={
                      workNow ? (
                        <ExpandLessRoundedIcon />
                      ) : (
                        <ExpandMoreRoundedIcon />
                      )
                    }
                    onClick={() => handleWorkNow()}
                  >
                    Work Now
                  </Button>
                </Stack>
                <Collapse in={workNow}>
                  <Divider className="wrknw_drpdwn_hr" />
                  <Typography className="wrknw_drpdwn_title">
                    Goals you can work on to better your skill
                  </Typography>
                  <Stack className="wrknw_drpdwn_flx">
                    <Typography className="wrknw_drpdwn_descp">
                      Show the wide gap between demand - supply of Charter
                      Flights to religious sites and indicate that the
                      Government cannot single handedly bridge the gap.
                    </Typography>
                    <Typography className="wrknw_drpdwn_goaldtls">
                      View Goal Details
                    </Typography>
                  </Stack>
                  <Stack className="wrknw_drpdwn_flx">
                    <Typography className="wrknw_drpdwn_descp">
                      Show the wide gap between demand - supply of Charter
                      Flights to religious sites and indicate that the
                      Government cannot single handedly bridge the gap.
                    </Typography>
                    <Typography className="wrknw_drpdwn_goaldtls">
                      View Goal Details
                    </Typography>
                  </Stack>
                </Collapse>
              </Box>
              <Box className="rprt_tab_contr">
                <Box className="rprt_tab_box">
                  <Tabs value={tabValue} onChange={handleRprtTab} centered>
                    <Tab label="Summary Vs All except Self" value="1" />
                    <Tab label="Self Vs Others" value="2" />
                    <Tab label="Skill Trend Analysis" value="3" />
                    <Tab label="Sub-skill info" value="4" />
                  </Tabs>
                </Box>
                {tabValue === "1" ? (
                  <Box className="rprt_tab_cntnt_contr">
                    <Typography className="rprt_tab_title">
                      Self vs All Except Self
                    </Typography>
                    <Typography className="rprt_tab_subtext">
                      Summary of comparison between self and others
                    </Typography>
                    <Box className="rprt_progbar_contr">
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Self
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={85}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          All except Self
                        </Typography>
                        <Box className="rprt_last_progbar_contr">
                          <LinearProgress
                            variant="determinate"
                            value={25}
                            sx={{
                              height: "8px",
                              borderRadius: "16px",
                              "&.MuiLinearProgress-root": {
                                backgroundColor: "#EAECEF",
                                width: "100%",
                              },
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#E74649",
                                borderRadius: "16px",
                              },
                            }}
                          />
                          <Stack className="rprt_progbar_values_flx">
                            <Typography className="rprt_progbar_value_txt">
                              0
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              1
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              2
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              3
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              4
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              5
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              6
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              7
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              8
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              9
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              10
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                ) : tabValue === "2" ? (
                  <Box className="rprt_tab_cntnt_contr">
                    <Typography className="rprt_tab_title">
                      Self vs Others
                    </Typography>
                    <Typography className="rprt_tab_subtext">
                      Summary of comparison between self and others
                    </Typography>
                    <Box className="rprt_progbar_contr">
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Self
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={25}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#E74649",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Peers
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={45}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          All except Self
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={85}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Manager
                        </Typography>
                        <Box className="rprt_last_progbar_contr">
                          <LinearProgress
                            variant="determinate"
                            value={25}
                            sx={{
                              height: "8px",
                              borderRadius: "16px",
                              "&.MuiLinearProgress-root": {
                                backgroundColor: "#EAECEF",
                                width: "100%",
                              },
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#E74649",
                                borderRadius: "16px",
                              },
                            }}
                          />
                          <Stack className="rprt_progbar_values_flx">
                            <Typography className="rprt_progbar_value_txt">
                              0
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              1
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              2
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              3
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              4
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              5
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              6
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              7
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              8
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              9
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              10
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                ) : tabValue === "3" ? (
                  <Box className="rprt_tab_cntnt_contr">
                    <Typography className="rprt_tab_title">
                      Skill Trend Analysis
                    </Typography>
                    <Typography className="rprt_tab_subtext">
                      Summary of past 5 Attempts
                    </Typography>
                    <Typography className="deep_rslt_descp">
                      Lorem ipsum dolor sit amet consectetur. Ullamcorper ut
                      donec mauris arcu tellus curabitur justo. Nibh vitae proin
                      mauris cum condimentum mollis sed vulputate. At integer
                      faucibus nunc orci enim. Viverra turpis adipiscing varius
                      maecenas. Lorem ipsum dolor sit amet consectetur.
                      Ullamcorper ut donec mauris arcu tellus curabitur justo.
                    </Typography>
                    <Box className="rprts_bar_graph_contr">
                      <SkillTrendAanlysisGraph />
                    </Box>
                  </Box>
                ) : (
                  <Box className="rprt_tab_cntnt_contr">
                    <Typography className="rprt_tab_title">
                      Sub - Skill Information
                    </Typography>
                    <Typography className="rprt_tab_subtext">
                      Summary of past 5 Attempts
                    </Typography>
                    <Box className="rprt_progbar_contr">
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Deductive Reasoning
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={85}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#1BAD70",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Lateral conceptualization
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={45}
                          sx={{
                            height: "8px",
                            borderRadius: "16px",
                            "&.MuiLinearProgress-root": {
                              backgroundColor: "#EAECEF",
                              width: "100%",
                            },
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#EFD02E",
                              borderRadius: "16px",
                            },
                          }}
                        />
                      </Stack>
                      <Stack className="rprt_progbar_flx">
                        <Typography className="rprt_progbar_text">
                          Business Accumen
                        </Typography>
                        <Box className="rprt_last_progbar_contr">
                          <LinearProgress
                            variant="determinate"
                            value={25}
                            sx={{
                              height: "8px",
                              borderRadius: "16px",
                              "&.MuiLinearProgress-root": {
                                backgroundColor: "#EAECEF",
                                width: "100%",
                              },
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#E74649",
                                borderRadius: "16px",
                              },
                            }}
                          />
                          <Stack className="rprt_progbar_values_flx">
                            <Typography className="rprt_progbar_value_txt">
                              0
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              1
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              2
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              3
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              4
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              5
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              6
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              7
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              8
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              9
                            </Typography>
                            <Typography className="rprt_progbar_value_txt">
                              10
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          {/* Free Text Responses - Section 4 */}
          <Box className="respon_contr rprt_sect_mt">
            <Typography className="rprt_headng">Free Text Responses</Typography>
            <Typography className="rprt_subheadng">
              This section provides a summary of all the responses
            </Typography>
            <Box className="respon_box">
              <Typography className="respon_quest">
                Category growth Management Category growth Management Category
                growth Management?
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap.
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap.
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap. Show the wide gap between demand -
                supply of Charter Flights to religious sites and indicate that
                the Government cannot single handedly bridge the gap.
              </Typography>
            </Box>
            <Box className="respon_box">
              <Typography className="respon_quest">
                Category growth Management Category growth Management Category
                growth Management?
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap.
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap.
              </Typography>
              <Typography className="respon_answ">
                Show the wide gap between demand - supply of Charter Flights to
                religious sites and indicate that the Government cannot single
                handedly bridge the gap. Show the wide gap between demand -
                supply of Charter Flights to religious sites and indicate that
                the Government cannot single handedly bridge the gap.
              </Typography>
            </Box>
          </Box>
          {/* Annexure - Section 5 */}
          <Box className="annexr_contr rprt_sect_mt">
            <Typography className="rprt_headng">Annexure</Typography>
            <Typography className="rprt_subheadng">
              This section provides annexure
            </Typography>
            <Box className="annexr_box">
              <Typography>HTML Content like tables etc., goes here</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="rprt_footer_contr">
        <Typography className="rprt_footer_text">
          Copyright information., NWORX 2023
        </Typography>
      </Box>
    </>
  );
};
export default PAReportsNew;
