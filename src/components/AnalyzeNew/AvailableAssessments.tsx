import { useEffect, useState } from "react";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import assessment from "../../constants/proto/assessment/assessment_grpc_web_pb";
import { useRouter } from "next/router";
import ViewMore from "../../components/AnalyzeNew/ViewMore"
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import { useSelector } from "react-redux";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { toast } from "react-toastify";
const AvailableAssessments = ({
  activeClass,
  selfAvailableAssessment,
  seekAvailableAssessment,
  handleViewBatteryClick,
}: any) => {
  const router = useRouter();
  console.log(activeClass, "activeClass");
    //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
   const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [availableAssessments, setAvailableAssessments] = useState<any>(null);
  const [visibleAssessments, setVisibleAssessments] = useState<number>(3);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpandClick = (index: any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  // const [st,setSt]= useState<any>(null);
  useEffect(() => {
    console.log(
      "availableAssessments1",
      seekAvailableAssessment,
      "availableAssessments2",
      selfAvailableAssessment
    );
    if (activeClass === "one") {
      setAvailableAssessments(selfAvailableAssessment);
    } else if (activeClass === "two") {
      setAvailableAssessments(seekAvailableAssessment);
    }
  }, [activeClass, selfAvailableAssessment, seekAvailableAssessment]);

  console.log(availableAssessments, "availableAssessments3");

  const handleViewMore = () => {
    setVisibleAssessments((prev) => prev + 3);
  };

  const handleAvailableClick = async(assessment: any) => {
    console.log(assessment,"assessmenttt")
    if (assessment.type === "test") {
      const response = await createUserTestMap({
        userId: user?.id,
        testId: assessment?.id,
        role: currentUserRole,
        type: assessment?.type,
        startDate: assessment?.startDate,
        endDate: assessment?.endDate,
        attemptNo: assessment?.noOfAttempts,
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
    } else {
      router.push({
        pathname: "/mra",
        query: {
          id: assessment?.id,
        },
      });
    }
  };

  const handleViewBattery = (battery: any, grpBattery:any) => {
    handleViewBatteryClick(battery, grpBattery);
  };

  const handleBatteryTestClick = async(battery:any, test:any)=>{
    console.log("Battery Test", battery, test,user);
    const response = await createUserTestMap({
      userId: user?.id,
      testId: test?.testId,
      role: currentUserRole,
      type: battery?.type,
      batteryId: battery?.batteryDetails?.batteryId,
      startDate: test?.startDate,
      endDate: test?.endDate,
      attemptNo: test?.noOfAttempts,
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
  }

  return (
    <>
      {availableAssessments
        ?.slice(0, visibleAssessments)
        .map((assessment: any, index: any) => {
          return (
            <>
              {(assessment?.type === "test" || assessment?.type === "mra") && (
                <Box className="avlbl_assmnts_card">
                  <Box className="no_bg">
                    <Box className="avlbl_assmnts_top_inner">
                      <Typography className="avlbl_assmnts_card_title">
                        {assessment?.name}
                      </Typography>
                      <Typography className="avlbl_assmnts_card_descrpt">
                        {assessment?.description}
                      </Typography>
                      <Typography className="avlbl_assmnts_skills">
                        Skills evaluated : {assessment?.skillsString}
                      </Typography>
                      <Stack className="avlbl_assmnts_infocta_flx">
                        <Stack className="avlbl_assmnts_info_flx">
                          <Stack className="avlbl_assmnts_durtn_flx">
                            <AccessTimeOutlinedIcon
                              sx={{ color: "#1C2129", fontSize: "12px" }}
                            />
                            <Typography className="avlbl_assmnts_durtn">
                              {assessment?.duration}
                            </Typography>
                          </Stack>
                          {/* <Stack className="avlbl_assmnts_totlquests_flx">
                  <AssignmentOutlinedIcon sx={{ color: "#1C2129", fontSize: "12px" }} />
                  <Typography className="avlbl_assmnts_totl_quests">4 Tests</Typography>
                </Stack> */}
                        </Stack>
                        <Box className="analyze_cta">
                          <Stack className="analyze_cta_flx">
                            <Button
                              className="standard_cta"
                              onClick={() => handleAvailableClick(assessment)}
                            >
                              {activeClass === "one" ? "Start" : "Schedule"}
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              )}
              {activeClass === "one" && assessment?.type === "battery" ? (
                <Box className="avlbl_assmnts_card">
                  <Box
                    className={`${
                      expandedIndex === index
                        ? "avlbl_assmnts_top_card"
                        : "no_bg"
                    }`}
                  >
                    <Box className="avlbl_assmnts_top_inner">
                      <Typography className="avlbl_assmnts_card_title">
                        {assessment?.name}
                      </Typography>
                      <Typography className="avlbl_assmnts_card_descrpt">
                        {assessment?.description}
                      </Typography>
                      <Typography className="avlbl_assmnts_skills">
                        Skills evaluated : {assessment?.skillsString}
                      </Typography>
                      <Stack className="avlbl_assmnts_infocta_flx">
                        <Stack className="avlbl_assmnts_info_flx">
                          <Stack className="avlbl_assmnts_durtn_flx">
                            <AccessTimeOutlinedIcon
                              sx={{ color: "#1C2129", fontSize: "12px" }}
                            />
                            <Typography className="avlbl_assmnts_durtn">
                              {assessment?.duration}
                            </Typography>
                          </Stack>
                          <Stack className="avlbl_assmnts_totlquests_flx">
                            <AssignmentOutlinedIcon
                              sx={{ color: "#1C2129", fontSize: "12px" }}
                            />
                            <Typography className="avlbl_assmnts_totl_quests">
                              {assessment?.batteryDetails?.tests?.length}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Box className="analyze_cta">
                          <Stack className="analyze_cta_flx">
                            <Button
                              className="outlined_cta"
                              onClick={() => handleExpandClick(index)}
                            >
                              View {expandedIndex === index ? "Less" : "More"}
                            </Button>
                            {/* <Button className="standard_cta">Start</Button> */}
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Collapse in={expandedIndex === index}>
                    {assessment?.batteryDetails?.tests?.map(
                      (test: any, testIndex: any) => {
                        return (
                          <Stack
                            className="assmnts_view_more_flex"
                            key={testIndex}
                          >
                            <Box className="assmnts_view_more_contr">
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
                              <AssignmentOutlinedIcon
                                sx={{ color: "#1C2129", fontSize: "12px" }}
                              />
                              <Typography className="avlbl_assmnts_totl_quests">
                                4 Tests
                              </Typography>
                            </Stack> */}
                              </Stack>
                            </Box>
                            <Box className="analyze_cta">
                              <Button className="standard_cta" onClick={()=> handleBatteryTestClick(assessment,test)}>Start</Button>
                            </Box>
                          </Stack>
                        );
                      }
                    )}
                  </Collapse>
                </Box>
              ) : (
                activeClass === "one" &&
                assessment?.type === "battery_group" && (
                  <Box className="avlbl_assmnts_card">
                    <Box
                      className={`${
                        expandedIndex === index
                          ? "avlbl_assmnts_top_card"
                          : "no_bg"
                      }`}
                    >
                      <Box className="avlbl_assmnts_top_inner">
                        <Typography className="avlbl_assmnts_card_title">
                          {assessment?.name}
                        </Typography>
                        <Typography className="avlbl_assmnts_card_descrpt">
                          {assessment?.description}
                        </Typography>
                        <Typography className="avlbl_assmnts_skills">
                          Skills evaluated : {assessment?.skillsString}
                        </Typography>
                        <Stack className="avlbl_assmnts_infocta_flx">
                          <Stack className="avlbl_assmnts_info_flx">
                            <Stack className="avlbl_assmnts_durtn_flx">
                              <AccessTimeOutlinedIcon
                                sx={{ color: "#1C2129", fontSize: "12px" }}
                              />
                              <Typography className="avlbl_assmnts_durtn">
                                {assessment?.duration}
                              </Typography>
                            </Stack>
                            <Stack className="avlbl_assmnts_totlquests_flx">
                              <AssignmentOutlinedIcon
                                sx={{ color: "#1C2129", fontSize: "12px" }}
                              />
                              <Typography className="avlbl_assmnts_totl_quests">
                                {
                                  assessment?.batteryGroupDetails?.batteries
                                    ?.length
                                }{" "}
                                Battery
                              </Typography>
                            </Stack>
                          </Stack>
                          <Box className="analyze_cta">
                            <Stack className="analyze_cta_flx">
                              <Button
                                className="outlined_cta"
                                onClick={() => handleExpandClick(index)}
                              >
                                View {expandedIndex === index ? "Less" : "More"}
                              </Button>
                              {/* <Button className="standard_cta">Start</Button> */}
                            </Stack>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                    <Collapse in={expandedIndex === index}>
                      {assessment?.batteryGroupDetails?.batteries?.map(
                        (battery: any, batteryIndex: number) => {
                          return (
                            <Stack className="assmnts_view_more_flex" key={batteryIndex}>
                              <Box className="assmnts_view_more_contr">
                                <Typography className="avlbl_assmnts_card_title">
                                  {battery?.name}
                                </Typography>
                                <Typography className="avlbl_assmnts_card_descrpt">
                                  {battery?.description}
                                </Typography>
                                <Stack className="avlbl_assmnts_info_flx">
                                  {/* <Stack className="avlbl_assmnts_durtn_flx">
                                    <AccessTimeOutlinedIcon
                                      sx={{
                                        color: "#1C2129",
                                        fontSize: "12px",
                                      }}
                                    />
                                    <Typography className="avlbl_assmnts_durtn">
                                      30- 35 mins
                                    </Typography>
                                  </Stack> */}
                                  <Stack className="avlbl_assmnts_totlquests_flx">
                                    <AssignmentOutlinedIcon
                                      sx={{
                                        color: "#1C2129",
                                        fontSize: "12px",
                                      }}
                                    />
                                    <Typography className="avlbl_assmnts_totl_quests">
                                      {battery?.tests?.length} Tests
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Box>
                              <Box className="analyze_cta">
                                <Button
                                  className="standard_cta"
                                  onClick={() => handleViewBattery(battery, assessment)}
                                >
                                  View Battery
                                </Button>
                              </Box>
                            </Stack>
                          );
                        }
                      )}
                    </Collapse>
                  </Box>
                )
              )}
            </>
          );
        })}

      {availableAssessments?.length > visibleAssessments && (
        <Button onClick={handleViewMore} className="active_assmnts_link">
          View More Assessments
        </Button>
      )}
    </>
  );
};
export default AvailableAssessments;
