import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Typography } from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
// import EventLisitngTabs from "./EventLisitngTabs";
import EventLisitngTabs from "./EventLisitngTabs";
import SelectEventSlotsTab from "./SelectEventSlotsTab";
import { useEffect, useState } from "react";
import ScheduledEventsTab from "./ScheduledEventsTab";
import CompletedEventsTab from "./CompletedEventsTab";
import { fetchEventListOfParticipant } from "../../actions/event/fetchEventListOfParticipant";
import { useSelector } from "react-redux";
import { fetchEventListOfAnchor } from "../../actions/event/fetchEventListOfAnchor";
import { fetchEventList } from "../../actions/event/fetchEventList";
const drawerWidth = 250;

const EventListing = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  // console.log(user,"eventlistg");/
  const [activeClass, setActiveClass] = useState<any>("one");
  const [eventLisitng, setEventListing] = useState<any>(null);
  const [selectEvents, setSelectEvents] = useState<any>(null);
  const [todayScheduledEvents, setTodayScheduledEvents] = useState<any>(null);
  const [upcomingScheduledEvents, setUpcomingScheduledEvents] =
    useState<any>(null);
  const [completedEvents, setComletedEvents] = useState<any>(null);
  const handleActiveClass = (clickedId: any) => {
    setActiveClass(clickedId);
  };
  useEffect(() => {
    const fetchDeatils = async () => {
      const response = await fetchEventList({
        userName: user?.name,
        userId: user?.id,
      });
      if (response) {
        //@ts-ignore
        setEventListing(response?.response);
      }
      // console.log(response,"eventLisitng");
    };
    fetchDeatils();
  }, []);

  useEffect(() => {
    const setEvents = () => {
      setTodayScheduledEvents(eventLisitng?.todayScheduled);
      setUpcomingScheduledEvents(eventLisitng?.upcomingScheduled);
      setSelectEvents(eventLisitng?.toSchedule);
      setComletedEvents(eventLisitng?.completed);
    };
    setEvents();
  }, [eventLisitng]);
  console.log(eventLisitng, "EventListingDeatils");
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Event Lisitng</title>
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
          className="event_listing"
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "700", color: "#1C2129" }}
            className="dash_title"
          >
            Events
          </Typography>
          <EventLisitngTabs
            activeClass={activeClass}
            handleActiveClass={handleActiveClass}
          />
          {activeClass === "one" ? (
            <SelectEventSlotsTab selectEvents={selectEvents} />
          ) : activeClass === "two" ? (
            <ScheduledEventsTab
              todayScheduledEvents={todayScheduledEvents}
              upcomingScheduledEvents={upcomingScheduledEvents}
            />
          ) : (
            <CompletedEventsTab completedEvents={completedEvents} />
          )}
        </Box>
      </Box>
    </>
  );
};
export default EventListing;
