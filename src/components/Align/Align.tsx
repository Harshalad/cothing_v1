import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import EmployeeAlign from "./EmployeeAlign/EmployeeAlign";
import ManagerAlignWithLPGoalAlign from "./ManagerAlign/ManagerAlignWithLPGoalAlign";

const Align = () => {
  const drawerWidth = 250;
  const router = useRouter();

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  return (
    <>
      <Box className="align-panel-page">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Set Goals</title>
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
          <Box
            sx={ {
              backgroundColor: "#EAECEF",
              padding: "112px 32px 32px",
              minHeight: "100vh",
            } }
          >
            <Typography
              variant="h1"
              sx={ { fontWeight: "700", color: "#1C2129", marginBottom: "24px" } }
              className="dash_title"
            >
              Set Goals
            </Typography>

            { ( currentUserRole === MANAGER_VIEW_STATE.LP ||
              currentUserRole === MANAGER_VIEW_STATE.MANAGER ) &&
              !program?.configMap?.enableAlign ? (
              <div>You dont have access.</div>
            ) : currentUserRole === MANAGER_VIEW_STATE.LP ? (
              <EmployeeAlign />
            ) : (
              <ManagerAlignWithLPGoalAlign />
            ) }
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Align;
