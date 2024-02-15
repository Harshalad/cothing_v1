import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchBatteryGroupDetails } from "../../actions/analyze/fetchBatteryGroupDetails";
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import Spinner from "../common/Spinner/Spinner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
const drawerWidth = 250;
const ViewBattery = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const bId = router?.query?.bId;
  const gId = router?.query?.gId;
  const type = router?.query?.type;
  const goalId = router?.query?.goalId;
  const milestoneId = router?.query?.milestoneId;
  const methodId = router?.query?.methodId;
  const [groupBatteryDetails, setGroupBatteryDetails] = useState<any>(null);
  const [loadSppiner, setLoadSppiner] = useState<any>(null);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  useEffect(() => {
    const getgroupBatteryDetails = async () => {
      const response = await fetchBatteryGroupDetails({
        userId: user?.id,
        batteryGroupId: gId,
      });
      if (response) {
        //@ts-ignore
        setGroupBatteryDetails(response?.groupBatteryDetails);
      }
    };
    getgroupBatteryDetails();
  }, [bId]);



  console.log(groupBatteryDetails, "batteryHere");
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Prep Work</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={{
          width: { tablet: `calc(100% - ${drawerWidth}px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
          marginTop: "100px",
        }}
      >
        <Box className="prep_head_box">
          <Stack className="prep_head_flex">
            <Stack
              className="prep_title_box"
              onClick={() => router.back()}
              sx={{ width: "20px", cursor: "pointer" }}
            >
              <Typography>
                <ChevronLeftIcon />
              </Typography>
              <Typography className="prep_tile">Back</Typography>
            </Stack>
            <Stack className="prep_head_right">
              {/* <Stack className="setting_flex">
                  <Typography className="setting_title">
                    The data you save can be accessed by NWORX experts and
                    managers
                  </Typography>
                  <Stack className="setting_icon_flex">
                    <SettingsOutlinedIcon sx={{ color: "#2E5DB0" }} />
                    <Typography className="setting_icon_label">
                      Permission settings
                    </Typography>
                  </Stack>
                </Stack> */}
              {/* <EnterAdditionalData /> */}
            </Stack>
          </Stack>
        </Box>
        {!groupBatteryDetails?<Spinner/>:<Box className="view_more">
          <Box className="avlbl_assmnts_card">
            <Box className={`${expanded ? "avlbl_assmnts_top_card" : "no_bg"}`}>
              <Box className="avlbl_assmnts_top_inner">
                <Typography className="avlbl_assmnts_card_title">
                  {groupBatteryDetails?.name}
                </Typography>
                <Typography className="avlbl_assmnts_card_descrpt">
                  {groupBatteryDetails?.description}
                </Typography>
                {/* <Typography className="avlbl_assmnts_skills">
                Skills evaluated : Skill Tag 1 | Skill Tag 2
              </Typography> */}
                <Stack className="avlbl_assmnts_infocta_flx">
                  <Stack className="avlbl_assmnts_info_flx">
                    {/* <Stack className="avlbl_assmnts_durtn_flx">
                    <AccessTimeOutlinedIcon
                      sx={{ color: "#1C2129", fontSize: "12px" }}
                    />
                    <Typography className="avlbl_assmnts_durtn">
                      30- 35 mins
                    </Typography>
                  </Stack> */}
                    <Stack className="avlbl_assmnts_totlquests_flx">
                      <AssignmentOutlinedIcon
                        sx={{ color: "#1C2129", fontSize: "12px" }}
                      />
                      <Typography className="avlbl_assmnts_totl_quests">
                        {groupBatteryDetails?.batteries?.length} Battery
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box className="analyze_cta">
                    <Stack className="analyze_cta_flx">
                      <Button
                        className="standard_cta"
                        onClick={() => handleExpand()}
                      >
                        View More
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Collapse in={expanded}>
              {groupBatteryDetails?.batteries?.map(
                (battery: any, index: any) => {
                  return (
                    <Stack className="assmnts_view_more_flex" key={index}>
                      <Box className="assmnts_view_more_contr">
                        {/* <Stack className="active_assmnts_status_flx">
                          <CircleIcon
                            sx={{ color: "#E74649", fontSize: "12px" }}
                          />
                          <Typography className="active_assmnts_status_text ntstrtd">
                            Not Started
                          </Typography>
                        </Stack> */}
                        <Typography className="avlbl_assmnts_card_title">
                          {battery?.name}
                        </Typography>
                        <Typography className="avlbl_assmnts_card_descrpt">
                          {battery?.description}
                        </Typography>
                        {/* <Stack className="avlbl_assmnts_info_flx">
                          <Stack className="avlbl_assmnts_durtn_flx">
                            <AccessTimeOutlinedIcon
                              sx={{ color: "#1C2129", fontSize: "12px" }}
                            />
                            <Typography className="avlbl_assmnts_durtn">
                              {battery?.testDuration}
                            </Typography>
                          </Stack>
                          <Stack className="avlbl_assmnts_totlquests_flx">
                            <HelpOutlineOutlinedIcon
                              sx={{ color: "#1C2129", fontSize: "12px" }}
                            />
                            <Typography className="avlbl_assmnts_totl_quests">
                              15 Questions
                            </Typography>
                          </Stack>
                        </Stack> */}
                      </Box>
                      {loadSppiner === index ? (
                        <Spinner />
                      ) : (
                        <Box className="analyze_cta">
                          <Button
                            className="standard_cta"
                            onClick={() =>
                              router.push({
                                pathname: "/viewBattery",
                                query: {
                                  gId: gId,
                                  bId: battery?.batteryId,
                                  type: type,
                                  goalId: goalId,
                                  milestoneId: milestoneId,
                                  methodId: methodId,
                                },
                              })
                            }
                          >
                            View Battery
                          </Button>
                        </Box>
                      )}
                    </Stack>
                  );
                }
              )}
            </Collapse>
          </Box>
        </Box>}
      </Box>
    </>
  );
};
export default ViewBattery;
