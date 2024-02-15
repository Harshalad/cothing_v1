import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TimezoneSelect from "react-timezone-select";
import { fetchEventSlots } from "../../actions/event/fetchEventSlots";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { bookSlotForEvent } from "../../actions/event/bookSlotForEvent";
import { toast } from "react-toastify";

const drawerWidth = 250;

const PreEvents = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const role = router?.query?.role;
  const milestoneId = router?.query?.milestoneId;
  const methodId = router?.query?.methodId;
  const goalId = router?.query?.goalId;
  // methodId;
  const [selectedTimezone, setSelectedTimezone] = useState<any>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [strtDate, setStrtDate] = useState<any>(false);
  const [strtTime, setStrtTime] = useState<any>(false);
  const [selectedStartDate, setSelectedStartDate] =
    useState<any>("DD-MMM-YYYY");
  const [selectedStartTime, setSelectedStartTime] = useState<any>("00:00 --");
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [currentSlot, setCurrentSlot] = useState<any>(null);
  const [slots, setSlots] = useState<Map<any, any>>(new Map());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [savedSlot, setSavedSlot] = useState<any>(null);
  const eventConfigId = router?.query?.id;
  console.log(eventConfigId, "eventConfigId");
  //fetching Event Details
  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetchEventSlots({
        eventConfigId: eventConfigId,
        userId: user?.id,
        eventRole: role,
      });

      //@ts-ignore
      if (response) {
        //@ts-ignore
        setEventDetails(response?.response);
      }
    };
    fetchEventDetails();
  }, [eventConfigId]);

  //getSlots
  useEffect(() => {
    const setEventSlot = () => {
      if (eventDetails) {
        setSlots(new Map(Object.entries(eventDetails?.allSlots)));
        //
      }
    };
    setEventSlot();
  }, [eventDetails]);

  console.log(eventDetails, "eventDetailsInParticipant Side");

  //handleStart Date
  const handleDateSelect = (value: any, key: any) => {
    setCurrentSlot(value);
    setSelectedDate(key);
    setSelectedSlot(null);
    setSavedSlot(null);
  };

  //handleSlectedTime
  const handleTimeSelect = (value: any, key: any) => {
    setSelectedSlot(key);
    setSavedSlot(value);
  };
  //submit and booking the slot
  const handleConfirmSlot = async () => {
    const response = await bookSlotForEvent({
      anchorUserId: savedSlot?.anchorId,
      slotId: savedSlot?.id,
      userId: user?.id,
      eventRole: role,
      eventConfigId: savedSlot?.eventConfigId,
      programId: user?.activeProgramId,
      goalId: goalId,
      milestoneId: milestoneId,
      methodId: methodId,
    });
    //@ts-ignore
    if (response?.statusCode === 7) {
      //@ts-ignore
      toast.error(response?.extra);
      //@ts-ignore
    } else if (response?.statusCode === 0) {
      //@ts-ignore
      toast.success(response?.extra);
      if (milestoneId !== null) {
        router.push("/achieve");
        return;
      }
      router.push("/event-listing");
    }
  };
  return (
    <>
      <Box className="pre_events_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Pre Events</title>
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
              onClick={() => router.back()}
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
            <Typography className="pre_evnt_title">
              Schedule your Event
            </Typography>
            <Box className="event_contr">
              <Typography className="event_title">
                {eventDetails?.name}
              </Typography>
              <Typography className="event_descp">
              <div dangerouslySetInnerHTML={{ __html: eventDetails?.description }} />
              </Typography>
              <Typography className="event_link">
                {eventDetails?.link}
              </Typography>
             { eventDetails?.location && <Stack className="event_loct_flx">
                <PlaceOutlinedIcon sx={{ color: "#989EA5" }} />
                <Typography className="event_loct_name">
                  {eventDetails?.location}
                </Typography>
              </Stack>}
              <Stack className="event_durt_flx">
                <AccessTimeRoundedIcon sx={{ color: "#989EA5" }} />
                <Typography className="event_durt_name">
                  Duration - {eventDetails?.durationInMinutes} mins
                </Typography>
              </Stack>
            </Box>
            <Stack className="preevnts_schd_flx">
              <Box className="preevnts_schd_contr">
                <Box className="presched_contr">
                  <Typography className="sched_title">Schedule</Typography>
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
                  <Stack className="preevnt_strt_datetime_flx">
                    <Box className="preevnt_strt_date_contr">
                      <Typography className="preevnt_strt_text">
                        Select the start date
                      </Typography>
                      <Stack className="preevnt_strt_date_flx">
                        {slots.size !== 0 ? (
                          Array.from(slots).map(([key, value]): any => {
                            return (
                              <Typography
                                // id="d1"
                                key={key}
                                className={`preevnt_strt_date ${
                                  selectedDate === key ? "selected" : "none"
                                }`}
                                onClick={() => handleDateSelect(value, key)}
                              >
                                {new Date(Number(key)).toLocaleDateString()}
                              </Typography>
                            );
                          })
                        ) : (
                          <Typography className="preevnt_no_slot">
                            No slots available yet. Try again later
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                    <Box className="preevnt_strt_time_contr">
                      <Typography className="preevnt_strt_text">
                        Available Slots
                      </Typography>
                      {currentSlot ? (
                        <Stack className="preevnt_strt_time_flx">
                          {currentSlot?.map((slot: any, index: any) => {
                            return (
                              <Typography
                                key={index}
                                id="t1"
                                className={`preevnt_strt_time ${
                                  selectedSlot === index ? "selected" : "none"
                                }`}
                                onClick={() => handleTimeSelect(slot, index)}
                              >
                                {new Date(slot?.startDate).toLocaleTimeString()}
                              </Typography>
                            );
                          })}
                        </Stack>
                      ) : (
                        <Typography className="preevnt_no_slots_avbl">
                          Please select the date first to see the available
                          slots
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Box>
              {savedSlot && (
                <Box className="preevnts_confirm_schd_cont">
                  <Box className="confirm_schd_cont">
                    <Typography className="confirm_sched_title">
                      Would you like to confirm your choosen Schedule
                    </Typography>
                    <Box className="choosen_schd_contr">
                      <Stack className="choosen_strt_dattim_flx">
                        <Stack className="choosen_strt_date_flx">
                          <Typography className="choosen_strt_date">
                            Start Date
                          </Typography>
                          <Typography className={`preevnt_strt_date`}>
                            {savedSlot
                              ? new Date(
                                  savedSlot?.startDate
                                ).toLocaleDateString()
                              : "DD-MMM-YYYY"}
                          </Typography>
                        </Stack>
                        <Stack className="choosen_strt_time_flx">
                          <Typography className="choosen_strt_time">
                            Start Time
                          </Typography>
                          <Typography className={`preevnt_strt_time`}>
                            {savedSlot
                              ? new Date(
                                  savedSlot?.startDate
                                ).toLocaleTimeString()
                              : "00:00 --"}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Box className="preevnt_durtn_contr">
                        <Typography className="preevnt_durtn_contnt">
                          Duration{" "}
                          <span> - {eventDetails?.durationInMinutes} mins</span>
                        </Typography>
                      </Box>
                      <Stack className="choosen_end_dattim_flx">
                        <Stack className="choosen_end_date_flx">
                          <Typography className="choosen_end_date">
                            End Date
                          </Typography>
                          <Typography className={`preevnt_strt_date`}>
                            {savedSlot
                              ? new Date(
                                  savedSlot?.endDate
                                ).toLocaleDateString()
                              : "DD-MMM-YYYY"}
                          </Typography>
                        </Stack>
                        <Stack className="choosen_end_time_flx">
                          <Typography className="choosen_end_time">
                            End Time
                          </Typography>
                          <Typography className={`preevnt_strt_time`}>
                            {savedSlot
                              ? new Date(
                                  savedSlot?.endDate
                                ).toLocaleTimeString()
                              : "00:00 --"}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Box className="evnt_cta_contr preevnt_cta_contr">
                        <Button
                          className="standard_cta"
                          disabled={savedSlot ? false : true}
                          onClick={() => handleConfirmSlot()}
                        >
                          Confirm
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default PreEvents;
