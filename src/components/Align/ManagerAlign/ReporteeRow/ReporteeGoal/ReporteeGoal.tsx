import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import GoalOverviewModal from "../../../../Align/EmployeeAlign/GoalOverviewModal/GoalOverviewModal";
import { useRouter } from "next/router";
import { GOAL_STATUS } from "../../../../../constants/constants";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
import { useSelector } from "react-redux";

const ReporteeGoal = ( {
  goal,
  viewGoal,
  viewCheckIn,
  viewReview,
  setSelectedDirectReport,
  reportee,
  setSelectedGoal,
  fetchDirectReports,
}: any ) => {
  const [ showGoalOverview, setShowGoalOverview ] = useState( false );
  const [ selectedType, setSelectedType ] = useState<any>( null );
  const router = useRouter();
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  useEffect( () => {
    if (
      router?.isReady &&
      router?.query?.goalId === goal?.id &&
      router?.query?.employeeId === reportee?.userId
    ) {
      const screenWidth = window.innerWidth;
      if ( screenWidth > 768 ) {
        setShowGoalOverview( true );
      }
    }
  }, [ router?.isReady ] );
  console.log( goal?.status, "goal?.status" );

  return (
    <>
      <Stack className="mngr_achv_colapbdy_box">
        <Typography className="mngr_achv_colapbdy mngr_achv_flx11 mngr_achv_goal_name">
          { goal?.nameAlias ? goal?.nameAlias : goal?.name }
          {/* <div>
            <span
              className="read_more"
              onClick={() => {
                setShowGoalOverview(true);
                setSelectedType("ACHIEVE");
              }}
            >
              Read More
            </span>
          </div>
          {/* todo temp remove align*/}
          {/* <div
            onClick={() => {
              setShowGoalOverview(true);
              setSelectedType("ALIGN");
            }}
          >
            <span className="read_more">Align</span>
          </div> */}
        </Typography>
        {/*<Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
          { goal?.alignmentScore }%
        </Typography>*/}
        <Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
          { goal?.goalAchieveScore }%
        </Typography>
        {/* <Typography className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct">
          {goal?.goalAssureScore}%
        </Typography> */}
        <Box
          className="mngr_achv_colapbdy mngr_achv_flx8"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack flexDirection="row" alignItems="center" gap="10px">
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
                  width: "125px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                } }
                onClick={ () => {
                  setShowGoalOverview( true );
                  setSelectedType( "ALIGN" );
                } }
              >
                Discuss
              </Button>
            </Box>
            { currentUserRole === MANAGER_VIEW_STATE.EXPERT && <Typography
              className="mngr_achv_colapbdy mngr_achv_flx2 mngr_achv_perct"
              sx={ {

                border: "1px solid ",
                borderRadius: "20px",
                textTransform: "initial",
                width: "169px !important",
                padding: "6px 24px !important",
                fontSize: "12px !important",
              } }

            >
              { GOAL_STATUS[ goal?.status ] }
            </Typography> }
            {/* <Box>
              
            </Box>
            <Box>
              <Button
                // className="mngr_achv_badge"
                sx={{
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
                }}
                onClick={() => {
                  setSelectedDirectReport(reportee);
                  viewReview();
                }}
              >
                Review
              </Button>
            </Box> */}
          </Stack>
        </Box>
      </Stack>
      <Divider
        className="mngr_achv_goals_hr"
        sx={ {
          border: "1px solid #EAECEF",
          borderRadius: "16px",
          margin: "16px 0",
        } }
      />
      <GoalOverviewModal
        goal={ goal }
        showGoalOverview={ showGoalOverview }
        setShowGoalOverview={ setShowGoalOverview }
        type={ "ALIGN" }
        showAskQuestion={ false }
        reportee={ reportee }
        fetchDirectReports={ fetchDirectReports }
      />
    </>
  );
};

export default ReporteeGoal;
