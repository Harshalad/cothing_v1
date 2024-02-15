import { useState } from "react";
import HeaderNav from "../../../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Tooltip,
  Tab,
  Tabs,
  LinearProgress,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Graph from "./Graph/Graph";
import EmployeeGoals from "../EmployeeProfile/EmployeeGoals/EmployeeGoals";
import EmployeeDetails from "./EmployeeDetails/EmployeeDetails";
import { useRouter } from "next/router";
import EmployeeOverview from "./EmployeeOverview/EmployeeOverview";
// import AddGoalPurpose from './AddGoalPurpose';
// import CheckIn from './CheckIn';
// import Review from './Review';

//var popUpName = "";

const drawerWidth = 250;

const EmployeeProfileDetails = () => {
  const router = useRouter();
  const [tabName, setTabName] = useState("current_goals");
  const align = 85;
  const achieve = 20;

  const email = router?.query?.employeeEmail;
  const employeeId = router?.query?.employeeId;
  const employeeProgramId = router?.query?.employeeProgramId;
  const managerId = router?.query?.managerId;
  const userAlignmentScore = router?.query?.userAlignmentScore;
  const userAchievementScore = router?.query?.userAchievementScore;

  const tabSwitch = (event: any, newValue: any) => {
    setTabName(newValue);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Employee Profile Details</title>
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
          className="emp_prof_dtls"
        >
          <Link href="/action-center" style={{ textDecoration: "none" }}>
            <Typography
              //@ts-ignore
              variant="span"
              sx={{ fontWeight: "500", color: "#2D3648", marginBottom: "24px" }}
              className="go_back_flex"
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
          </Link>
          <EmployeeDetails email={email} />
          <EmployeeOverview
            employeeId={employeeId}
            employeeProgramId={employeeProgramId}
            userAlignmentScore={userAlignmentScore}
            userAchievementScore={userAchievementScore}
          />
          <Box className="emp_goals">
            <Box className="emp_dtls_tab_box">
              <Tabs
                value={tabName}
                onChange={tabSwitch}
                className="emp_dtls_tabs"
              >
                <Tab
                  value="current_goals"
                  label="Current Goals"
                  sx={{ textTransform: "capitalize" }}
                />
                <Tab
                  value="completed_goals"
                  label="Completed Goals"
                  sx={{ textTransform: "capitalize" }}
                  disabled={false}
                />
              </Tabs>
            </Box>
            <Box className="emp_dtls_tabcont">
              {tabName === "current_goals" ? (
                <EmployeeGoals
                  align={userAlignmentScore}
                  achieve={userAchievementScore}
                  employeeId={employeeId}
                  employeeProgramId={employeeProgramId}
                  tabName={tabName}
                  email={email}
                />
              ) : (
                <EmployeeGoals
                  align={userAlignmentScore}
                  achieve={userAchievementScore}
                  employeeId={employeeId}
                  employeeProgramId={employeeProgramId}
                  tabName={tabName}
                  email={email}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default EmployeeProfileDetails;
