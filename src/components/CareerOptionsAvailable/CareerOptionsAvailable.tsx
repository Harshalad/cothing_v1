import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Avatar, Box, Button, Dialog, DialogContent, Divider, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { useRouter } from "next/router";

const drawerWidth = 250;

const CareerMap = () => {
  const router = useRouter();
  const [openOpsDirModal, setOpsDirModal] = useState(false);
  const [openSalesMngModel, setSalesMngModel] = useState(false);
  const [openMrtngMngrModel, setMrtngMngrModel] = useState(false);
  const [openCareerModel, setOpenCareerModel] = useState(false);
  const handelStartClick =() =>{
    if(openSalesMngModel || openOpsDirModal || openMrtngMngrModel){
      router.push(
        "https://performance-staging.web.app/align/add-goal/?devArea=Business%20Acumen"
      );
    }else{
      ""
    }
  }
  const openCareerModal = (modelName: any) => {
    setOpenCareerModel(true);
    if(modelName === "sr_sales_manager") {
      setSalesMngModel(true);
    }
    else if(modelName === "marketing_manager") {
      setMrtngMngrModel(true);
    }
    else {
      setOpsDirModal(true);
    }
  }

  const closeCareerModal = () => {
    setOpenCareerModel(false);
    setTimeout(() => {
      setSalesMngModel(false);
      setMrtngMngrModel(false);
      setOpsDirModal(false);
    }, 100);
  }

  return (
    <>
      <Box className="career_map_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Role options available to you</title>
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
            className="analyze_mra"
          >
            <Typography
              //@ts-ignore
              variant="span"
              sx={{
                fontWeight: "500",
                color: "#2D3648",
                marginBottom: "24px",
                cursor: "pointer",
              }}
              className="go_back_flex"
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
            <Typography className="career_title">
              Role options available to you
            </Typography>
            <Box className="career_info_contr">
              <Stack className="career_info_flx">
                <Stack className="career_profile_flx">
                  <Avatar
                    sx={{
                      width: "68px",
                      height: "68px",
                      bgcolor: "#DFFFF2",
                      color: "#1BAD70",
                      fontSize: "16px",
                      fontWeight: "600",
                      border: "1px solid #1BAD70",
                    }}
                  >
                    SA
                  </Avatar>
                  <Box>
                    <Typography className="career_profile_name">
                      Saurabh Agarwal
                    </Typography>
                    <Typography className="career_profile_desg">
                      Area Sales Manager
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  <Typography className="career_validtd_txt">
                    Last Validated Date
                  </Typography>
                  <Typography className="career_validtd_date">
                    01.JUL.2023
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Stack className="career_role_indctr_contr">
              <Stack className="career_role_indctr_flx">
                <CircleIcon sx={{ color: "#2E5DB0", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Current role
                </Typography>
              </Stack>
              <Stack className="career_role_indctr_flx">
                <CircleIcon sx={{ color: "#1BAD70", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Possible next role - Easy
                </Typography>
              </Stack>
              <Stack className="career_role_indctr_flx">
                <CircleIcon sx={{ color: "#EFCE5B", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Possible next role - Intermediate
                </Typography>
              </Stack>
              <Stack className="career_role_indctr_flx">
                <CircleIcon sx={{ color: "#C20000", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Possible next role - Complex
                </Typography>
              </Stack>
              <Stack className="career_role_indctr_flx">
                <CircleIcon sx={{ color: "#989EA5", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Not applicable at the moment
                </Typography>
              </Stack>
            </Stack>
            <Box className="career_map_contr">
              <Stack className="career_map_flx">
                <Typography className="career_map_heading">Sales</Typography>
                <Box className="career_map_roles_flx">
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Territory Sales Officer
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr blue">
                    <Typography className="career_map_role_name">
                      Area Sales Manager
                    </Typography>
                  </Box>
                  <Box
                    className="career_map_role_contr green"
                    onClick={() => openCareerModal("sr_sales_manager")}
                  >
                    <Typography className="career_map_role_name">
                      Regional Sales Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Zonal Sales Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      National Sales Head
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Cluster Head
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Stack className="career_map_flx">
                <Typography className="career_map_heading">
                  Sales Operations
                </Typography>
                <Box className="career_map_roles_flx">
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Sales Operations Analyst
                    </Typography>
                  </Box>
                  <Box
                    className="career_map_role_contr red"
                    onClick={() => openCareerModal("ops_director")}
                  >
                    <Typography className="career_map_role_name">
                      Sales Operations Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Channel Sales Operations Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Zonal Sales Operations Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      National Sales Operations Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Cluster Sales Operations Director
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Stack className="career_map_flx">
                <Typography className="career_map_heading">
                  Marketing
                </Typography>
                <Box className="career_map_roles_flx">
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Marketing Analyst
                    </Typography>
                  </Box>
                  <Box
                    className="career_map_role_contr yellow"
                    onClick={() => openCareerModal("marketing_manager")}
                  >
                    <Typography className="career_map_role_name">
                      Marketing Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Product Marketing Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Product and Channel Marketing Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Marketing Director
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
                    <Typography className="career_map_role_name">
                      Marketing VP
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={openCareerModel} className="career_map_modal">
        <CloseIcon
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "1",
            cursor: "pointer",
          }}
          onClick={() => {
            closeCareerModal();
          }}
        />
        <DialogContent>
          <Typography className="career_map_modal_title">Career Map</Typography>
          <Box className="career_modal_4_col">
            <Box className="career_modal_rqrd_devmnt">
              <Box className="career_modal_row_contr">
                <Typography className="career_modal_row_heading bold title">
                  Required Development
                </Typography>
              </Box>
              <Box className="career_modal_rqrddevmnt_contr">
                <Box className="career_modal_contr">
                  <Box className="career_modal_row_contr">
                    <Typography className="career_modal_row_heading bold">
                      Skill Proficiency
                    </Typography>
                  </Box>
                  <Box className="career_modal_row_contr frt_row">
                    <Typography className="career_modal_row_heading bold">
                      Current role
                    </Typography>
                    <Box className="career_modal_role_box blue">
                      <Typography className="career_modal_role_name">
                        Area Sales Manager
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="career_modal_row_contr">
                    <Typography className="career_modal_row_heading bold"></Typography>
                  </Box>
                  <Box className="career_modal_row_contr frt_row">
                    <Typography className="career_modal_row_heading bold">
                      Aspired Role
                    </Typography>
                    <Box
                      className={`career_modal_role_box ${
                        openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                      }`}
                    >
                      <Typography className="career_modal_role_name">
                        {openMrtngMngrModel
                          ? "Marketing Manager"
                          : openSalesMngModel ? "Regional Sales Manager"
                          : "Sales Operation Manager"
                        }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="career_modal_contr mt scnd_row">
                  <Box className="career_modal_row_contr">
                    <Typography className="career_modal_row_heading">
                      Commercial Acumen
                    </Typography>
                  </Box>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        2
                      </Typography>
                    </Box>
                    <Divider
                      className={`career_modal_hr ${
                        openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                      }`}
                    />
                  </Stack>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb no_zindx">
                      <Typography className="career_modal_row_heading"></Typography>
                    </Box>
                    <Stack className="career_modal_linarw_flx">
                      <Divider
                        className={`career_modal_linarw_hr ${
                          openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                        }`}
                      />
                      <KeyboardArrowRightIcon
                        className={`${openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"}`}
                      />
                    </Stack>
                  </Stack>
                  <Box className="career_modal_row_contr numb">
                    <Typography className="career_modal_row_heading">
                      {openMrtngMngrModel ? "1" : "2"}
                    </Typography>
                  </Box>
                </Box>
                {openMrtngMngrModel ? (
                  <>
                    <Box className="career_modal_contr mt scnd_row">
                      <Box className="career_modal_row_contr">
                        <Typography className="career_modal_row_heading">
                          Trade Management
                        </Typography>
                      </Box>
                      <Stack className="career_modal_numb_flx">
                        <Box className="career_modal_row_contr numb">
                          <Typography className="career_modal_row_heading">
                            2
                          </Typography>
                        </Box>
                        <Divider
                          className={`career_modal_hr ${
                            openMrtngMngrModel ? "yellow" : "green"
                          }`}
                        />
                      </Stack>
                      <Stack className="career_modal_numb_flx">
                        <Box className="career_modal_row_contr numb no_zindx">
                          <Typography className="career_modal_row_heading"></Typography>
                        </Box>
                        <Stack className="career_modal_linarw_flx">
                          <Divider
                            className={`career_modal_linarw_hr ${
                              openMrtngMngrModel ? "yellow" : "green"
                            }`}
                          />
                          <KeyboardArrowRightIcon
                            className={`${
                              openMrtngMngrModel ? "yellow" : "green"
                            }`}
                          />
                        </Stack>
                      </Stack>
                      <Box className="career_modal_row_contr numb">
                        <Typography className="career_modal_row_heading">
                          {openMrtngMngrModel ? "1" : "2"}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : openSalesMngModel ? (
                  <>
                    <Box className="career_modal_contr mt scnd_row">
                      <Box className="career_modal_row_contr">
                        <Typography className="career_modal_row_heading">
                          Trade Management
                        </Typography>
                      </Box>
                      <Stack className="career_modal_numb_flx">
                        <Box className="career_modal_row_contr numb">
                          <Typography className="career_modal_row_heading">
                            2
                          </Typography>
                        </Box>
                        <Divider className="career_modal_hr" />
                      </Stack>
                      <Stack className="career_modal_numb_flx">
                        <Box className="career_modal_row_contr numb">
                          <Typography className="career_modal_row_heading">
                            + 1
                          </Typography>
                        </Box>
                        <Stack className="career_modal_linarw_flx">
                          <Divider
                            className={`career_modal_linarw_hr ${
                              openOpsDirModal ? "red" : "green"
                            }`}
                          />
                          <KeyboardArrowRightIcon
                            className={`${openOpsDirModal ? "red" : "green"}`}
                          />
                        </Stack>
                      </Stack>
                      <Box className="career_modal_row_contr numb">
                        <Typography className="career_modal_row_heading">
                          3
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : 
                    ""
                }
                <Box className="career_modal_contr mt scnd_row">
                  <Box className="career_modal_row_contr">
                    <Typography className="career_modal_row_heading">
                      Cross Functional Collaboration
                    </Typography>
                  </Box>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        1
                      </Typography>
                    </Box>
                    <Divider className="career_modal_hr" />
                  </Stack>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        + 1
                      </Typography>
                    </Box>
                    <Stack className="career_modal_linarw_flx">
                      <Divider
                        className={`career_modal_linarw_hr ${
                          openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                        }`}
                      />
                      <KeyboardArrowRightIcon
                        className={`${openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"}`}
                      />
                    </Stack>
                  </Stack>
                  <Box className="career_modal_row_contr numb">
                    <Typography className="career_modal_row_heading">
                      2
                    </Typography>
                  </Box>
                </Box>
                <Box className="career_modal_contr mt scnd_row">
                  <Box className="career_modal_row_contr">
                    <Typography className="career_modal_row_heading">
                      Business Strategy and Potential
                    </Typography>
                  </Box>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        1
                      </Typography>
                    </Box>
                    <Divider className="career_modal_hr" />
                  </Stack>
                  <Stack className="career_modal_numb_flx">
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        + 1
                      </Typography>
                    </Box>
                    <Stack className="career_modal_linarw_flx">
                      <Divider
                        className={`career_modal_linarw_hr ${
                          openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                        }`}
                      />
                      <KeyboardArrowRightIcon
                        className={`${openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"}`}
                      />
                    </Stack>
                  </Stack>
                  <Box className="career_modal_row_contr numb">
                    <Typography className="career_modal_row_heading">
                      2
                    </Typography>
                  </Box>
                </Box>
                {openOpsDirModal ? (
                  <Box className="career_modal_contr mt scnd_row">
                    <Box className="career_modal_row_contr">
                      <Typography className="career_modal_row_heading">
                        Operational Effectiveness
                      </Typography>
                    </Box>
                    <Stack className="career_modal_numb_flx">
                      <Box className="career_modal_row_contr numb">
                        <Typography className="career_modal_row_heading">
                          X
                        </Typography>
                      </Box>
                      <Divider className="career_modal_hr" />
                    </Stack>
                    <Stack className="career_modal_numb_flx">
                      <Box className="career_modal_row_contr numb">
                        <Typography className="career_modal_row_heading">
                          + 2
                        </Typography>
                      </Box>
                      <Stack className="career_modal_linarw_flx">
                        <Divider
                          className={`career_modal_linarw_hr ${
                            openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"
                          }`}
                        />
                        <KeyboardArrowRightIcon
                          className={`${openMrtngMngrModel ? "yellow" : openSalesMngModel ? "green" : "red"}`}
                        />
                      </Stack>
                    </Stack>
                    <Box className="career_modal_row_contr numb">
                      <Typography className="career_modal_row_heading">
                        2
                      </Typography>
                    </Box>
                  </Box>
                ) : ""
                }
              </Box>
            </Box>
            <Box className="career_modal_rqrd_expsr">
              <Box className="career_modal_row_contr">
                <Typography className="career_modal_row_heading bold title">
                  Required Exposure
                </Typography>
              </Box>
              <Box className="career_modal_rqrdexpsr_contr">
                <>
                  <Typography className="career_modal_row_heading">
                    {openMrtngMngrModel
                      ? "Placeholder exposure 1 for this role"
                      : openSalesMngModel
                      ? "Create a strategic plan for the region to increase revenue by 30% while lowering cost of business by 10%."
                      : "Placeholder exposure 1 for this role"}
                  </Typography>
                  <Typography className="career_modal_row_heading">
                    {openMrtngMngrModel
                      ? "Placeholder exposure 2 for this role"
                      : openSalesMngModel
                      ? "Create a comprehensive model to evaluate and estimate risks and opportunities in a 2-3 year horizon."
                      : "Placeholder exposure 2 for this role"}
                  </Typography>
                </>
              </Box>
            </Box>
            <Box className="career_modal_cta_contr">
              <Button
                className="standard_cta"
                onClick={() => handelStartClick()}
              >
                Create Plan
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CareerMap;