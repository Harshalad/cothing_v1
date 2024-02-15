import { useState } from "react";
import { Box, Stack, Typography, Button, Collapse } from "@mui/material";
import ReporteeGoal from "./ReporteeGoal/ReporteeGoal";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";

const ReporteeRow = ( {
  key,
  uqId,
  viewGoal,
  viewReview,
  viewCheckIn,
  reportee,
  goalsType,
  handelsetSelectedDirectReport,
  handleSetSelectedGoal,
}: any ) => {
  const [ expanded, setExpanded ] = useState( false );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const toggleTblAccord = ( id: any ) => {
    var accordClass = document.getElementById( id );
    //@ts-ignore
    if ( accordClass.classList.contains( "MuiCollapse-hidden" ) ) {
      setExpanded( id );
    } else {
      setExpanded( false );
    }
  };
  const roleBasedGoals = reportee?.goals.filter( ( goal: any ) => {
    if ( goalsType === "in_progress" ) {
      return goal?.status === "IN_PROGRESS";
    }
    if ( goalsType === "priority" ) {
      return goal?.topPriority;
    }
    if ( goalsType === "all" ) {
      return goal?.status !== "REJECTED" && goal?.status !== "ADDED" && goal?.status !== "ASSIGNED" && goal?.status !== "SENT_FOR_APPROVAL";
    }
    return true;
  } )
  // console.log(roleBasedGoals,"filtergoals",)

  console.log( reportee?.goals, "GOALS" );
  return (
    <>
      <Box className="mngr_achv_body_btmbrdr">
        <Stack className="mngr_achv_body_box">
          <Typography className="mngr_achv_body mngr_achv_flx3 mngr_achv_slno">
            { roleBasedGoals?.length }
          </Typography>
          <Typography className="mngr_achv_body mngr_achv_flx7 mngr_achv_emp_name">
            { reportee?.userName }
            <br />
            <span className="mngr_achv_desg">{ reportee?.designation }</span>
          </Typography>
          {/*{ currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
            currentUserRole === MANAGER_VIEW_STATE.JP ||
            ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
              program?.configMap.enableAlign && (
                <Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
                  { reportee?.alignScore }%
                </Typography>
              ) ) }*/}
          <Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
            { reportee?.achieveScore }%
          </Typography>
          {/* <Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
            {reportee?.assureScore}%
          </Typography> */}
          <Box
            className="mngr_achv_body mngr_achv_flx8"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack flexDirection="row" alignItems="center" gap="10px">
              {/* <Box className="mngr_achv_badge"> */ }
              <Button
                sx={ {
                  color: "#F58A43",
                  border: "1px solid #F58A43",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  textTransform: "capitalize",
                  width: "125px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                } }
                onClick={ () => toggleTblAccord( uqId ) }
              >
                Show{ " " }
                {
                  //@ts-ignore
                  expanded === uqId ? "Less" : "More"
                }
              </Button>
              {/* </Box> */ }
            </Stack>
          </Box>
        </Stack>
        <Collapse
          id={ uqId }
          in={
            //@ts-ignore
            expanded === uqId
          }
          className="mngr_achv_collapse"
        >
          <Stack className="mngr_achv_colaphdr_box">
            <Typography className="mngr_achv_colaphdr mngr_achv_header_left mngr_achv_flx10">
              Goal Name
            </Typography>
            {/*{ currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
              ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                program?.configMap.enableAlign ) && (
                <Typography className="mngr_achv_colaphdr mngr_achv_flx2">
                  Goal
                  <br />
                  Alignment
                </Typography>
              ) }*/}
            <Typography className="mngr_achv_colaphdr mngr_achv_flx2">
              Progress on goal
            </Typography>
            {/* <Typography className="mngr_achv_colaphdr mngr_achv_flx2">
              Goal
              <br />
              Analyze
            </Typography> */}
            <Typography
              className="mngr_achv_colaphdr mngr_achv_flx8"
              style={ { textAlign: "center" } }
            >
              Action
            </Typography>
          </Stack>
          { reportee?.goals?.length ? (
            roleBasedGoals?.map( ( goal: any, index: number ) => {
              return (
                <ReporteeGoal
                  key={ index }
                  uqId={ index }
                  goal={ goal }
                  viewCheckIn={ viewCheckIn }
                  viewGoal={ viewGoal }
                  viewReview={ viewReview }
                  handelsetSelectedDirectReport={ handelsetSelectedDirectReport }
                  reportee={ reportee }
                  handleSetSelectedGoal={ handleSetSelectedGoal }
                />
              );
            } )
          ) : (
            <div>
              This user has no goals. Please change the filter or add some
              goals.
            </div>
          ) }
        </Collapse>
      </Box>
    </>
  );
};

export default ReporteeRow;
