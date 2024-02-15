import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import GoalOverviewModal from "../../../../Align/EmployeeAlign/GoalOverviewModal/GoalOverviewModal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";

const ReporteeGoal = ( {
  goal,
  viewGoal,
  viewCheckIn,
  viewReview,
  handelsetSelectedDirectReport,
  reportee,
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
  const [ showGoalOverview, setShowGoalOverview ] = useState( false );
  const [ selectedType, setSelectedType ] = useState<any>( null );
  const router = useRouter();

  console.log( reportee, "reportee goal reportee" );

  const handleReviewClick = () => {
    handelsetSelectedDirectReport( reportee );
    handleSetSelectedGoal( goal );
  };
  const handleCheckInClick = () => {
    handelsetSelectedDirectReport( reportee );
    handleSetSelectedGoal( goal );
  };
  return (
    <>
      <Stack className="mngr_achv_colapbdy_box">
        <Typography className="mngr_achv_colapbdy mngr_achv_flx10 mngr_achv_goal_name">
          { goal?.nameAlias ? goal?.nameAlias : goal?.name }
          <div>
            <span
              className="read_more"
              onClick={ () => {
                // redirec the manager to users journey page
                router.push(
                  `/achieve/employee?userId=${ reportee?.userId }&programId=${ reportee?.programId }&goalId=${ goal?.id }&employeeEmail=${ reportee?.userEmail }`
                );
                // setShowGoalOverview(true);
                // setSelectedType("ACHIEVE");
              } }
            >
              View
            </span>
          </div>
          {/* todo temp remove align*/ }
          {/* <div
            onClick={() => {
              setShowGoalOverview(true);
              setSelectedType("ALIGN");
            }}
          >
            <span className="read_more">Align</span>
          </div> */}
        </Typography>
        {/*{ currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
          currentUserRole === MANAGER_VIEW_STATE.JP ||
          ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
            program?.configMap.enableAlign && (
              <Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
                { goal?.alignmentScore }%
              </Typography>
            ) ) }*/}
        <Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
          { goal?.goalAchieveScore }%
        </Typography>
        {/* <Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
          {goal?.goalAssureScore}%
        </Typography> */}
        <Box className="mngr_achv_colapbdy mngr_achv_flx8" sx={ { marginLeft: "0px" } }>
          <Stack flexDirection="row" alignItems="center" gap="10px">
            <Box>
              <Button
                // className="mngr_achv_badge"
                sx={ {
                  color: "#FFFFFF",
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#F58A43",
                    boxShadow: "none",
                  },
                  textTransform: "capitalize",
                  width: "116px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                } }
                onClick={ () => {
                  handleReviewClick();
                  viewReview();
                } }
              >
                Review
              </Button>
            </Box>
            <Box>
              <Button
                sx={ {
                  color: "#F58A43",
                  border: "1px solid ",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  textTransform: "capitalize",
                  width: "116px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                } }
                disabled={ currentUserRole === MANAGER_VIEW_STATE?.JP }
                onClick={ () => {
                  handleCheckInClick();
                  viewCheckIn();
                } }
              >
                Check-in
              </Button>
            </Box>

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
                  width: "116px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                } }
                onClick={ () => {
                  setShowGoalOverview( true );
                  setSelectedType( "ACHIEVE" );
                } }
              >
                Discuss
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Divider
        className="mngr_achv_goals_hr"
        sx={ {
          border: "1px solid #EAECEF",
          borderRadius: "16px",
          margin: "16px 0 0",
        } }
      />
      <GoalOverviewModal
        goal={ goal }
        showGoalOverview={ showGoalOverview }
        setShowGoalOverview={ setShowGoalOverview }
        type={ selectedType }
        showAskQuestion={ false }
        reportee={ reportee }
      />
    </>
  );
};

export default ReporteeGoal;
