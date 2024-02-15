import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import GoalOverviewModal from "../../../../Align/EmployeeAlign/GoalOverviewModal/GoalOverviewModal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";

export const ReporteeGoalTab = ( {
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
      <Typography className="mngr_achv_goal_name">
        { goal?.nameAlias ? goal?.nameAlias : goal?.name }
        <div>
          <span
            className="read_more"
            onClick={ () => {
              router.push(
                `/achieve/employee?userId=${ reportee?.userId }&programId=${ reportee?.programId }&goalId=${ goal?.id }&employeeEmail=${ reportee?.userEmail }`
              );
            } }
          >
            View
          </span>
        </div>
      </Typography>
      <Stack className="mng_achv_perctg_flex" sx={ { marginTop: "16px" } }>
        {/*{ currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
          currentUserRole === MANAGER_VIEW_STATE.JP ||
          ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
            program?.configMap.enableAlign && (
              <Box>
                <Typography className="mngr_achv_header">Goal Alignment</Typography>
                <Typography className="mngr_achv_perct">
                  { goal?.alignmentScore }%
                </Typography>
              </Box>
            ) ) }*/}
        <Box>
          <Typography className="mngr_achv_header">Progress on goal</Typography>
          <Typography className="mngr_achv_perct">
            { goal?.goalAchieveScore }%
          </Typography>
        </Box>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap="10px">
        {/* <Box>
          <Button
            sx={{
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
            }}
            onClick={() => {
              handleReviewClick();
              viewReview();
            }}
          >
            Review
          </Button>
        </Box> */}
        <Box>
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
              width: "116px !important",
              padding: "6px 24px !important",
              fontSize: "12px !important",
            } }
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
