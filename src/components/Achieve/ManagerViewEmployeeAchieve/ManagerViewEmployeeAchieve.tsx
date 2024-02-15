import HeaderNav from "../../common/HeaderNav/HeaderNav";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import EmployeeAchieve from "../EmployeeAchieve/EmployeeAchieve";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const ManagerViewEmployeeAchieve = () => {
  const drawerWidth = 250;
  const router = useRouter();

  const managerToggleView = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Manager - Act on Goals</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }>
          <Typography
            //@ts-ignore
            variant="span"
            sx={ {
              fontWeight: "500",
              color: "#2D3648",
              marginBottom: "24px",
              cursor: "pointer",
            } }
            className="go_back_flex"
            onClick={ () => router.back() }
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
          <Typography
            variant="h1"
            sx={ { fontWeight: "700", color: "#1C2129", marginBottom: "24px" } }
            className="dash_title"
          >
            Act on Goals
          </Typography>
          { managerToggleView !== MANAGER_VIEW_STATE.LP ? (
            <EmployeeAchieve isManager={ true } />
          ) : (
            <div>
              <p>Invalid View State</p>
            </div>
          ) }
        </Box>
      </Box>
    </>
  );
};

export default ManagerViewEmployeeAchieve;
