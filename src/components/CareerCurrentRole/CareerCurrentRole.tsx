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
  const [openCareerModel, setOpenCareerModel] = useState(false);
  const handelStartClick =() =>{
    if(openOpsDirModal){
      router.push(
        "https://performance-staging.web.app/align/add-goal/?devArea=Ops Director - Manage Stakeholders||Ops Director - Execution Excellence||Ops Director- Manage Talent"
      );
    }else{
      router.push(
        "https://performance-staging.web.app/align/add-goal/?devArea=Senior Sales Manager - Manage Stakeholders||Senior Sales Manager - Drive Strategy & Growth"
      );
    }
  }
  const openCareerModal = (modelName: any) => {
    setOpenCareerModel(true);
    if(modelName === "sr_sales_manager") {
      setSalesMngModel(true);
    }
    else {
      setOpsDirModal(true);
    }
  }

  const closeCareerModal = () => {
    setOpenCareerModel(false);
    setTimeout(() => {
      setSalesMngModel(false);
      setOpsDirModal(false);
    }, 100);
  }

  return (
    <>
      <Box className="career_map_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Roles in your function and your current role</title>
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
              Roles in your function and your current role
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
                <CircleIcon sx={{ color: "#989EA5", fontSize: "12px" }} />
                <Typography className="career_role_indctr_text">
                  Other roles
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
                  <Box
                    className="career_map_role_contr blue"
                    onClick={() => openCareerModal("sr_sales_manager")}
                  >
                    <Typography className="career_map_role_name">
                      Area Sales Manager
                    </Typography>
                  </Box>
                  <Box className="career_map_role_contr grey">
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openCareerModel}
        className="career_map_modal career_current_role_modal"
      >
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
                  Current Role Details
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
                  </Stack>
                </Box>
                <Box className="career_modal_contr mt">
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
                  </Stack>
                </Box>
                <Box className="career_modal_contr mt">
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
                  </Stack>
                </Box>
                <Box className="career_modal_contr mt">
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
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box className="career_modal_rqrd_expsr">
              <Box className="career_modal_row_contr">
                <Typography className="career_modal_row_heading bold title">
                  Exposure
                </Typography>
              </Box>
              <Box className="career_modal_rqrdexpsr_contr">
                <Typography className="career_modal_row_heading">
                  Lead a team to achieve area targets over 4 quarters.
                </Typography>
                <Typography className="career_modal_row_heading">
                  Execute one plan to enhance topline by atleast 25% in one product.
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CareerMap;