import { useState } from "react";
import { Box, Stack, Typography, Button, Collapse } from "@mui/material";
import ReporteeGoal from "./ReporteeGoal/ReporteeGoal";
import { useRouter } from "next/router";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { useSelector } from "react-redux";

const ReporteeRow = ( {
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
  console.log( reportee?.goals, "GOALS" );
  return (
    <>
      <Box className="mngr_achv_body_btmbrdr">
        <Stack className="mngr_achv_body_box">
          <Typography className="mngr_achv_body mngr_achv_flx3 mngr_achv_slno">
            { roleBasedGoals?.filter( ( goal: any ) => {
              if ( goal?.status === "ADDED" ) {
                if ( currentUserRole === MANAGER_VIEW_STATE.MANAGER ) {
                  return false;
                }
                return true;
              }
              return true;
            } )?.length }
          </Typography>
          <Typography className="mngr_achv_body mngr_achv_flx7 mngr_achv_emp_name">
            { reportee?.userName }
            <br />
            <span className="mngr_achv_desg">{ reportee?.designation }</span>
          </Typography>
          {/*<Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
            { reportee?.alignScore }%
          </Typography>*/}
          <Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
            { reportee?.achieveScore }%
          </Typography>
          {/* <Typography className="mngr_achv_body mngr_achv_flx2 mngr_achv_perct">
            {reportee?.assureScore}%
          </Typography> */}
          <Box className="mngr_achv_body mngr_achv_flx8">
            <Stack
              flexDirection="row"
              alignItems="center"
              gap="10px"
            >
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
                  width: "126px !important",
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
              { currentUserRole === MANAGER_VIEW_STATE.MANAGER ? (
                <Box>
                  <Button
                    sx={ {
                      color: "#FFFFFF",
                      backgroundColor: "#F58A43",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#F58A43",
                        boxShadow: "none",
                      },
                      textTransform: "capitalize",
                      width: "110px !important",
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
                      // sendToManagerAddGoal(
                      //   reportee.userId,
                      //   reportee.userEmail,
                      //   reportee.programId
                      //   )
                    } }
                  >
                    Set Goal
                  </Button>
                </Box>
              ) : null }
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
            <Typography className="mngr_achv_colaphdr  mngr_achv_flx11 mngr_achv_goal_name">
              Goal Name
            </Typography>
            {/*<Typography className="mngr_achv_colaphdr mngr_achv_flx2 mngr_achv_perct">
              Goal
              <br />
              Alignment
            </Typography>*/}
            <Typography className="mngr_achv_colaphdr mngr_achv_flx2 mngr_achv_perct">

              Progress on goal
            </Typography>
            {/* <Typography className="mngr_achv_colaphdr mngr_achv_flx2">
              Goal
              <br />
              Analyze
            </Typography> */}
            <Box
              className="mngr_achv_colapbdy mngr_achv_flx8"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack flexDirection="row" alignItems="center" gap="10px">
                <Box>
                  <Typography className="mngr_achv_colaphdr mngr_achv_flx8 mngr_ach_act" sx={ {
                    width: "125px !important",
                    padding: "6px 24px !important",
                    fontSize: "12px !important",
                    marginLeft: "50px"
                  } }>
                    Action
                  </Typography>
                </Box>
                { currentUserRole === MANAGER_VIEW_STATE.EXPERT && <Typography className="mngr_achv_colaphdr mngr_achv_flx8 mngr_ach_act" sx={ {
                  width: "169px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                  marginLeft: "auto"
                } }>
                  Status
                </Typography> }
              </Stack>
            </Box>
          </Stack>
          { reportee?.goals?.length ? (
            roleBasedGoals
              ?.filter( ( goal: any ) => {
                if ( goal?.status === "ADDED" ) {
                  if ( currentUserRole === MANAGER_VIEW_STATE.MANAGER ) {
                    return false;
                  }
                  return true;
                }
                return true;
              } )?.map( ( goal: any, index: number ) => {
                return (
                  <ReporteeGoal
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
