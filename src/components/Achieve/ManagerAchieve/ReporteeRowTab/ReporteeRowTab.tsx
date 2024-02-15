import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Collapse,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReporteeGoalTab } from "./ReporteeGoalTab/ReporteeGoalTab";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";

const ReporteeRowTab = ( {
  uqId,
  viewGoal,
  viewReview,
  viewCheckIn,
  reportee,
  goalsType,
  handelsetSelectedDirectReport,
  handleSetSelectedGoal,
}: any ) => {

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const [ expanded, setExpanded ] = useState( false );
  const toggleTblAccord = ( id: any ) => {
    var accordClass = document.getElementById( id );
    //@ts-ignore
    if ( accordClass.classList.contains( "MuiCollapse-hidden" ) ) {
      setExpanded( id );
    } else {
      setExpanded( false );
    }
  };
  console.log( reportee?.goals, "TabsRows" );
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
  } );
  return (
    <Box className="mng_achv_tbl tab">
      <Typography className="mngr_achv_header">
        No of Goals -{ " " }
        <span className="mngr_achv_slno">{ roleBasedGoals?.length }</span>
      </Typography>
      <Box sx={ { margin: "10px 0 16px" } }>
        <Typography className="mngr_achv_emp_name">
          { reportee?.userName }
        </Typography>
        <Typography className="mngr_achv_desg">
          { reportee.designation }
        </Typography>
      </Box>
      <Stack className="mng_achv_perctg_flex">
        {/*{ currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
          currentUserRole === MANAGER_VIEW_STATE.JP ||
          ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
            program?.configMap.enableAlign && (
              <Box>
                <Typography className="mngr_achv_header">Alignment</Typography>
                <Typography className="mngr_achv_perct">
                  { reportee?.alignScore }%
                </Typography>
              </Box>
            ) ) }*/}
        <Box>
          <Typography className="mngr_achv_header">Overall Progress</Typography>
          <Typography className="mngr_achv_perct">
            { reportee?.achieveScore }%
          </Typography>
        </Box>
      </Stack>
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
        onClick={ () => toggleTblAccord( uqId + "Tab" ) }
      >
        Show{ " " }
        {
          //@ts-ignore
          expanded === uqId + "Tab" ? "Less" : "More"
        }
      </Button>
      <Collapse
        id={ uqId + "Tab" }
        in={
          //@ts-ignore
          expanded === uqId + "Tab"
        }
        className="mngr_achv_collapse"
      >
        <Divider
          sx={ {
            border: "1px solid #EAECEF",
            borderRadius: "16px",
            margin: "16px 0",
          } }
        />
        { reportee?.goals?.length ? (
          roleBasedGoals?.map( ( goal: any, index: number ) => {
            return (
              <ReporteeGoalTab
                key={ index }
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
            This user has no goals. Please change the filter or add some goals.
          </div>
        ) }
      </Collapse>
    </Box>
  );
};

export default ReporteeRowTab;
