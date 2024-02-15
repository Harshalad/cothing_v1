import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TimezoneSelect from "react-timezone-select";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { fetchEventConfigDetailsForAnchor } from "../../actions/event/fetchEventConfigDetailsForAnchor";
import { SanitizerTwoTone } from "@mui/icons-material";
import { addSlotChunkOfAnchorForEventConfig } from "../../actions/event/addSlotChunkOfAnchorForEventConfig";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { updateSlotStatusOfAnchor } from "../../actions/event/updateSlotStatusOfAnchor";
import { useRouter } from "next/router";
const drawerWidth = 250;

const AnchorPreEvent = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const role = router?.query?.role;
  const [selectedTimezone, setSelectedTimezone] = useState<any>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [startDate, setStartDate] = useState<any>(dayjs());
  const [endDate, setEndDate] = useState<any>(dayjs());
  const [startTime, setStartTime] = useState<any>(dayjs());
  const [endTime, setEndTime] = useState<any>(dayjs());
  const [value, setValue] = useState("select-slot-range");
  const [slotCount, setSlotCount] = useState<any>(0);
  const [eventDetail, setEventDetail] = useState<any>(null);
  const [ranges, setRanges] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [currentSlot, setCurrentSlot] = useState<any>(null);
  const [slotChangeMap, setSlotChangeMap] = useState<Map<any, any>>(new Map());
  const handleExpandClick = (index: any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const initialState = {
    startDate: null,
    endDate: null,
    slots: new Map(),
    availableSlots: 0,
    selectedSlots: 0,
    status: "NEW",
    id: null,
  };
  const singleSlotInitialState = {
    startDate: null,
    endDate: null,
    id: null,
    status: "NEW",
  };
  const [change, setChange] = useState(false);
  const [singleSlots, setSingleSlots] = useState<Map<any, any>>(new Map());
  const [slotChunk, setSlotChunk] = useState<Map<any, any>>(new Map());
  const handleRange = (date: any) => {
    let inRange = false;
    // let value= new Date(date);
    let value = new Date(date);

    for (const range of ranges) {
      let startDate = new Date(range?.startDate).getTime();
      let endDate = new Date(range?.endDate).getTime();

      if (value?.getTime()-1 >= startDate && value?.getTime()-1 <= endDate) {
        return true; // If date is within any of the ranges, return true
      }
    }
  };
  //handle StartDate
  const handleStartDate = (newValue: any, key: any) => {
    let tempMap = new Map(slotChunk);
    let keyValue = tempMap.get(key);
    keyValue = {
      ...keyValue,
      startDate: newValue,
    };
    tempMap.set(key, keyValue);
    setSlotChunk(tempMap);
  };
  const handleSingleSlotDate = (newValue: any, key: any) => {
    console.log(new Date(newValue), "adityaadsjkashf");
    let tempMap = new Map(singleSlots);
    let keyValue = tempMap.get(key);
    let duration = eventDetail?.durationInMinutes;
    // let st = new Date(newValue);
    let endDate = new Date(
      new Date(newValue).getTime() + duration * 60 * 1000
    ).getTime();

    keyValue = {
      ...keyValue,
      startDate: newValue,
      endDate: endDate,
    };
    console.log(keyValue, "adityaadsjkashf");
    tempMap.set(key, keyValue);
    setSingleSlots(tempMap);
  };
  const handleStartClick = async (clickedHandle: any, key: any, value: any) => {
    let keyValue = singleSlots.get(key);
    console.log(keyValue, "jfdsbkjfbdskjbfls");
    if (!handleRange(keyValue?.startDate)) {
      toast.error("StartDate  Must be from Above Ranges");
      return;
    }
    if (value?.status === "NEW") {
      const response = await addSlotChunkOfAnchorForEventConfig({
        anchorUserId: user?.id,
        eventConfigId: eventConfigId,
        chunkStartDate: keyValue?.startDate,
        chunkEndDate: keyValue?.endDate,
        singleSlot: true,
        eventRole: role,
      });
      //@ts-ignore
      if (response.statusCode === 0) {
        toast.success("Successfully Added Slots");
        setChange(!change);
      } else {
        //@ts-ignore
        toast.error(response?.extra);
      }
    }
  };

  //handle endDate
  const handleEndDate = (newValue: any, key: any) => {
    let tempMap = new Map(slotChunk);
    let keyValue = tempMap.get(key);
    keyValue = {
      ...keyValue,
      endDate: newValue,
    };
    tempMap.set(key, keyValue);
    setSlotChunk(tempMap);
  };
  console.log(eventDetail, "slotChunkMap");
  useEffect(() => {
    const setSlotsChunksAdded = () => {
      let tempSlotChunk = slotChunk;
      let tempSlot = singleSlots;
      tempSlot.set(0, singleSlotInitialState);
      tempSlotChunk.set(0, initialState);
      setSingleSlots(tempSlot);
      setSlotChunk(tempSlotChunk);
    };
    setSlotsChunksAdded();
  }, []);
  //
  const eventConfigId = router?.query?.id;
  useEffect(() => {
    const fetchEventDeatils = async () => {
      const response = await fetchEventConfigDetailsForAnchor({
        anchorUserId: user?.id,
        eventConfigId: eventConfigId,
      });

      if (response) {
        //@ts-ignore
        setEventDetail(response?.response);
      }
    };
    fetchEventDeatils();
  }, [eventConfigId, change]);

  useEffect(() => {
    const setMap = () => {
      let tempMap = new Map(slotChunk);
      eventDetail?.anchor?.slotChunks?.map((slots: any, index: any) => {
        tempMap.set(index, initialState);
        let tempValue = tempMap.get(index);
        tempValue = {
          ...tempValue,
          startDate: dayjs(slots?.startDate),
          endDate: dayjs(slots?.endDate),
          slots: new Map(Object.entries(slots?.slots ? slots?.slots : {})),
          availableSlots: slots?.availableSlots,
          selectedSlots: slots?.selectedSlots,
          status: slots?.status,
          id: slots?.id,
        };
        tempMap.set(index, tempValue);
      });
      setSlotChunk(tempMap);
      setRanges(eventDetail?.anchor?.availableRanges);
    };
    setMap();
  }, [eventDetail]);
  useEffect(() => {
    const setSingleSlotMap = () => {
      let tempMap = new Map(singleSlots);
      eventDetail?.anchor?.singleSlots?.map((slots: any, index: any) => {
        tempMap.set(index, singleSlotInitialState);
        let tempValue = tempMap.get(index);
        tempValue = {
          ...tempValue,
          startDate: dayjs(slots?.startDate),
          endDate: dayjs(slots?.endDate),
          status: slots?.status,
          id: slots?.id,
        };
        tempMap.set(index, tempValue);
      });
      setSingleSlots(tempMap);
      setRanges(eventDetail?.anchor?.availableRanges);
    };
    setSingleSlotMap();
  }, [eventDetail]);
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleAvailableSlots = async (
    clickedHandle: any,
    key: any,
    value: any
  ) => {
    let keyValue = slotChunk.get(key);
    
    if (value?.status === "NEW") {
      if (
        !handleRange(keyValue?.startDate) ||
        !handleRange(keyValue?.endDate)
      ) {
        toast.error("StartDate  Must be from Above Ranges");
        return;
      }
      const response = await addSlotChunkOfAnchorForEventConfig({
        anchorUserId: user?.id,
        eventConfigId: eventConfigId,
        chunkStartDate: keyValue?.startDate,
        chunkEndDate: keyValue?.endDate,
        singleSlot: false,
        eventRole: role
      });
      //@ts-ignore
      if (response.statusCode === 0) {
        toast.success("Successfully Added Slots");
        setChange(!change);
      } else {
        //@ts-ignore
        toast.error(response?.extra);
      }
    } else {
      setSlotChangeMap(new Map());
      handleExpandClick(key);
    }
  };
  const addNewSingleSlot = () => {
    let size = singleSlots.size;
    let tempSlotChunk = new Map(singleSlots);
    let keyValue = tempSlotChunk.get(size - 1);
    if (eventDetail?.anchor?.slotsLeft === 0) {
      toast.error("No Slots Available");
      return;
    }
    if (keyValue?.status !== "NEW") {
      tempSlotChunk.set(size, singleSlotInitialState);
      setSingleSlots(tempSlotChunk);
    } else {
      toast.error("fill previous slot range");
      return;
    }
  };
  const addNewSlotRangeOption = () => {
    let size = slotChunk.size;
    let tempSlotChunk = new Map(slotChunk);
    let keyValue = tempSlotChunk.get(size - 1);
    if (eventDetail?.anchor?.slotsLeft === 0) {
      toast.error("No Slots Available");
      return;
    }
    if (keyValue?.status !== "NEW") {
      tempSlotChunk.set(size, initialState);
      setSlotChunk(tempSlotChunk);
    } else {
      toast.error("fill previous slot range");
      return;
    }
  };

  const handleSlotClick = (index: any, key: any, id: any) => {
    const tempSlotChunk = new Map(slotChangeMap);
    if (tempSlotChunk.has(index)) {
      tempSlotChunk.delete(index);
    } else {
      tempSlotChunk.set(index, id);
    }
    setSlotChangeMap(tempSlotChunk);
    setSlotChunk((prevSlotChunk) => {
      const newSlotChunk = new Map(prevSlotChunk);

      if (newSlotChunk.has(key)) {
        const keyValue = newSlotChunk.get(key);
        if (keyValue && keyValue.slots) {
          const slotMap = new Map(keyValue.slots);
          if (slotMap.has(id)) {
            const slot = slotMap.get(id);
            // @ts-ignore
            if (slot?.status === "ADDED") {
              slotMap.set(id, { ...slot, status: "REMOVED" });
            } else {
              //@ts-ignore
              slotMap.set(id, { ...slot, status: "ADDED" });
            }

            const updatedKeyValue = { ...keyValue, slots: slotMap };
            newSlotChunk.set(key, updatedKeyValue);
          }
        }
      }
      return newSlotChunk;
    });
  };
  // console.log(slotChangeMap, "setSlotChangeMap");
  // handle slected and unselcted Slot
  // const handleSelectedSlot = (key: any, id: any) => {};
  const handleSaveSlots = async (value: any, slotMap: any) => {
    const response = await updateSlotStatusOfAnchor({
      eventConfigId: eventConfigId,
      anchorUserId: user?.id,
      slotChunkId: value?.id,
      slots: slotChangeMap,
    });
    //@ts-ignore
    if (response?.statusCode === 0) {
      toast.success("Slots saved successfully");
      setSlotChangeMap(new Map());
    }
  };
  return (
    <>
      <Box className="pre_events_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Anchor Pre Event</title>
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
                {eventDetail?.name}
              </Typography>
              <Typography className="event_descp">
                <div dangerouslySetInnerHTML={{ __html: eventDetail?.description }} />
              </Typography>
            </Box>
            <Box className="schd_contr">
              <Box className="presched_contr">
                <Typography className="sched_title">Schedule</Typography>
                <Stack className="schd_flx">
                  <Typography className="schd_title">
                    No of Slots -{" "}
                    <span className="schd_text">
                      {eventDetail?.anchor?.noOfSlots}
                    </span>
                  </Typography>
                  <Typography className="schd_title">
                    Duration of each slots -{" "}
                    <span className="schd_text">
                      {eventDetail?.durationInMinutes} mins
                    </span>
                  </Typography>
                  <Typography className="schd_title">
                    Buffer Duration :{" "}
                    <span className="schd_text">
                      {eventDetail?.bufferInMinutes} mins
                    </span>
                  </Typography>
                </Stack>
                {eventDetail?.anchor?.availableRanges?.map(
                  (range: any, index: any) => {
                    return (
                      <Stack className="schd_flx schd_strt_end_flx" key={index}>
                        <Typography className="schd_title">
                          Start Date -{" "}
                          <span className="schd_text">
                            {new Date(range?.startDate).toLocaleDateString() +
                              " " +
                              new Date(range?.startDate).toLocaleTimeString()}
                          </span>
                        </Typography>
                        <Typography className="schd_title">
                          End Date -{" "}
                          <span className="schd_text">
                            {new Date(range?.endDate).toLocaleDateString() +
                              " " +
                              new Date(range?.endDate).toLocaleTimeString()}
                          </span>
                        </Typography>
                      </Stack>
                    );
                  }
                )}
                <FormControl className="slot_radio">
                  <RadioGroup row value={value} onChange={handleChange}>
                    <FormControlLabel
                      value="select-slot-range"
                      control={<Radio />}
                      label="Select Slot Range"
                    />
                    <FormControlLabel
                      value="share-slots"
                      control={<Radio />}
                      label="Share Slots"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
            <Box className="slot_cont">
              {value === "share-slots" ? (
                <Box className="confirm_schd_cont">
                  <Typography className="sched_title">Share Slot</Typography>
                  <Stack className="timezone_flx">
                    <Typography className="timezone_title">Timezone</Typography>
                    <Box className="timezone_dropdwn">
                      <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                        labelStyle="altName"
                      />
                    </Box>
                  </Stack>
                  <Box className="share_slot_contr">
                    <Stack className="share_slot_flx">
                      <Typography className="flx_1"></Typography>
                      <Typography className="flx_2 hdr">
                        Start Date Time
                      </Typography>
                      <Typography className="flx_2 hdr">
                        End Date Time
                      </Typography>
                      <Typography className="flx_2 hdr">Action</Typography>
                    </Stack>
                    {Array.from(singleSlots).map(([key, value]): any => {
                      return (
                        <Stack className="share_slot_flx contnt" key={key}>
                          <Typography className="flx_1 sidehdr">
                            Slot {key + 1}
                          </Typography>
                          <Box className="flx_2">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                // disablePast={true}
                                slotProps={{
                                  textField: {
                                    id: "startDate",
                                  },
                                }}
                                // format="DD-MMM-YYYY"
                                // disabled={value?.status !== "NEW"}
                                value={value?.startDate}
                                onChange={(newValue) =>
                                  handleSingleSlotDate(newValue, key)
                                }
                                className="sbkfbdsk"
                              />
                            </LocalizationProvider>
                          </Box>
                          <Box className="flx_2">
                            <Box className="share_slot_enddate_contr">
                              <Typography className="share_slot_end_date">
                                {value?.endDate === null
                                  ? "DD-MMM-YYYY"
                                  : new Date(value?.endDate).toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="flx_2">
                            <Button
                              onClick={() => handleStartClick("1", key, value)}
                              disabled={value?.status !== "NEW"}
                              style={{ width: "100px", height: "30px" }}
                            >
                              Save
                            </Button>
                          </Box>
                        </Stack>
                      );
                    })}
                  </Box>
                  <Stack className="add_slot_range_flx">
                    <AddIcon
                      sx={{
                        color: "#3E4248",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    />
                    <Typography
                      className="add_slot_range"
                      onClick={() => addNewSingleSlot()}
                    >
                      Add new slot range
                    </Typography>
                  </Stack>
                </Box>
              ) : (
                <Box className="confirm_schd_cont">
                  <Stack className="select_slot_hdr_flx">
                    <Typography className="sched_title">Select Slot</Typography>
                    <Stack className="select_slot_stat_flx">
                      <Typography className="selected_slots">
                        Slots Selected -{" "}
                        <span>
                          {eventDetail?.anchor?.noOfSlots -
                            eventDetail?.anchor?.slotsLeft}{" "}
                          slots
                        </span>
                      </Typography>
                      <Typography className="pending_slots">
                        Available Slots -{" "}
                        <span>{eventDetail?.anchor?.slotsLeft} slots</span>
                      </Typography>
                    </Stack>
                    {/* <Box className="evnt_cta_contr slct_cta_contr">
                      <Button className="standard_cta disabled">Confirm</Button>
                    </Box> */}
                  </Stack>
                  <Divider
                    sx={{ border: "1px solid #EAECEF", margin: "12px 0" }}
                  />
                  <Stack className="timezone_flx">
                    <Typography className="timezone_title">Timezone</Typography>
                    <Box className="timezone_dropdwn">
                      <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                        labelStyle="altName"
                      />
                    </Box>
                  </Stack>
                  <Box className="share_slot_contr slct_slot_contr">
                    <Stack className="share_slot_flx slct_slot_flx">
                      <Typography className="flx_1"></Typography>
                      <Typography className="flx_1 hdr">
                        Start Date Time
                      </Typography>
                      {/* <Typography className="flx_1 hdr">Start Time</Typography> */}
                      <Typography className="flx_1 hdr">
                        End Date Time
                      </Typography>
                      {/* <Typography className="flx_1 hdr">End Time</Typography> */}
                      <Typography className="flx_1 hdr">Action</Typography>
                      <Typography className="flx_1 hdr">
                        Available Slots
                      </Typography>
                      <Typography className="flx_1 hdr">
                        Selected Slots
                      </Typography>
                    </Stack>
                    {Array.from(slotChunk).map(([key, value]): any => {
                      return (
                        <Stack key={key}>
                          <Stack className="share_slot_flx slct_slot_flx contnt">
                            <Typography className="flx_1 sidehdr">
                              Slot Range {key + 1}
                            </Typography>
                            <Box className="flx_1">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  disablePast={true}
                                  slotProps={{
                                    textField: {
                                      id: "startDate",
                                    },
                                  }}
                                  // format="DD-MMM-YYYY"
                                  disabled={value?.status !== "NEW"}
                                  value={value?.startDate}
                                  onChange={(newValue) =>
                                    handleStartDate(newValue, key)
                                  }
                                  // sx={{fontSize:"1000px"}}
                                  className="evnt_schd_datepicker slct_strt_date"
                                />
                              </LocalizationProvider>
                            </Box>
                            <Box className="flx_1">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  sx={{ width: "100%" }}
                                  // format="DD-MMM-YYYY"
                                  disablePast={true}
                                  slotProps={{
                                    textField: {
                                      id: "startDate",
                                    },
                                  }}
                                  disabled={value?.status !== "NEW"}
                                  value={value?.endDate}
                                  onChange={(newValue) =>
                                    handleEndDate(newValue, key)
                                  }
                                  className="evnt_schd_datepicker slct_end_date"
                                />
                              </LocalizationProvider>
                            </Box>
                            <Typography
                              className="flx_1 slots_stat_txt avl_slot_cta"
                              onClick={() =>
                                handleAvailableSlots("1", key, value)
                              }
                            >
                              {value?.status === "NEW" ? "Save" : "View Slots"}
                            </Typography>
                            <Typography className="flx_1 slots_stat_txt">
                              {value?.availableSlots} Slots
                            </Typography>
                            <Typography className="flx_1 slots_stat_txt">
                              {value?.selectedSlots} Slots
                            </Typography>
                          </Stack>
                          <Collapse
                            in={expandedIndex === key}
                            id="1"
                            className="avl_slot_collapse"
                          >
                            <Divider
                              sx={{
                                border: "1px solid #EAECEF",
                                margin: "4px 0 0",
                              }}
                            />
                            <Stack className="avl_slots_contr">
                              <Stack className="avl_slots_contnt">
                                <Box>
                                  <Typography className="avl_slots_title">
                                    Available Slots
                                  </Typography>
                                  <Typography className="avl_slots_txt">
                                    Deselect unavailable slot timings
                                  </Typography>
                                </Box>
                                <Stack className="avl_slots_tym_contr">
                                  {Array.from(value.slots)
                                    //@ts-ignore
                                    .map(([index, slot]): any => {
                                      return (
                                        <Stack
                                          className={`avl_slots_tym_contnt ${
                                            slot?.status === "ADDED"
                                              ? "selected_slot"
                                              : ""
                                          }`}
                                          key={index}
                                          // id={index + 11}
                                          sx={{ width: "1000px" }}
                                          onClick={
                                            () =>
                                              handleSlotClick(
                                                index,
                                                key,
                                                slot?.id
                                              )
                                            // handleSelectedSlot(key, slot?.id)
                                          }
                                        >
                                          <Button className="avl_slot_time">
                                            {new Date(
                                              slot?.startDate
                                            ).toLocaleTimeString()}
                                          </Button>
                                          {slot?.status === "REMOVED" && (
                                            <AddIcon
                                              sx={{
                                                color: "#1C2129",
                                                fontSize: "16px",
                                              }}
                                            />
                                          )}

                                          {slot?.status === "ADDED" && (
                                            <CloseIcon
                                              sx={{
                                                color: "#1C2129",
                                                fontSize: "16px",
                                              }}
                                            />
                                          )}
                                        </Stack>
                                      );
                                    })}
                                </Stack>
                              </Stack>
                              <Box className="avl_slots_cta_contr">
                                <Button
                                  className="outlined_cta"
                                  onClick={() =>
                                    handleSaveSlots(value, value?.slots)
                                  }
                                >
                                  Save
                                </Button>
                              </Box>
                            </Stack>
                            <Divider
                              sx={{
                                border: "1px solid #EAECEF",
                                margin: "0 0 16px",
                              }}
                            />
                          </Collapse>
                        </Stack>
                      );
                    })}
                    <Stack className="add_slot_range_flx">
                      <AddIcon
                        sx={{
                          color: "#3E4248",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      />
                      <Typography
                        className="add_slot_range"
                        onClick={() => addNewSlotRangeOption()}
                      >
                        Add new slot range
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AnchorPreEvent;
