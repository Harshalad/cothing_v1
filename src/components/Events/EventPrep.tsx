import Link from "next/link";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../../components/common/HeaderNav/HeaderNav";
import {
    Box,
    useMediaQuery,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner/Spinner";
import { useRouter } from "next/router";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import UserDetails from "../common/UserDetails/UserDetails";
import { getNworxUser } from "../../actions/auth/fetchNworxUser";
import { fetchAllEventUserWorksheets } from "../../actions/quickPrep/fetchAllEventUserWorksheets";

const drawerWidth = 250;

const EventPrep = () => {
    const router = useRouter();
    //@ts-ignore
    const user = useSelector((state) => state?.auth?.nWorxUser);
    const currentUserRole = useSelector(
        //@ts-ignore
        (state) => state?.auth?.managerToggleView
    );
    const [quickPrepSetLoading, setQuickPrepSetLoading] = useState(false);
    const [eventPrep, setEventPrep] = useState<any>(null);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const matches = useMediaQuery("(max-width:1099px)");
    let email = router?.query?.employeeEmail;
    const [employeeData, setEmployeeData] = useState<any>(null);
    if (currentUserRole !== MANAGER_VIEW_STATE.LP) {
        const fetchNworxUser = async () => {
            try {
                const response = await getNworxUser(email);
                //@ts-ignore
                if (response?.nWorxUser) {
                    console.log(response, "Success");
                    //@ts-ignore
                    setEmployeeData(response.nWorxUser);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (employeeData === null) {
            fetchNworxUser();
        }
    }

    console.log(employeeData, "quickPrepSet");
    useEffect(() => {
        const getEventPrep = async () => {
            try {
                setQuickPrepSetLoading(true);
                const response: any = await fetchAllEventUserWorksheets({ userId: employeeData?.id, programId: employeeData?.activeProgramId });
                setEventPrep(response);
                if (response?.length) {
                    setSelectedEvent(response[0]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setQuickPrepSetLoading(false);
            }
        };
        getEventPrep();
    }, [employeeData]);
    console.log(eventPrep, typeof (eventPrep), "adityaeventprep");
    const handlePrepareClick = (worksheet: any) => {
        router.push({
            pathname: "/event-prepare",
            query: {
                worksheetId: worksheet?.id,
                pickWorksheetFrom: "user_work_sheet",
                employeeEmail: employeeData?.email,
                type: "event"
            },
        });
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>NWORX | Event Preparation</title>
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
                    className="quckprep"
                >
                    {employeeData ? (
                        <>
                            <UserDetails employeeData={employeeData} />
                            <br />
                        </>
                    ) : null}
                    <Typography
                        variant="h1"
                        sx={{ fontWeight: "700", color: "#1C2129", marginBottom: "24px" }}
                        className="dash_title"
                    >
                        Event Prep
                    </Typography>

                    <Stack className="quckprep_cntnt_flex">
                        <Box className="quckprep_lftcntnt">
                            <Typography className="quckprep_catg_hdr">Categories</Typography>
                            {quickPrepSetLoading ? (
                                <Spinner />
                            ) : (

                                <Stack className="quckprep_catg_flex">
                                    {eventPrep?.map((event: any, index: number) => (
                                        <Box
                                            key={index}
                                            className={`quckprep_catg_box ${event?.name ===
                                                selectedEvent?.name && "active"
                                                }`}
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            <Typography
                                                className={`quckprep_catg_name ${matches === true
                                                    ? event?.name ===
                                                    selectedEvent?.name && "active"
                                                    : ""
                                                    }`}
                                            >
                                                {event?.name}
                                            </Typography>
                                        </Box>
                                    ))

                                    }
                                </Stack>
                            )}
                        </Box>
                        <Box className="quckprep_rgtcntnt">
                            <Box className="quckprep_data_box">
                                <Stack className="quckprep_data_flx">
                                    {selectedEvent?.worksheets?.map(
                                        (worksheet: any, index: number) => {
                                            return (
                                                <Box
                                                    className="quckprep_data_inr_box"
                                                    key={index}
                                                >
                                                    <Stack className="quckprep_data_inr_flx">
                                                        <Box className="quckprep_data_inr_top">
                                                            {/* <Typography className="quckprep_data_read_time">
                                                                15 min
                                                            </Typography> */}
                                                            <Box className="quckprep_data_img">
                                                                <img
                                                                    src={worksheet?.imageLink}
                                                                    alt="prep quick"
                                                                    width="100%"
                                                                    height={104}
                                                                />
                                                            </Box>
                                                            <Typography className="quckprep_data_name">
                                                                {worksheet?.name}
                                                            </Typography>
                                                            <Typography className="quckprep_data_text">
                                                                {worksheet?.description}
                                                            </Typography>
                                                        </Box>

                                                        <Box className="quckprep_data_inr_btm">
                                                            <Button
                                                                className="outlined_cta"
                                                                onClick={() =>
                                                                    handlePrepareClick(worksheet)
                                                                }
                                                            >
                                                                Prepare
                                                            </Button>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            );
                                        }
                                    )}
                                </Stack>
                            </Box>

                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};
export default EventPrep;
