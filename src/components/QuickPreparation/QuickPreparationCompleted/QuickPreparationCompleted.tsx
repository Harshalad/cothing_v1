import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../../../components/common/HeaderNav/HeaderNav";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllQuickPreps } from "../../../actions/quickPrep/fetchAllQuickPreps";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getNworxUser } from "../../../actions/auth/fetchNworxUser";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import UserDetails from "../../common/UserDetails/UserDetails";

const drawerWidth = 250;

const QuickPreparationCompleted = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const router = useRouter();
  const [userQuickPreps, setUserQuickPreps] = useState<any>(null);
  let email = router?.query?.employeeEmail;
  const [employeeData, setEmployeeData] = useState<any>(null);
  if (currentUserRole !== MANAGER_VIEW_STATE.LP) {
    const fetchNworxUser = async () => {
      try {
        const response = await getNworxUser(email);
        //@ts-ignore
        if (response?.nWorxUser) {
          //@ts-ignore
          setEmployeeData(response.nWorxUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (employeeData === null) fetchNworxUser();
  }
  console.log(user, "qprc");
  useEffect(() => {
    const getAllQuickPreps = async () => {
      try {
        const response: any =
          currentUserRole !== MANAGER_VIEW_STATE.LP
            ? await fetchAllQuickPreps({
                userId: employeeData?.id,
                programId: employeeData?.activeProgramId,
              })
            : await fetchAllQuickPreps({
                userId: user?.id,
                programId: user?.activeProgramId,
              });
        const data = response;


        // data.sort((a:any, b:any) => b.modifiedDateTime - a.modifiedDateTime)

        console.log("setting data length 12345 ", data.length);
        setUserQuickPreps(data);
      } catch (error) {
        console.log(error);
      }
    };
    // if()
    getAllQuickPreps();
  }, [employeeData]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Completed Preparation</title>
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
          sx={{
            backgroundColor: "#EAECEF",
            padding: "112px 32px 32px",
            minHeight: "100vh",
          }}
          className="quckprep cmpltdprep"
        >
          {employeeData ? (
            <>
              <UserDetails employeeData={employeeData} />
              <br />
            </>
          ) : null}
          <Box className="mngralgn_askquest_back">
            <>
              <Typography
                sx={{
                  fontWeight: "500",
                  color: "#2D3648",
                  marginBottom: "24px",
                }}
                className="go_back_flex"
                onClick={() => router.back()}
              >
                <ChevronLeftIcon /> Go Back
              </Typography>
            </>
          </Box>
          <Stack className="quckprep_header_flex">
            <Typography
              variant="h1"
              sx={{ fontWeight: "700", color: "#1C2129" }}
              className="dash_title"
            >
              Recent Tools
            </Typography>
            {/* <TextField
              id="search"
              placeholder="Search by"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
                className: "serach",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="search" edge="start" size="small">
                      <SearchIcon sx={{ color: "#989EA5" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: "350px",
                "& ::placeholder": { color: "#999CA0", opacity: "1" },
              }}
              className="search_field"
            /> */}
          </Stack>
          {userQuickPreps?.length === 0 ? (
            <Stack>
              <Box>
                No Tool completed yet. Select a Tool and start
                preparing now!
              </Box>
              <Button
                onClick={() => {
                  router.push("/quick-preparation");
                }}
              >
                Select a Tool
              </Button>
            </Stack>
          ) : (
            <Box className="cmpltdprep_data_box">
              <Stack className="quckprep_data_flx">
                {userQuickPreps?.map((worksheet: any, index: number) => {
                  return (
                    <Box className="quckprep_data_inr_box" key={index}>
                      <Stack className="quckprep_data_inr_flx">
                        <Box className="quckprep_data_inr_top">
                          <Typography className="quckprep_data_read_time">
                            15 min
                          </Typography>
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
                              router.push(
                                `/quick-preparation/prepare?worksheetId=${
                                  worksheet?.id
                                }&pickWorksheetFrom=user_work_sheet&employeeEmail=${
                                  currentUserRole !== MANAGER_VIEW_STATE.LP
                                    ? employeeData?.email
                                    : user?.email
                                }`
                              )
                            }
                          >
                            Prepare
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
                {/* <Box className="quckprep_data_inr_box">
                <Stack className="quckprep_data_inr_flx">
                  <Box className="quckprep_data_inr_top">
                    <Typography className="quckprep_data_read_time">
                      15 min
                    </Typography>
                    <Box className="quckprep_data_img">
                      <img
                        src="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
                        alt="prep quick"
                        width="100%"
                        height={104}
                      />
                    </Box>
                    <Typography className="quckprep_data_name">
                      Adopt a continuous growth mindset
                    </Typography>
                    <Typography className="quckprep_data_text">
                      Adopt a continuous growth mindset Adopt a continuous
                      growth mindset
                    </Typography>
                  </Box>
                  <Box className="quckprep_data_inr_btm">
                    <Button className="outlined_cta">Prepare</Button>
                  </Box>
                </Stack>
              </Box>
              <Box className="quckprep_data_inr_box">
                <Stack className="quckprep_data_inr_flx">
                  <Box className="quckprep_data_inr_top">
                    <Typography className="quckprep_data_read_time">
                      15 min
                    </Typography>
                    <Box className="quckprep_data_img">
                      <img
                        src="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
                        alt="prep quick"
                        width="100%"
                        height={104}
                      />
                    </Box>
                    <Typography className="quckprep_data_name">
                      Adopt a continuous growth mindset
                    </Typography>
                    <Typography className="quckprep_data_text">
                      Adopt a continuous growth mindset Adopt a continuous
                      growth mindset
                    </Typography>
                  </Box>
                  <Box className="quckprep_data_inr_btm">
                    <Button className="outlined_cta">Prepare</Button>
                  </Box>
                </Stack>
              </Box>
              <Box className="quckprep_data_inr_box">
                <Stack className="quckprep_data_inr_flx">
                  <Box className="quckprep_data_inr_top">
                    <Typography className="quckprep_data_read_time">
                      15 min
                    </Typography>
                    <Box className="quckprep_data_img">
                      <img
                        src="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
                        alt="prep quick"
                        width="100%"
                        height={104}
                      />
                    </Box>
                    <Typography className="quckprep_data_name">
                      Adopt a continuous growth mindset
                    </Typography>
                    <Typography className="quckprep_data_text">
                      Adopt a continuous growth mindset Adopt a continuous
                      growth mindset
                    </Typography>
                  </Box>
                  <Box className="quckprep_data_inr_btm">
                    <Button className="outlined_cta">Prepare</Button>
                  </Box>
                </Stack>
              </Box>
              <Box className="quckprep_data_inr_box">
                <Stack className="quckprep_data_inr_flx">
                  <Box className="quckprep_data_inr_top">
                    <Typography className="quckprep_data_read_time">
                      15 min
                    </Typography>
                    <Box className="quckprep_data_img">
                      <img
                        src="https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA"
                        alt="prep quick"
                        width="100%"
                        height={104}
                      />
                    </Box>
                    <Typography className="quckprep_data_name">
                      Adopt a continuous growth mindset
                    </Typography>
                    <Typography className="quckprep_data_text">
                      Adopt a continuous growth mindset Adopt a continuous
                      growth mindset
                    </Typography>
                  </Box>
                  <Box className="quckprep_data_inr_btm">
                    <Button className="outlined_cta">Prepare</Button>
                  </Box>
                </Stack>
              </Box> */}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default QuickPreparationCompleted;
