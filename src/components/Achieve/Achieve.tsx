import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Box, Icon, RadioGroup, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import ManagerAchieve from "./ManagerAchieve/ManagerAchieve";
import EmployeeAchieve from "./EmployeeAchieve/EmployeeAchieve";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { logUserEngagement } from "../../actions/actionCenter/logUserEngagement";
import { useState } from "react";
import { ACHIEVE_VIEW_STATES } from "../../constants/achieve";
const Achieve = () => {
  const drawerWidth = 250;
  const router = useRouter();
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const hostUrl = window.location.host.toLowerCase();
  const [ hul, setHul ] = useState( hostUrl.includes( "hul" ) );
  const managerToggleView = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  // const [addGoalView, setAddGoalView] = useState(ACHIEVE_VIEW_STATES.MILESTONE)
  // const [viewState, setViewState]= useState(ACHIEVE_VIEW_STATES.MILESTONE);
  // const handleViewState =(e:any)=>{
  //   setViewState(e);
  // }

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  console.log( "program", program );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Act on Goals</title>
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
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px", minHeight: "100vh" } }>
          <Stack flexDirection="row" justifyContent="space-between" gap="20px">
            <Typography
              variant="h1"
              sx={ { fontWeight: "700", color: "#1C2129", marginBottom: "24px" } }
              className="dash_title"
            >
              Act on Goals
            </Typography>

            { !program?.configMap.enableAlign &&
              currentUserRole === MANAGER_VIEW_STATE.LP && !hul ? (
              <div style={ { display: "flex" } }>
                <article
                  className="add-goal-btn"
                  onClick={ () => {
                    if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
                      logUserEngagement( {
                        userId: user?.id,
                        //@ts-ignore
                        goalId: "NA",
                        programId: user?.activeProgramId,
                        type: "curiosity",
                        action: "employee_added_goal",
                        //@ts-ignore
                        contentName: "NA",
                        contentId: "NA",
                        milestoneId: "NA",
                        marks: 4,
                      } );
                    }
                    router.push( "/align/add-goal" );
                  } }
                  role="button"
                  style={ { cursor: "pointer" } }
                >
                  <Icon sx={ { color: "#F58A43" } }>
                    <AddCircleOutlineIcon />
                  </Icon>
                  &nbsp;Add Goal
                </article>
              </div>
            ) : null }
          </Stack>
          { managerToggleView === MANAGER_VIEW_STATE.LP ? (
            <EmployeeAchieve isManager={ false } />
          ) : (
            <ManagerAchieve />
          ) }
        </Box>
      </Box>
    </>
  );
};

export default Achieve;
