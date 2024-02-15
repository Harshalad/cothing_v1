import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchUserTestDetails,
  fetchUserTestDetailsApi,
} from "../../actions/assessment/fetchTestDetails";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import ViewMore from "./ViewMore";
import ViewBattery from "./ViewBattery";

const ActiveAssessments = ({
  activeClass,
  selfActiveAssessment,
  seekActiveAssessment,
  feedbackActiveAssessments,
}: any) => {
  const [activeAssessment, setActiveAssessment] = useState<any>(null);
  const [openBattery, setOpenBattery] = useState(null);
  const [groupBattery, setGroupBattery] = useState(null);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [openBatteryView, setOpenBatteryView] = useState(false);
  const handleOpenViewMore = () => {
    setOpenViewMore(!openViewMore);
  };
  const handleOpenBatteryView = () => {
    setOpenBatteryView(!openBatteryView);
  };
  const router = useRouter();
  useEffect(() => {
    if (activeClass == "one") {
      setActiveAssessment(selfActiveAssessment);
    } else if (activeClass == "two") {
      setActiveAssessment(seekActiveAssessment);
    } else if (activeClass == "four") {
      setActiveAssessment(feedbackActiveAssessments);
    }
  }, [
    activeClass,
    selfActiveAssessment,
    seekActiveAssessment,
    feedbackActiveAssessments,
  ]);
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const handleActiveStart = async (assessment: any) => {
    console.log(assessment, "aciveClick");
    if (activeClass === "four") {
      //@ts-ignore
      const id = assessment?.userTestMapId;
      const testResponse = await fetchUserTestDetailsApi({
        userTestMapId: id,
      });
      //@ts-ignore
      if (testResponse?.response === null) {
        //@ts-ignore
        toast.error(testResponse?.extra);
      } else {
        router.push({
          pathname: "/assessment",
          query: {
            //@ts-ignore
            id: id,
          },
        });
      }
    }
    if (activeClass === "two") {
      router.push({
        pathname: "/mra",
        query: {
          id: assessment?.mraId,
        },
      });
    }
    if (activeClass === "one") {
      if (assessment?.type === "battery") {
        setOpenViewMore(true);
        setOpenBattery(assessment?.batteryDetails);
        setGroupBattery(assessment);
      }
      if (assessment?.type === "test") {
        if (assessment?.userTestMapId) {
          const testResponse = await fetchUserTestDetailsApi({
            userTestMapId: assessment?.userTestMapId,
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
                id: assessment?.userTestMapId,
              },
            });
          }
        } else {
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
        }
      }
      if (assessment?.type === "mra") {
        console.log(assessment?.userTestMapId, "mraINACINVE");
        const testResponse = await fetchUserTestDetailsApi({
          userTestMapId: assessment?.userTestMapId,
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
              id: assessment?.userTestMapId,
            },
          });
        }
      }
      if (assessment?.type === "battery_group") {
       
        router.push({
          pathname: "/viewBatteryGroup",
          query: { gId: assessment?.id, type: assessment?.type },
        });
      }
    }
  };
  console.log(activeAssessment, "activeAssessment");
  return (
    <>
      {openViewMore ? (
        <ViewMore
          openViewMore={openViewMore}
          handleOpenViewMore={handleOpenViewMore}
          openBattery={openBattery}
          // groupBattery={groupBattery}
          assessment={groupBattery}
        />
      ) : openBatteryView ? (
        <ViewBattery />
      ) : (
        <Stack className="active_assmnts_card_flx">
          {activeAssessment?.map((assessment: any, index: any) => {
            return (
              <Box className="active_assmnts_card" key={index}>
                <Stack className="active_assmnts_status_flx">
                  <CircleIcon
                    sx={{
                      color: `${
                        assessment?.status === "SCHEDULED"
                          ? "#1BAD70"
                          : "#1BAD70"
                      }`,
                      fontSize: "12px",
                    }}
                  />
                  <Typography
                    className={`active_assmnts_status_text ${
                      assessment?.status === "SCHEDULED" ? "schld" : "schld"
                    }`}
                  >
                    {assessment?.status === "SCHEDULED"
                      ? "Scheduled"
                      : "In Progress"}
                  </Typography>
                </Stack>
                <Typography className="active_assmnts_name">
                  {assessment?.name}
                </Typography>
                <Stack className="active_assmnts_info_flx">
                  <Typography className="active_assmnts_end_date">
                    End Date :{" "}
                    {assessment?.endDate
                      ? new Date(assessment?.endDate).toLocaleDateString()
                      : "Not available"}
                  </Typography>
                  {assessment?.type !== "mra" &&
                    assessment?.type !== "test" && (
                      <Stack className="avlbl_assmnts_totlquests_flx">
                        <AssignmentOutlinedIcon
                          sx={{ color: "#989EA5", fontSize: "12px" }}
                        />
                        <Typography className="active_assmnts_totl_quests">
                          {assessment?.batteryDetails?.tests?.length} tests
                        </Typography>
                      </Stack>
                    )}
                </Stack>
                <Stack className="active_assmnts_profile_flx">
                  <AvatarGroup max={3}>
                    {activeClass === "two" ? (
                      <>
                        {assessment?.sharedWith.length >= 1 && (
                          <Avatar
                            sx={{
                              width: "24px",
                              height: "24px",
                              bgcolor: "#DFFFF2",
                              color: "#1BAD70",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {assessment?.sharedWith[0][0]}
                          </Avatar>
                        )}
                        {assessment?.sharedWith.length >= 2 && (
                          <Avatar
                            sx={{
                              width: "24px",
                              height: "24px",
                              bgcolor: "#E8E3FF",
                              color: "#6755C3",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {assessment?.sharedWith[1][0]}
                          </Avatar>
                        )}
                        {assessment?.sharedWith.length >= 3 && (
                          <Avatar
                            sx={{
                              width: "24px",
                              height: "24px",
                              bgcolor: "#D9F6FF",
                              color: "#55B6C3",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {assessment?.sharedWith[2][0]}
                          </Avatar>
                        )}
                      </>
                    ) : activeClass === "four" ? (
                      ""
                    ) : (
                      ""
                    )}
                  </AvatarGroup>
                  <Typography className="active_assmnts_profile_title">
                    {activeClass === "one"
                      ? "Self Assessment"
                      : activeClass === "two"
                      ? `Shared with ${assessment?.sharedWith?.length} people`
                      : `Requested by ${assessment?.requestedBy}`}
                  </Typography>
                </Stack>
                <Box className="analyze_cta">
                  <Button
                    className="standard_cta"
                    onClick={() => handleActiveStart(assessment)}
                  >
                    {activeClass === "one"
                      ? assessment?.type === "test" ||
                        assessment?.type === "mra"
                        ? assessment?.status === "IN_PROGRESS"
                          ? "Continue"
                          : "Start"
                        : "View More"
                      : activeClass === "two"
                      ? assessment?.status === "SCHEDULED"
                        ? "Modify"
                        : "Manage"
                      : assessment.status === "IN_PROGRESS"
                      ? "Continue"
                      : "Start"}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Stack>
      )}
    </>
  );
};
export default ActiveAssessments;
