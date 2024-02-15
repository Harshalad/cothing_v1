import { Avatar, Box, Button, Collapse, Divider, InputAdornment, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TimezoneSelect from 'react-timezone-select'
import HeaderNav from '../common/HeaderNav/HeaderNav';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CircleIcon from "@mui/icons-material/Circle";
import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchUserEvent } from "../../actions/event/fetchUserEvent";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { useRouter } from "next/router";
import { fetchConceptPrimerByContentId } from "../../actions/achieve/fetchConceptPrimerByContentId";
import { fetchBatteryDetails } from "../../actions/analyze/fetchBatteryDetails";
import { fetchBatteryGroupDetails } from "../../actions/analyze/fetchBatteryGroupDetails";
import Spinner from "../common/Spinner/Spinner";
import InlineConceptPrimer from "../common/InlineConceptPrimer/InlineConceptPrimer";
import Link from "next/link";
import { completeUserMilestoneEvent } from "../../actions/event/completeUserMilestoneEvent";
import { completeMethodStatus } from "../../actions/status-update/completeMethodStatus";

const drawerWidth = 250;

const Events = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  
  const router = useRouter();
  const userEventId = router?.query?.id;
  const [selectedTimezone, setSelectedTimezone] = useState<any>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [from, setFrom] = useState(router?.query?.from);
  const [startDate, setStartDate] = useState<any>(dayjs());
  const [endDate, setEndDate] = useState<any>(dayjs());
  const [startTime, setStartTime] = useState<any>(dayjs());
  const [endTime, setEndTime] = useState<any>(dayjs());
  const [expanded, setExpanded] = useState<any>(0);
  const [innerExpanded, setInnerExpanded] = useState<any>(null);
  const [eventDetails, seteventDetails] = useState<any>(null);
  const [batteryDetails, setBatteryDetails] = useState<any>(null);
  const [groupBatteryDetails, setGroupBatteryDetails] = useState<any>(null);
  const [batteryLoader, setBatteryLoader] = useState<any>(false);
  const [groupBatteryLoader, setGroupBatteryLoader] = useState<any>(false);
  const [iFrameTitle, setIFrameTitle] = useState<any>(null);
  const [iFrameLink, setIFrameLink] = useState<any>(null);
  const [change, setChange] = useState<any>(null);
  useEffect(() => {
    const getUserEvent = async () => {
      const response = await fetchUserEvent({ userEventId: userEventId });
      // console.log(response,"userEvent");
      //@ts-ignore
      if (response?.statusCode === 0) {
        //@ts-ignore
        seteventDetails(response?.response);
      }
    };
    getUserEvent();
  }, [router?.isReady, userEventId, change]);
  useEffect(() => {
    const setTimeAndDate = () => {
      if (eventDetails) {
        setStartDate(new Date(eventDetails?.startDate));
        setStartTime(new Date(eventDetails?.startDate));
        setEndDate(new Date(eventDetails?.endDate));
        setEndTime(new Date(eventDetails?.endDate));
      }
    };
  }, [eventDetails]);
  const getDate = (d: any) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };
  const getTime = (d: any) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${hours}:${minutes} ${ampm}`;
    return formattedDate;
  };
  console.log(eventDetails, "eventDetailsInEvent");
  const handleExpand = (index: any) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleInnerExpand = (clickedHandle: any) => {
    var innerExpandId = document.getElementById(clickedHandle);
    if (innerExpandId?.classList.contains("MuiCollapse-hidden")) {
      setInnerExpanded(clickedHandle);
    } else {
      setInnerExpanded(false);
    }
  };
  const handleMethodClick = async (
    method: any,
    userContent: any,
    index: any
  ) => {
    console.log(method, "indexIn");
    if (!eventDetails?.active) {
      toast.error("Content not yet available. Come back later.");
      return;
    }
    // return;
    if (method?.type === "test") {
      const response = await createUserTestMap({
        userId: user?.id,
        testId: method?.contentId,
        startDate: method?.startDate,
        endDate: method?.endDate,
        attemptNo: method?.noOfAttempts,
        role: currentUserRole,
        type: method?.type,
        userEventId: userEventId,
        userContentId: userContent?.id,
        userMethodId: method?.id,
      });
      // console.log(response,"utmresponse");
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
    } else if (method?.type === "work_sheet") {
      router.push({
        pathname: "/event-prepare",
        query: {
          worksheetId: method?.userMethodContentId
            ? method?.userMethodContentId
            : method?.contentId,
          pickWorksheetFrom: method?.userMethodContentId
            ? "user_work_sheet"
            : "work_sheet",
          employeeEmail: user?.email,
          type: "event",
          userEventId: userEventId,
          eventSectionId: userContent?.id,
          eventMethodId: method?.id,
        },
      });
    } else if (method?.type === "battery") {
      if (innerExpanded !== index) {
        setBatteryLoader(true);
        const response = await fetchBatteryDetails({
          userId: user?.id,
          batteryId: method?.contentId,
        });
        if (response) {
          //@ts-ignore
          setBatteryDetails(response?.batteryDetails);
          setInnerExpanded(index);
        }
        setBatteryLoader(false);
      } else {
        setInnerExpanded(null);
      }
    } else if (method?.type === "concept_primer") {
      const response: any = await fetchConceptPrimerByContentId({
        contentId: method?.contentId,
        userId: user?.id,
        programId: user?.activeProgramId,
        methodTitle: method?.title,
      });
      if(!response?.contentLink?.startsWith("http")){
        toast.error("This is coming soon. You will be notified about the same.");
        return;
      }
      // console.log(response, "conceptrimer")
      if (response) {
        if (method?.status !== "COMPLETED") {
          const response = await completeMethodStatus({
            userEventId: userEventId,
            userContentId: userContent?.id,
            userMethodId: method?.id,
          });
        }
        setChange(!change);
        window.open(response?.contentLink, "_blank");
      } else {
        toast.error("Error while Fetching Conceptrimer");
      }
    } else if (method?.type === "battery_group") {
      if (innerExpanded !== index) {
        setGroupBatteryLoader(true);
        const response = await fetchBatteryGroupDetails({
          userId: user?.id,
          batteryGroupId: method?.contentId,
        });
        if (response) {
          //@ts-ignore
          setGroupBatteryDetails(response?.groupBatteryDetails);
          setInnerExpanded(index);
        }
        setGroupBatteryLoader(false);
      } else {
        setInnerExpanded(null);
      }
      // console.log(response,"battery group details");
    } else if (method?.type === "evaluation") {
      router.push({
        pathname: "/event-evaluation/instructions",
        query: {
          testId: method?.contentId,
          methodId: method?.id,
          sectionId: userContent?.id,
          eventId: userEventId,
        },
      });
    }
  };
  const batteryTestStart = async (test: any, method: any, userContent: any) => {
    console.log("test1234", batteryDetails);
    const response = await createUserTestMap({
      userId: user?.id,
      testId: test?.testId,
      startDate: test?.startDate,
      endDate: test?.endDate,
      batteryId: batteryDetails?.batteryId,
      attemptNo: test?.noOfAttempts,
      role: currentUserRole,
      type: "battery",
      userEventId: userEventId,
      userContentId: userContent?.id,
      userMethodId: method?.id,
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
  };

  const handleLinkClick = async () => {
    const currentTime = new Date();
    let startDate = new Date(eventDetails?.startDate);
    let endDate = new Date(eventDetails?.endDate);

    const currentDate = new Date();
    if (currentDate < startDate) {
      const timeDifference = startDate.valueOf() - currentDate.valueOf();
      const timeDifferenceInMinutes = timeDifference / (1000 * 60);
      if (timeDifferenceInMinutes > 15) {
        toast.error(`This session will be available on ${getDate(eventDetails?.startDate)} at ${getTime(eventDetails?.startDate)}. Please join then. `);
        return;
      }

    }
    if (currentDate > endDate) {
      toast.error("This session has ended.");
      return;
    }

    const response = await completeUserMilestoneEvent({
      userEventId: userEventId,
    });

    if (eventDetails.link) {
      window.open(eventDetails.link, "_blank");
    }

  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Events</title>
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
            onClick={() => from!==null && from!==undefined && from==="action-center"? router.push("/action-center"): router.back()}
            className="go_back_flex"
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
          <Box className="event_contr">
            <Typography className="event_title">
              {eventDetails?.name}
            </Typography>
            <Typography className="event_descp">
              <div dangerouslySetInnerHTML={{ __html: eventDetails?.description }} />
            </Typography>
            <Button className="standard_cta_event" onClick={handleLinkClick}>
              Join Session
            </Button>

            {eventDetails?.location && <Stack className="event_loct_flx">
              <PlaceOutlinedIcon sx={{ color: "#989EA5" }} />
              <Typography className="event_loct_name">
                {eventDetails?.location}
              </Typography>
            </Stack>}
          </Box>
          <Stack className="evnts_schd_attendes_flx">
            <Box className="schd_attendes_contr">
              <Box className="sched_contr">
                <Typography className="sched_title">Schedule</Typography>
                <Stack className="evnt_strt_flx">
                  <Typography className="evnt_strt_text">Start</Typography>
                  <Typography className="evnt_strt_text">
                    {getDate(eventDetails?.startDate)}
                  </Typography>
                  <Typography className="evnt_strt_text">
                    {new Date(eventDetails?.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </Typography>
                </Stack>
                <Stack className="evnt_end_flx">
                  <Typography className="evnt_end_text">End</Typography>
                  <Typography className="evnt_strt_text">
                    {getDate(eventDetails?.endDate)}
                  </Typography>
                  <Typography className="evnt_strt_text">
                    {new Date(eventDetails?.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </Typography>
                </Stack>
                {/* <Stack className="timezone_flx">
                  <Typography className="timezone_title">Timezone</Typography>
                  <Box className="timezone_dropdwn">
                    <TimezoneSelect
                      value={selectedTimezone}
                      onChange={setSelectedTimezone}
                      labelStyle="altName"
                    />
                  </Box>
                </Stack> */}
              </Box>
              <Box className="attendes_contr">
                <Typography className="attendes_title">Attendees</Typography>
                <Box className="attendes_list_contr">
                  {eventDetails?.attendees?.map((attendee: any, index: any) => {
                    return (
                      <Stack className="attendes_flx" key={index}>
                        <Box>
                          <Avatar
                            sx={{
                              width: "32px",
                              height: "32px",
                              bgcolor: "#D9F6FF",
                              color: "#55B6C3",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            {attendee?.name[0]}
                          </Avatar>
                        </Box>
                        <Box>
                          <Typography className="attendes_name">
                            {attendee?.name}
                          </Typography>
                          <Typography className="attendes_desg">
                            {attendee?.role}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box className="evnt_list_section">
              {eventDetails?.userContents?.map(
                (userContent: any, index: any) => {
                  return (
                    <Box className="evnt_list_contr" key={index}>
                      <Stack
                        className="evnt_list_flx"
                        onClick={() => {
                          handleExpand(index);
                        }}
                      >
                        <Box>
                          <Typography className="evnt_list_title">
                            {userContent?.name}
                          </Typography>
                          <Typography className="evnt_list_descp">
                            {userContent?.description}
                          </Typography>
                          {/* <Stack className='evnt_time_flx'>
                            <AccessTimeRoundedIcon sx={{ color: "#1C2129", fontSize: "14px" }} />
                            <Typography className='evnt_time'>30 - 35 mins</Typography>
                          </Stack> */}
                        </Box>
                        {expanded === index ? (
                          <ExpandLessRoundedIcon sx={{ color: "#1C2129", fontSize: "45px" }} />
                        ) : (
                          <ExpandMoreRoundedIcon sx={{ color: "#1C2129", fontSize: "45px" }} />
                        )}

                      </Stack>
                      <Collapse in={expanded === index} id="1">
                        <Divider
                          sx={{ color: "#EAECEF", marginBottom: "24px" }}
                        />
                        {userContent?.userMethods?.map(
                          (method: any, innerIndex: any) => {
                            return (
                              <Box
                                className="evnt_inner_contr"
                                key={innerIndex}
                              >
                                <Stack className="evnt_rounded_innr_flx">
                                  <Stack
                                    className="evnt_rounded_flx"
                                    alignItems="center"
                                  >
                                    <Typography
                                      className="evnt_round_circle"
                                      sx={{
                                        border:
                                          method?.status === "COMPLETED"
                                            ? "1px solid #2DC887"
                                            : method?.status === "IN_PROGRESS"
                                              ? "1px solid #EFD02E"
                                              : "1px dashed #1C2129",
                                        backgroundColor:
                                          method?.status === "COMPLETED"
                                            ? "#2DC887"
                                            : method?.status === "IN_PROGRESS"
                                              ? "#EFD02E"
                                              : "transparent",
                                        color:
                                          method?.status === "COMPLETED"
                                            ? "#DFFFF2"
                                            : method?.status === "IN_PROGRESS"
                                              ? "#FDF9E4"
                                              : "#1C2129",
                                      }}
                                    >
                                      {method?.status === "COMPLETED" ? (
                                        <CheckIcon />
                                      ) : method?.status === "IN_PROGRESS" ? (
                                        <CachedIcon />
                                      ) : (
                                        innerIndex + 1
                                      )}
                                    </Typography>
                                    <hr className="accordion_hr" />
                                  </Stack>
                                  <Stack className="evnt_inner_flx">
                                    <Box>
                                      <Typography className="evnt_list_title">
                                        {method?.title}
                                      </Typography>
                                      <Typography className="evnt_list_descp">
                                        {method?.description}
                                      </Typography>
                                      <Stack className="evnt_time_flx">
                                        <AccessTimeRoundedIcon
                                          sx={{
                                            color: "#1C2129",
                                            fontSize: "14px",
                                          }}
                                        />
                                        <Typography className="evnt_time">
                                          {method?.duration} mins
                                        </Typography>
                                      </Stack>
                                    </Box>
                                    <Box
                                      className="evnt_cta_contr"
                                      sx={{ marginRight: "10px" }}
                                    >
                                      <Button
                                        className="standard_cta"
                                        sx={{
                                          color:
                                            method?.status === "COMPLETED"
                                              ? "#F58A43"
                                              : "#FFFFFF",
                                          backgroundColor:
                                            method?.status === "COMPLETED"
                                              ? "transparent"
                                              : "#F58A43",
                                          border: "2px solid #F58A43",
                                          boxShadow: "none",
                                          "&:hover": {
                                            backgroundColor:
                                              method?.status === "COMPLETED"
                                                ? "transparent"
                                                : "#F58A43",
                                            boxShadow: "none",
                                          },
                                          textTransform: "capitalize",
                                          "&.MuiButton-root": {
                                            fontSize: "12px",
                                            width: "140px",
                                            padding: "6px",
                                            pointerEvents: "auto",
                                          },
                                        }}
                                        onClick={() =>
                                          handleMethodClick(
                                            method,
                                            userContent,
                                            innerIndex
                                          )
                                        }
                                      >
                                        {method?.type === "battery"
                                          ? innerExpanded === innerIndex
                                            ? "View less"
                                            : "View More"
                                          : method?.type === "battery_group"
                                            ? innerExpanded === innerIndex
                                              ? "View less"
                                              : "View More"
                                            : method?.buttonLabel}
                                        {/* {method?.buttonLabel} */}
                                      </Button>
                                    </Box>
                                  </Stack>
                                </Stack>

                                {method?.type === "battery" &&
                                  (batteryLoader ? (
                                    <Spinner />
                                  ) : (
                                    <Collapse in={innerExpanded === innerIndex}>
                                      {batteryDetails?.tests?.map(
                                        (test: any, testIndex: any) => {
                                          return (
                                            <Box
                                              className="evnt_viewmore_contr"
                                              key={testIndex}
                                            >
                                              <Stack className="evnt_viewmore_flx">
                                                <Box>
                                                  {/* <Stack className="evnt_status_flx">
                                            <CircleIcon
                                              sx={{
                                                color: "#E74649",
                                                fontSize: "12px",
                                              }}
                                            />
                                            <Typography className="evnt_status_text ntstrtd">
                                              Not started
                                            </Typography>
                                          </Stack> */}
                                                  <Typography className="evnt_list_title">
                                                    {test?.name}
                                                  </Typography>
                                                  <Typography className="evnt_list_descp">
                                                    {test?.description}
                                                  </Typography>
                                                  <Stack className="evnt_time_flx">
                                                    <AccessTimeRoundedIcon
                                                      sx={{
                                                        color: "#1C2129",
                                                        fontSize: "14px",
                                                      }}
                                                    />
                                                    <Typography className="evnt_time">
                                                      {test?.testDuration}
                                                    </Typography>
                                                  </Stack>
                                                </Box>
                                                <Box className="evnt_cta_contr">
                                                  <Button
                                                    className="standard_cta"
                                                    onClick={() =>
                                                      batteryTestStart(
                                                        test,
                                                        method,
                                                        userContent
                                                      )
                                                    }
                                                  >
                                                    Start
                                                  </Button>
                                                </Box>
                                              </Stack>
                                            </Box>
                                          );
                                        }
                                      )}
                                    </Collapse>
                                  ))}
                                {method?.type === "battery_group" &&
                                  (groupBatteryLoader ? (
                                    <Spinner />
                                  ) : (
                                    <Collapse in={innerExpanded === innerIndex}>
                                      {groupBatteryDetails?.batteries?.map(
                                        (battery: any, testIndex: any) => {
                                          return (
                                            <Box
                                              className="evnt_viewmore_contr"
                                              key={testIndex}
                                            >
                                              <Stack className="evnt_viewmore_flx">
                                                <Box>
                                                  {/* <Stack className="evnt_status_flx">
                                            <CircleIcon
                                              sx={{
                                                color: "#E74649",
                                                fontSize: "12px",
                                              }}
                                            />
                                            <Typography className="evnt_status_text ntstrtd">
                                              Not started
                                            </Typography>
                                          </Stack> */}
                                                  <Typography className="evnt_list_title">
                                                    {battery?.name}
                                                  </Typography>
                                                  <Typography className="evnt_list_descp">
                                                    {battery?.description}
                                                  </Typography>
                                                </Box>
                                                <Box className="evnt_cta_contr">
                                                  <Button
                                                    className="standard_cta"
                                                    style={{ width: "100px" }}
                                                    onClick={() =>
                                                      router.push({
                                                        pathname: "viewBattery",
                                                        query: {
                                                          gId: method?.contentId,
                                                          bId: battery?.batteryId,
                                                          type: "battery_group",
                                                          userEventId:
                                                            userEventId,
                                                          userContentId:
                                                            userContent?.id,
                                                          userMethodId:
                                                            method?.id,
                                                        },
                                                      })
                                                    }
                                                  >
                                                    View Battery
                                                  </Button>
                                                </Box>
                                              </Stack>
                                            </Box>
                                          );
                                        }
                                      )}
                                    </Collapse>
                                  ))}
                              </Box>
                            );
                          }
                        )}
                      </Collapse>
                    </Box>
                  );
                }
              )}
              {/* <Box className="evnt_list_contr">
                <Stack
                  className="evnt_list_flx"
                  onClick={() => {
                    handleExpand("2");
                  }}
                >
                  <Box>
                    <Typography className="evnt_list_title">
                      Survey name Evaluate Your Work on the Project our Work
                    </Typography>
                    <Typography className="evnt_list_descp">
                      Description for self Assessments, these can use these
                      assessments to better your performance and go ahead
                      Description for self Assessments, these can use these....
                    </Typography>
                  </Box>
                  {expanded === "2" ? (
                    <ExpandLessRoundedIcon sx={{ color: "#1C2129" }} />
                  ) : (
                    <ExpandMoreRoundedIcon sx={{ color: "#1C2129" }} />
                  )}
                </Stack>
                <Collapse in={expanded === "2"} id="2">
                  <Divider sx={{ color: "#EAECEF", marginBottom: "24px" }} />
                  <Box className="evnt_inner_contr">
                    <Stack className="evnt_rounded_innr_flx">
                      <Stack className="evnt_rounded_flx" alignItems="center">
                        <Typography
                          className="evnt_round_circle"
                          sx={{
                            border: "1px solid #1BAD70",
                            backgroundColor: "#1BAD70",
                            color: "#DFFFF2",
                          }}
                        >
                          <CheckIcon
                            sx={{ color: "#DFFFF2", fontSize: "18px" }}
                          />
                        </Typography>
                        <hr className="accordion_hr" />
                      </Stack>
                      <Stack className="evnt_inner_flx">
                        <Box>
                          <Typography className="evnt_list_title">
                            Survey name Evaluate Your Work on the Project our
                            Work
                          </Typography>
                          <Typography className="evnt_list_descp">
                            Description for self Assessments, these can use
                            these assessments to better your performance and go
                            ahead Description for self Assessments, these can
                            use these....
                          </Typography>
                          <Stack className="evnt_time_flx">
                            <AccessTimeRoundedIcon
                              sx={{ color: "#1C2129", fontSize: "14px" }}
                            />
                            <Typography className="evnt_time">
                              30 - 35 mins
                            </Typography>
                          </Stack>
                        </Box>
                        <Box className="evnt_cta_contr">
                          <Button className="standard_cta">Start</Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box className="evnt_inner_contr">
                    <Stack className="evnt_rounded_innr_flx">
                      <Stack className="evnt_rounded_flx" alignItems="center">
                        <Typography
                          className="evnt_round_circle"
                          sx={{
                            border: "1px solid #EFD02E",
                            backgroundColor: "#EFD02E",
                            color: "#FDF9E4",
                          }}
                        >
                          <CachedIcon
                            sx={{ color: "#FDF9E4", fontSize: "18px" }}
                          />
                        </Typography>
                        <hr className="accordion_hr" />
                      </Stack>
                      <Stack className="evnt_inner_flx">
                        <Box>
                          <Typography className="evnt_list_title">
                            Survey name Evaluate Your Work on the Project our
                            Work
                          </Typography>
                          <Typography className="evnt_list_descp">
                            Description for self Assessments, these can use
                            these assessments to better your performance and go
                            ahead Description for self Assessments, these can
                            use these....
                          </Typography>
                          <Stack className="evnt_time_flx">
                            <AccessTimeRoundedIcon
                              sx={{ color: "#1C2129", fontSize: "14px" }}
                            />
                            <Typography className="evnt_time">
                              30 - 35 mins
                            </Typography>
                          </Stack>
                        </Box>
                        <Box className="evnt_cta_contr">
                          <Button className="standard_cta">Start</Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box className="evnt_inner_contr">
                    <Stack className="evnt_rounded_innr_flx">
                      <Stack className="evnt_rounded_flx" alignItems="center">
                        <Typography
                          className="evnt_round_circle"
                          sx={{
                            border: "1px dashed #1C2129",
                            backgroundColor: "transparent",
                            color: "#1C2129",
                          }}
                        >
                          3
                        </Typography>
                        <hr className="accordion_hr" />
                      </Stack>
                      <Stack className="evnt_inner_flx">
                        <Box>
                          <Typography className="evnt_list_title">
                            Survey name Evaluate Your Work on the Project our
                            Work
                          </Typography>
                          <Typography className="evnt_list_descp">
                            Description for self Assessments, these can use
                            these assessments to better your performance and go
                            ahead Description for self Assessments, these can
                            use these....
                          </Typography>
                          <Stack className="evnt_time_flx">
                            <AccessTimeRoundedIcon
                              sx={{ color: "#1C2129", fontSize: "14px" }}
                            />
                            <Typography className="evnt_time">
                              30 - 35 mins
                            </Typography>
                          </Stack>
                        </Box>
                        <Box className="evnt_cta_contr">
                          <Button
                            className="outlined_cta"
                            onClick={() => handleInnerExpand("21")}
                          >
                            View {innerExpanded === "21" ? "Less" : "More"}
                          </Button>
                        </Box>
                      </Stack>
                    </Stack>
                    <Collapse in={innerExpanded === "21"} id="21">
                      <Box className="evnt_viewmore_contr">
                        <Stack className="evnt_viewmore_flx">
                          <Box>
                            <Stack className="evnt_status_flx">
                              <CircleIcon
                                sx={{ color: "#E74649", fontSize: "12px" }}
                              />
                              <Typography className="evnt_status_text ntstrtd">
                                Not started
                              </Typography>
                            </Stack>
                            <Typography className="evnt_list_title">
                              Survey name Evaluate Your Work on the Project our
                              Work
                            </Typography>
                            <Typography className="evnt_list_descp">
                              Description for self Assessments, these can use
                              these assessments to better your performance and
                              go ahead Description for self Assessments, these
                              can use these....
                            </Typography>
                            <Stack className="evnt_time_flx">
                              <AccessTimeRoundedIcon
                                sx={{ color: "#1C2129", fontSize: "14px" }}
                              />
                              <Typography className="evnt_time">
                                30 - 35 mins
                              </Typography>
                            </Stack>
                          </Box>
                          <Box className="evnt_cta_contr">
                            <Button className="standard_cta">Start</Button>
                          </Box>
                        </Stack>
                      </Box>
                    </Collapse>
                  </Box>
                </Collapse>
              </Box> */}
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* <InlineConceptPrimer
        setIFrameTitle={setIFrameTitle}
        setIFrameLink={setIFrameLink}
        // getIFrame={getIFrame}
        // supportingMethod={supportingMethod}
        // mainMethod={mainMethod}
        // goal={goal}
        // key={index}
        // milestone={milestone}
      /> */}
    </>
  );
};
export default Events;

function aysnc() {
  throw new Error("Function not implemented.");
}
