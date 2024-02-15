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
import { fetchQuickPrepSet } from "../../actions/quickPrep/fetchQuickPrepSet";
import Spinner from "../common/Spinner/Spinner";
import { useRouter } from "next/router";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import UserDetails from "../common/UserDetails/UserDetails";
import { getNworxUser } from "../../actions/auth/fetchNworxUser";

const drawerWidth = 250;

const QuickPreparation = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [quickPrepSetLoading, setQuickPrepSetLoading] = useState(false);
  const [quickPrepSetData, setQuickPrepSetData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
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
    const getQuickPrepSet = async () => {
      try {
        setQuickPrepSetLoading(true);
        const response: any =
          currentUserRole !== MANAGER_VIEW_STATE.LP
            ? await fetchQuickPrepSet(employeeData?.activeProgramId)
            : await fetchQuickPrepSet(user?.activeProgramId);
        setQuickPrepSetData(response);
        if (response?.length) {
          setSelectedCategory(response?.[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setQuickPrepSetLoading(false);
      }
    };
    getQuickPrepSet();
  }, [user?.activeProgramId, employeeData]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Tools</title>
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
            Tools
          </Typography>
          <Stack className="quckprep_header_flex">
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
            <Link
              href={`/quick-preparation/completed?employeeEmail=${
                currentUserRole !== MANAGER_VIEW_STATE.LP
                  ? employeeData?.email
                  : user?.email
              }`}
            >
              <Typography className="quckprep_cmpltd_link">
                Recent Tools
              </Typography>
            </Link>

          </Stack>

          <Stack className="quckprep_cntnt_flex">
            <Box className="quckprep_lftcntnt">
              <Typography className="quckprep_catg_hdr">Categories</Typography>
              {quickPrepSetLoading ? (
                <Spinner />
              ) : (
                <Stack className="quckprep_catg_flex">
                  {quickPrepSetData?.map((category: any, index: number) => {
                    return (
                      <Box
                        key={index}
                        className={`quckprep_catg_box ${
                          category?.categoryName ===
                            selectedCategory?.categoryName && "active"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <Typography
                          className={`quckprep_catg_name ${
                            matches === true
                              ? category?.categoryName ===
                                  selectedCategory?.categoryName && "active"
                              : ""
                          }`}
                        >
                          {category?.categoryName}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Box>
            <Box className="quckprep_rgtcntnt">
              {selectedCategory?.subCategories?.map(
                (subCategory: any, index: number) => {
                  return (
                    <Box className="quckprep_data_box" key={index}>
                      <Typography className="quckprep_data_title">
                        {subCategory?.subCategoryName}
                      </Typography>
                      <Stack className="quckprep_data_flx">
                        {subCategory?.worksheets?.map(
                          (worksheet: any, index: number) => {
                            return (
                              <Box
                                className="quckprep_data_inr_box"
                                key={index}
                              >
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
                                      {worksheet?.worksheetName}
                                    </Typography>
                                    <Typography className="quckprep_data_text">
                                      {worksheet?.worksheetDescription}
                                    </Typography>
                                  </Box>

                                  <Box className="quckprep_data_inr_btm">
                                    <Button
                                      className="outlined_cta"
                                      onClick={() =>
                                        router.push(
                                          `/quick-preparation/prepare?worksheetId=${
                                            worksheet?.worksheetId
                                          }&pickWorksheetFrom=work_sheet&&employeeEmail=${
                                            currentUserRole !==
                                            MANAGER_VIEW_STATE.LP
                                              ? employeeData?.email
                                              : user?.email
                                          }&quick-preparation&id=${ worksheet?.worksheetId}`
                                        )
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
                  );
                }
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default QuickPreparation;
