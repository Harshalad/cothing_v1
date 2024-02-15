import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  duration,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AddGoalPurpose from "../../../../Align/AddGoal/AddGoalPurpose/AddGoalPurpose";
import CheckIn from "../CheckIn/CheckIn";
import Review from "../Review/Review";
import { useRouter } from "next/router";
import { fetchGoalsInProgress } from "../../../../../actions/achieve/fetchGoalsInProgress";
import { fetchPreviousGoals } from "../../../../../actions/align/fetchPreviousGoals";
import { getNworxUser } from "../../../../../actions/auth/fetchNworxUser";
import Applaud from "../Applaud/Applaud";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
import { useSelector } from "react-redux";

var popUpName = "";

const EmployeeGoals = ( {
  align,
  achieve,
  tabName,
  employeeId,
  employeeProgramId,
  email,
}: any ) => {
  const router = useRouter();
  const [ currentGoalsLoading, setCurrentGoalsLoading ] = useState( false );
  const [ currentGoals, setCurrentGoals ] = useState<any>( null );
  const [ previousGoalsLoading, setPreviousGoalsLoading ] = useState( false );
  const [ previousGoals, setPreviousGoals ] = useState<any>( null );
  const [ selectedGoal, setSelectedGoal ] = useState<any>( null );

  const getCurrentGoals = useCallback( async () => {
    try {
      setCurrentGoalsLoading( true );
      //@ts-ignore
      // let  = await firebaseUser.getIdToken().then(function(idToken){
      //   return idToken
      // })

      const response = await fetchGoalsInProgress( {
        userId: employeeId,
        programId: employeeProgramId,

      } );
      console.log( response, "response current goals" );
      //@ts-ignore
      if ( response?.inProgressGoals?.length ) {
        //@ts-ignore
        setCurrentGoals( response?.inProgressGoals );
      }
      setCurrentGoalsLoading( false );
    } catch ( error ) {
      console.log( error );
      setCurrentGoalsLoading( false );
    }
  }, [ employeeId, employeeProgramId ] );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const [ employeeData, setEmployeeData ] = useState<any>( null );
  console.log( currentGoals, " CURRENT GOALS LOCAL STATE" );
  useEffect( () => {
    getCurrentGoals();
  }, [ getCurrentGoals ] );

  // FETCH PREVIOUS GOALS
  useEffect( () => {
    const getPreviousGoals = async () => {
      try {
        setPreviousGoalsLoading( true );

        const response = await fetchPreviousGoals( {
          userId: employeeId,
          programId: employeeProgramId,

        } );
        //@ts-ignore
        console.log( response?.previousGoals, "previous goals" );
        //@ts-ignore
        if ( response?.previousGoals ) {
          //@ts-ignore
          setPreviousGoals( response?.previousGoals );
          //@ts-ignore
          if ( response?.previousGoals?.length ) {
            //@ts-ignore
            // setSelectedGoal(response?.previousGoals[0]);
          }
        }
        setPreviousGoalsLoading( false );
      } catch ( error ) {
        setPreviousGoalsLoading( false );
        console.log( error );
      }
    };
    getPreviousGoals();
  }, [ employeeId, employeeProgramId ] );

  // FETCH EMPLOYEE DETAILS
  useEffect( () => {
    const fetchNworxUser = async () => {
      try {
        if ( email ) {
          const response = await getNworxUser( email );
          //@ts-ignore
          if ( response?.nWorxUser ) {
            //@ts-ignore
            setEmployeeData( response.nWorxUser );
          }
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    fetchNworxUser();
  }, [ email, router?.isReady ] );

  console.log( currentGoals, previousGoals, "GOALS" );

  const [ showPopUp, setPopUp ] = useState( false );
  const [ showCheckIn, setCheckIn ] = useState( false );
  const [ showReview, setReview ] = useState( false );
  const [ showApplaud, setShowApplaud ] = useState( false );

  const viewCheckIn = ( goal: any ) => {
    setSelectedGoal( goal );
    setCheckIn( true );
  };

  const viewReview = ( goal: any ) => {
    setSelectedGoal( goal );
    setReview( true );
  };

  const viewApplaud = ( goal: any ) => {
    setSelectedGoal( goal );
    setShowApplaud( true );
  };

  const closePopup = ( value: any ) => {
    setSelectedGoal( null );
    setPopUp( value );
    setCheckIn( value );
    setReview( value );
    setShowApplaud( value );
  };

  const onCheckJourneyClick = () => {
    router.push(
      `/achieve/employee?userId=${ employeeId }&programId=${ employeeProgramId }&goalId=${ selectedGoal?.id }&employeeEmail=${ email }`
    );
  };

  return (
    <>
      { tabName === "current_goals" ? (
        <Box className="emp_dtls_add_goal">
          <Box
            className="add_goal_inner"
            onClick={ () => {
              router.push(
                `/align/add-goal?reporteeId=${ employeeId }&reporteeEmail=${ email }&reporteeProgramId=${ employeeProgramId }`
              );
            } }
          >
            { currentUserRole === MANAGER_VIEW_STATE?.MANAGER &&
              program?.configMap?.enableAlign && (
                <AddCircleOutlineRoundedIcon
                  fontSize="large"
                  sx={ { color: "#F58A43" } }
                />
              ) }
            <Typography className="add_goal_title">
              { currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
                ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                  !program?.configMap?.enableAlign )
                ? "View"
                : "Add Another" }{ " " }
              Goal
            </Typography>
            <Typography className="add_goal_subtitle">
              { currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
                ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                  !program?.configMap?.enableAlign )
                ? "View goal"
                : "Add a new goal" }{ " " }
              for the employee
            </Typography>
          </Box>
        </Box>
      ) : (
        ""
      ) }
      { tabName === "current_goals" &&
        currentGoals &&
        currentGoals
          ?.filter( ( curGoal: any ) => {
            if ( curGoal.status !== "ADDED" ) {
              return true;
            }
          } )
          .map( ( goal: any, index: number ) => {
            const startDate = new Date( goal?.startDate );
            const endDate = new Date( goal?.endDate );
            return (
              <Box className="emp_dtls_goal_box" key={ index }>
                <Box className="goal_dtls_box">
                  <Typography className="emp_goal_title">
                    { goal?.nameAlias ? goal?.nameAlias : goal?.name }
                  </Typography>
                  <Stack className="goal_lbl_link">
                    { goal?.topPriority && (
                      <Typography className="goal_label">
                        Top Priority
                      </Typography>
                    ) }
                    <Typography
                      className="chck_jrny_link"
                      onClick={ () =>
                        router.push(
                          `/achieve/employee?userId=${ employeeId }&programId=${ employeeProgramId }&goalId=${ goal?.id }&employeeEmail=${ email }`
                        )
                      }
                    >
                      Check Journey
                    </Typography>
                  </Stack>
                  <Typography className="goal_cont">
                    { goal?.descriptionAlias
                      ? goal?.descriptionAlias
                      : goal?.description }
                  </Typography>
                  <Stack className="goal_duration_flex">
                    <Stack className="goal_days_flex">
                      <AccessTimeRoundedIcon
                        fontSize="small"
                        sx={ { color: "#5D636B" } }
                      />
                      { goal?.durationInDays ? (
                        <Typography className="goal_duration">
                          { goal?.durationInDays } Days
                        </Typography>
                      ) : null }
                    </Stack>
                    <Stack className="goal_from_to_flex">
                      <Typography className="goal_from_date">
                        From :{ " " }
                        { startDate.toLocaleDateString( "en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        } ) }
                      </Typography>
                      <Typography className="goal_to_date">
                        Till :{ " " }
                        { endDate.toLocaleDateString( "en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        } ) }
                      </Typography>
                    </Stack>
                  </Stack>
                  {/*{currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
                    (currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                      program?.configMap.enableAlign)  ?
                        <Stack className="goal_prog_flex goal_align_prog">
                          <Typography className="goal_prog_title">
                            Alignment
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={goal?.alignmentScore}
                            sx={{
                              height: "10px",
                              borderRadius: "17px",
                              "&.MuiLinearProgress-root": {
                                backgroundColor:
                                  goal?.alignmentScore > 40 &&
                                  goal?.alignmentScore <= 80
                                    ? "#EAECEF"
                                    : goal?.alignmentScore > 40 &&
                                      goal?.alignmentScore > 80
                                    ? "#DFFFF2"
                                    : "#FFDEDF",
                                width: "65%",
                              },
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  goal?.alignmentScore > 40 &&
                                  goal?.alignmentScore <= 80
                                    ? "#F2D56C"
                                    : goal?.alignmentScore > 40 &&
                                      goal?.alignmentScore > 80
                                    ? "#21C262"
                                    : "#EE4412",
                                borderRadius: "17px",
                              },
                            }}
                          />
                        </Stack>
                      :null}*/}
                  <Stack className="goal_prog_flex goal_achieve_prog">
                    <Typography className="goal_prog_title">
                      Achievement
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={ goal?.goalAchieveScore }
                      sx={ {
                        height: "10px",
                        borderRadius: "17px",
                        "&.MuiLinearProgress-root": {
                          backgroundColor:
                            goal?.goalAchieveScore > 40 &&
                              goal?.goalAchieveScore <= 80
                              ? "#EAECEF"
                              : goal?.goalAchieveScore > 40 &&
                                goal?.goalAchieveScore > 80
                                ? "#DFFFF2"
                                : "#FFDEDF",
                          width: "65%",
                        },
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            goal?.goalAchieveScore > 40 &&
                              goal?.goalAchieveScore <= 80
                              ? "#F2D56C"
                              : goal?.goalAchieveScore > 40 &&
                                goal?.goalAchieveScore > 80
                                ? "#21C262"
                                : "#EE4412",
                          borderRadius: "17px",
                        },
                      } }
                    />
                  </Stack>
                  <Stack className="emp_goal_btn_blck">
                    <img
                      src="/images/goal-applause.png"
                      alt=" goal applause"
                      width={ 36 }
                      height={ 36 }
                      style={ { cursor: "pointer" } }
                      onClick={ () => viewApplaud( goal ) }
                    ></img>
                    <Stack className="goal_cta_blck">
                      { tabName === "current_goals" ? (
                        <Button
                          className="outlined_cta"
                          onClick={ () => viewReview( goal ) }
                        >
                          Review
                        </Button>
                      ) : (
                        ""
                      ) }
                      <Button
                        className="standard_cta"
                        onClick={ () => viewCheckIn( goal ) }
                        disabled={ currentUserRole === MANAGER_VIEW_STATE.JP }
                      >
                        Check-In
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            );
          } ) }
      { tabName === "completed_goals" &&
        previousGoals &&
        previousGoals?.map( ( goal: any, index: number ) => {
          const startDate = new Date( goal?.startDate );
          const endDate = new Date( goal?.endDate );
          return (
            <Box className="emp_dtls_goal_box" key={ index }>
              <Box className="goal_dtls_box">
                <Typography className="emp_goal_title">
                  { goal?.nameAlias ? goal?.nameAlias : goal?.name }
                </Typography>
                <Stack className="goal_lbl_link">
                  { goal?.topPriority && (
                    <Typography className="goal_label">Top Priority</Typography>
                  ) }
                  <Typography
                    className="chck_jrny_link"
                    onClick={ () =>
                      router.push(
                        `/achieve/employee?userId=${ employeeId }&programId=${ employeeProgramId }&goalId=${ goal?.id }&employeeEmail=${ email }`
                      )
                    }
                  >
                    Check Journey
                  </Typography>
                </Stack>
                <Typography className="goal_cont">
                  { goal?.descriptionAlias
                    ? goal?.descriptionAlias
                    : goal?.description }
                </Typography>
                <Stack className="goal_duration_flex">
                  <Stack className="goal_days_flex">
                    <AccessTimeRoundedIcon
                      fontSize="small"
                      sx={ { color: "#5D636B" } }
                    />
                    { goal?.durationInDays ? (
                      <Typography className="goal_duration">
                        { goal?.durationInDays } Days
                      </Typography>
                    ) : null }
                  </Stack>
                  <Stack className="goal_from_to_flex">
                    <Typography className="goal_from_date">
                      From :{ " " }
                      { startDate.toLocaleDateString( "en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      } ) }
                    </Typography>
                    <Typography className="goal_to_date">
                      Till :{ " " }
                      { endDate.toLocaleDateString( "en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      } ) }
                    </Typography>
                  </Stack>
                </Stack>
                {/*{ program?.configMap.enableAlign && <Stack className="goal_prog_flex goal_align_prog">
                  <Typography className="goal_prog_title">Alignment</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={ goal?.alignmentScore }
                    sx={ {
                      height: "10px",
                      borderRadius: "17px",
                      "&.MuiLinearProgress-root": {
                        backgroundColor:
                          goal?.alignmentScore > 40 &&
                            goal?.alignmentScore <= 80
                            ? "#EAECEF"
                            : goal?.alignmentScore > 40 &&
                              goal?.alignmentScore > 80
                              ? "#DFFFF2"
                              : "#FFDEDF",
                        width: "65%",
                      },
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          goal?.alignmentScore > 40 &&
                            goal?.alignmentScore <= 80
                            ? "#F2D56C"
                            : goal?.alignmentScore > 40 &&
                              goal?.alignmentScore > 80
                              ? "#21C262"
                              : "#EE4412",
                        borderRadius: "17px",
                      },
                    } }
                  />
                </Stack> }*/}
                <Stack className="goal_prog_flex goal_achieve_prog">
                  <Typography className="goal_prog_title">
                    Achievement
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={ goal?.goalAchieveScore }
                    sx={ {
                      height: "10px",
                      borderRadius: "17px",
                      "&.MuiLinearProgress-root": {
                        backgroundColor:
                          goal?.goalAchieveScore > 40 &&
                            goal?.goalAchieveScore <= 80
                            ? "#EAECEF"
                            : goal?.goalAchieveScore > 40 &&
                              goal?.goalAchieveScore > 80
                              ? "#DFFFF2"
                              : "#FFDEDF",
                        width: "65%",
                      },
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          goal?.goalAchieveScore > 40 &&
                            goal?.goalAchieveScore <= 80
                            ? "#F2D56C"
                            : goal?.goalAchieveScore > 40 &&
                              goal?.goalAchieveScore > 80
                              ? "#21C262"
                              : "#EE4412",
                        borderRadius: "17px",
                      },
                    } }
                  />
                </Stack>
              </Box>
            </Box>
          );
        } ) }

      <AddGoalPurpose closePopup={ closePopup } open={ { showPopUp, popUpName } } />
      <CheckIn
        closePopup={ closePopup }
        open={ showCheckIn }
        employeeData={ employeeData }
        goal={ selectedGoal }
        onCheckJourneyClick={ onCheckJourneyClick }
      />
      <Review
        closePopup={ closePopup }
        open={ showReview }
        employeeData={ employeeData }
        goal={ selectedGoal }
        onCheckJourneyClick={ onCheckJourneyClick }
      />
      <Applaud
        closePopup={ closePopup }
        open={ showApplaud }
        employeeData={ employeeData }
        goal={ selectedGoal }
        onCheckJourneyClick={ onCheckJourneyClick }
      />
    </>
  );
};
export default EmployeeGoals;
