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
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { useSelector } from "react-redux";
import { ReporteeGoalTab } from "./ReporteeGoalTab/ReporteeGoalTab";

const ReporteeRowTab = ( {
  uqId,
  viewGoal,
  viewReview,
  viewCheckIn,
  reportee,
  goalsType,
  setSelectedDirectReport,
  setSelectedGoal,
  fetchDirectReports,
}: any ) => {
  const [ expanded, setExpanded ] = useState( false );
  const router = useRouter();

  const toggleTblAccord = ( id: any ) => {
    var accordClass = document.getElementById( id );
    //@ts-ignore
    if ( accordClass.classList.contains( "MuiCollapse-hidden" ) ) {
      setExpanded( id );
    } else {
      setExpanded( false );
    }
  };

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const roleBasedGoals = reportee?.goals.filter( ( goal: any ) => {
    if ( goalsType === "in_progress" ) {
      return goal?.status === "IN_PROGRESS";
    }
    if ( goalsType === "priority" ) {
      return goal?.topPriority;
    }
    return true;
  } );
  console.log( reportee?.goals, "TabsRows" );
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
          { reportee?.designation }
        </Typography>
      </Box>
      <Stack className="mng_achv_perctg_flex">
        {/*<Box>
           <Typography className="mngr_achv_header">Align</Typography> 
          <Typography className="mngr_achv_perct">
            { reportee?.alignScore }%
          </Typography>
        </Box>*/}
        <Box>
          <Typography className="mngr_achv_header">Overall Progress</Typography>
          <Typography className="mngr_achv_perct">
            { reportee?.achieveScore }%
          </Typography>
        </Box>
        {/* <Box> */ }
        {/* <Typography className="mngr_achv_perct">
            {reportee?.assureScore}%
          </Typography> */}
        {/* </Box> */ }
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap="10px">
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
        { currentUserRole === MANAGER_VIEW_STATE.MANAGER ? (
          <Box>
            <Button
              // className="mngr_achv_badge"
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
              onClick={ ( e ) => {
                console.log( reportee );
                router.push( {
                  pathname: "/align/add-goal",
                  query: {
                    reporteeId: reportee?.userId,
                    reporteeEmail: reportee?.userEmail, // -- sateesh did changes need to test * TODO Sateesh to provide email from the backend on fetchAllReporteeUserGoals
                    reporteeProgramId: reportee?.programId,
                  },
                } );
              } }
            >
              Set Goal
            </Button>
          </Box>
        ) : null }
      </Stack>
      <Collapse
        id={ uqId + "Tab" }
        in={
          //@ts-ignore
          expanded === uqId + "Tab"
        }
      >
        <Divider
          sx={ {
            border: "1px solid #EAECEF",
            borderRadius: "16px",
            margin: "16px 0",
          } }
        />
        { reportee?.goals?.length ? (
          roleBasedGoals
            ?.filter( ( goal: any ) => {
              if ( goal?.status === "ADDED" ) {
                return false;
              } else {
                return true;
              }
            } )?.map( ( goal: any, index: number ) => {
              return (
                <ReporteeGoalTab
                  key={ index }
                  goal={ goal }
                  viewCheckIn={ viewCheckIn }
                  viewGoal={ viewGoal }
                  viewReview={ viewReview }
                  setSelectedDirectReport={ setSelectedDirectReport }
                  reportee={ reportee }
                  setSelectedGoal={ setSelectedGoal }
                  fetchDirectReports={ fetchDirectReports }
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
