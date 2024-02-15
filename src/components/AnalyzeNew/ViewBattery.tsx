import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchBatteryDetails } from "../../actions/analyze/fetchBatteryDetails";
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
  const userEventId = router?.query?.userEventId;
  const userContentId = router?.query?.userContentId;
  const userMethodId = router?.query?.userMethodId;
  const [batteryDetails, setBatteryDetails] = useState<any>(null);
  const [loadSppiner, setLoadSppiner] = useState<any>(null);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  useEffect(() => {
    const getBatteryDetails = async () => {
      const response = await fetchBatteryDetails({
        userId: user?.id,
        batteryId: bId,
      });
      if (response) {
        //@ts-ignore
        setBatteryDetails(response?.batteryDetails);
      }
    };
    getBatteryDetails();
  }, [bId]);

  const handleBatteryStartClick = async (test: any, index: any) => {
    setLoadSppiner(index);
    const response = await createUserTestMap({
      userId: user?.id,
      testId: test?.testId,
      role: currentUserRole,
      type: type,
      batteryId: bId,
      batteryGroupId: gId,
      startDate: test?.startDate,
      endDate: test?.endDate,
      attemptNo: test?.noOfAttempts,
      programId: user?.activeProgramId,
      userGoalId: goalId,
      milestoneId: milestoneId,
      methodId: methodId,
      userMethodId: userMethodId,
      userContentId: userContentId,
      userEventId: userEventId,
    });
    console.log(response, "utmresponse");
    if (response) {
      const utmId = response;
      const testResponse = await fetchUserTestDetailsApi({
        userTestMapId: utmId,
      });
      // console.log(testResponse,"testResponse");
      //@ts-ignore
      if (testResponse?.response === null) {
        //@ts-ignore
        toast.error(testResponse?.extra);
      } else {
        router.push({
          pathname: "/assessment",
          query: {
            //@ts-ignore
            id: utmId,
          },
        });
      }
    }
    setLoadSppiner(null);
  };
  // const program = useSelector(
  //   // @ts-ignore
  //   (state) => state?.user?.program
  // );

  // console.log(program, "batteryHere");
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
              sx={{ width: "20px", cursor: "pointer"}}
            >
              <Typography>
                <ChevronLeftIcon />
              </Typography>
              <Typography className="prep_tile">Back</Typography>
            </Stack>
          </Stack>
        </Box>
        {!batteryDetails?<Spinner/>:<Box className="view_more">
          <Box className="avlbl_assmnts_card">
            <Box className={`${expanded ? "avlbl_assmnts_top_card" : "no_bg"}`}>
              <Box className="avlbl_assmnts_top_inner">
                <Typography className="avlbl_assmnts_card_title">
                  {batteryDetails?.name}
                </Typography>
                <Typography className="avlbl_assmnts_card_descrpt">
                  {batteryDetails?.description}
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
                        {batteryDetails?.tests?.length} Tests
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
              {batteryDetails?.tests.map((test: any, index: any) => {
                return (
                  <Stack className="assmnts_view_more_flex" key={index}>
                    <Box className="assmnts_view_more_contr">
                      {/* <Stack className="active_assmnts_status_flx">
                      <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
                      <Typography className="active_assmnts_status_text ntstrtd">
                        Not Started
                      </Typography>
                    </Stack> */}
                      <Typography className="avlbl_assmnts_card_title">
                        {test?.name}
                      </Typography>
                      <Typography className="avlbl_assmnts_card_descrpt">
                        {test?.description}
                      </Typography>
                      <Stack className="avlbl_assmnts_info_flx">
                        <Stack className="avlbl_assmnts_durtn_flx">
                          <AccessTimeOutlinedIcon
                            sx={{ color: "#1C2129", fontSize: "12px" }}
                          />
                          <Typography className="avlbl_assmnts_durtn">
                            {test?.testDuration}
                          </Typography>
                        </Stack>
                        {/* <Stack className="avlbl_assmnts_totlquests_flx">
                        <HelpOutlineOutlinedIcon
                          sx={{ color: "#1C2129", fontSize: "12px" }}
                        />
                        <Typography className="avlbl_assmnts_totl_quests">
                          15 Questions
                        </Typography>
                      </Stack> */}
                      </Stack>
                    </Box>
                    {loadSppiner === index ? (
                      <Spinner />
                    ) : (
                      <Box className="analyze_cta">
                        <Button
                          className="standard_cta"
                          onClick={() => handleBatteryStartClick(test, index)}
                        >
                          Start
                        </Button>
                      </Box>
                    )}
                  </Stack>
                );
              })}
            </Collapse>
          </Box>
        </Box>}
      </Box>
    </>
  );
};
export default ViewBattery;
