import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import GoalOverviewModal from "../../../../Align/EmployeeAlign/GoalOverviewModal/GoalOverviewModal";
import { useRouter } from "next/router";

export const ReporteeGoalTab = ( {
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
  useEffect( () => {
    if (
      router?.isReady &&
      router?.query?.goalId === goal?.id &&
      router?.query?.employeeId === reportee?.userId
    ) {
      const screenWidth = window.innerWidth;
      if ( screenWidth <= 768 ) {
        setShowGoalOverview( true );
      }
      // console.log("aditya123",12)
      //
    }
  }, [ goal?.id, router?.isReady, router?.query?.goalId ] );
  return (
    <>
      <Typography className="mngr_achv_goal_name">{ goal?.name }</Typography>
      <Stack className="mng_achv_perctg_flex" sx={ { marginTop: "16px" } }>
        {/*<Box>
          <Typography className="mngr_achv_header">Alignment</Typography>
          <Typography className="mngr_achv_perct">
            { goal?.alignmentScore }%
          </Typography>
        </Box>*/}
        <Box>
          <Typography className="mngr_achv_header">Progress on goal</Typography>
          <Typography className="mngr_achv_perct">
            { goal?.goalAchieveScore }%
          </Typography>
        </Box>
        {/* <Box>
          <Typography className="mngr_achv_header">Analyze</Typography>
          <Typography className="mngr_achv_perct">
            {goal?.goalAssureScore}%
          </Typography>
        </Box> */}
      </Stack>
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
              setShowGoalOverview( true );
              setSelectedType( "ALIGN" );
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
