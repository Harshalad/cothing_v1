import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Tabs,
  Tab,
  LinearProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ViewPurpose from "../../common/ViewPurpose/ViewPurpose";
import Guidance from "./Guidance";
import AchieveGoals from "./AchieveGoals";
import AchieveMilestones from "./Milestones/Milestones";
import { useSelector } from "react-redux";
import { fetchCurrentGoals } from "../../../actions/achieve/fetchCurrentGoals";
import { fetchUserGoalMilestone } from "../../../actions/achieve/fetchUserGoalMilestone";
import Milestones from "./Milestones/Milestones";
import { fetchGoalsInProgress } from "../../../actions/achieve/fetchGoalsInProgress";
import Spinner from "../../common/Spinner/Spinner";
import { fetchPreviousGoals } from "../../../actions/align/fetchPreviousGoals";
import { useRouter } from "next/router";
import { getRouterParamFromAsPath } from "../../../utils/getRouterParam";
import UserDetails from "../../common/UserDetails/UserDetails";
import { getNworxUser } from "../../../actions/auth/fetchNworxUser";
import { fetchConceptPrimerByContentId } from "../../../actions/achieve/fetchConceptPrimerByContentId";
import { ACHIEVE_VIEW_STATES } from "../../../constants/achieve";
import PostsSection from "../../common/Posts/PostsSection";
import { logUserEngagement } from "../../../actions/actionCenter/logUserEngagement";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import PreviousActivity from "./PreviousActivity/PreviousActivity";
import GoalOverviewModal from "../../Align/EmployeeAlign/GoalOverviewModal/GoalOverviewModal";
import { AlignVerticalBottom } from "@mui/icons-material";
import VideoPlayer from "../../VideoPlayer";

var popUpName = "";

const drawerWidth = 250;

const EmployeeAchieve = ( { isManager, }: any ) => {
  const [ viewState, setViewState ] = useState( ACHIEVE_VIEW_STATES.MILESTONE );
  const router = useRouter();
  const [ tabName, setTabName ] = useState( "InProgress" );
  const [ progressActiveId, setProgressActiveId ] = useState( "" );
  const [ completedActiveId, setCompletedActiveId ] = useState( "" );
  const [ showViewPurpose, setViewPurpose ] = useState( false );
  const [ showIFrame, setIFrame ] = useState( false );
  const [ showIFrameTitle, setIFrameTitle ] = useState( "" );
  const [ iFrameLink, setIFrameLink ] = useState( "" );
  const [ completedExpanded, setCompletedExpanded ] = useState( false );
  const [ goals, setGoals ] = useState( [] );
  const [ previousGoals, setPreviousGoals ] = useState( [] );
  const [ selectedGoal, setSelectedGoal ] = useState<any>( null );
  const [ selectedGoalMilestones, setSelectedGoalMilestones ] =
    useState<any>( null );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ goalsLoading, setGoalsLoading ] = useState( false );
  const [ previousGoalsLoading, setPreviousGoalsLoading ] = useState( false );
  const [ milestonesDataLoading, setMilestonesDataLoading ] = useState( false );
  // const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [ userId, setUserId ] = useState( null );
  const [ programId, setProgramId ] = useState( null );
  const [ employeeEmail, setEmployeeEmail ] = useState<any>( null );
  const [ employeeData, setEmployeeData ] = useState<any>( null );
  const [ goalIdFromQuery, setGoalIdFromQuery ] = useState( router?.query?.goalId );
  const [ showGoalOverview, setShowGoalOverview ] = useState<boolean>( false );
  const [ change, setChange ] = useState<any>( false );
  const [ mediaType, setMediaType ] = useState<any>( null );

  const handleChange = () => {
    setChange( !change );
  }
  // //@ts-ignore
  // let  = await firebaseUser.getIdToken().then(function(idToken){
  //   return idToken
  // })

  const setUserIdAndProgramId = useCallback( async () => {
    if ( router?.query?.userId ) {
      //@ts-ignore
      setUserId( router?.query?.userId );
    }
    if ( !router?.query?.userId && user ) {
      setUserId( user?.id );
    }

    if ( router?.query?.programId ) {
      //@ts-ignore
      setProgramId( router?.query?.programId );
    }
    if ( !router?.query?.programId ) {
      setProgramId( user?.activeProgramId );
    }

    if ( router?.query?.employeeEmail ) {
      setEmployeeEmail( router?.query?.employeeEmail );
    }
  }, [
    router?.query?.userId,
    router?.query?.programId,
    router?.query?.employeeEmail,
    user,
  ] );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  useEffect( () => {
    if ( router.isReady && router?.query?.goalId ) {
      setGoalIdFromQuery( router?.query?.goalId );
    }

    if ( router.isReady && router?.query?.viewState ) {
      if ( router?.query?.viewState === "DISCUSS" ) {
        setViewState( "DISCUSS" );
        // handleViewState("DISCUSS")
      }
    }
  }, [ router?.query?.goalId, router?.query?.viewState, router.isReady ] );

  const getUserGoals = useCallback( async () => {
    if ( userId && programId ) {
      try {
        setGoalsLoading( true );
        // //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        console.log( userId, programId, "GET USER GOALS ID" );
        const response = await fetchGoalsInProgress( {
          userId,
          programId,
        } );
        //@ts-ignore
        console.log( response?.inProgressGoals, "   fetchGoalsInProgress" );
        //@ts-ignore
        if ( response?.inProgressGoals ) {
          //@ts-ignore
          setGoals( response?.inProgressGoals );
          //@ts-ignore
          if ( response?.inProgressGoals?.length ) {
            //@ts-ignore
            // setSelectedGoal(response?.inProgressGoals[0]);
          }
        }
        setGoalsLoading( false );
      } catch ( error ) {
        setGoalsLoading( false );
        console.log( error );
      }
    }
  }, [ programId, userId, change ] );

  const getPreviousGoals = useCallback( async () => {
    if ( userId && programId ) {
      try {
        setPreviousGoalsLoading( true );
        const response = await fetchPreviousGoals( {
          userId,
          programId,
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
        setGoalsLoading( false );
      } catch ( error ) {
        setGoalsLoading( false );
        console.log( error );
      }
    }
  }, [ userId, programId ] );

  useEffect( () => {
    const getAllGoals = async () => {
      await setUserIdAndProgramId();
      await getUserGoals();
      await getPreviousGoals();
    };
    getAllGoals();
  }, [ getPreviousGoals, getUserGoals, setUserIdAndProgramId ] );

  useEffect( () => {
    const getMilestonesData = async () => {
      try {
        setMilestonesDataLoading( true );
        // //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        if ( selectedGoal ) {
          const response = await fetchUserGoalMilestone( {
            userId,
            programId,
            userGoalId: selectedGoal?.id,
          } );
          //@ts-ignore
          if ( response?.userGoalMilestone ) {
            //@ts-ignore
            setSelectedGoalMilestones( response?.userGoalMilestone );
          }
        }
        setMilestonesDataLoading( false );
      } catch ( error ) {
        setMilestonesDataLoading( false );
        console.log( error );
      }
    };
    getMilestonesData();
  }, [ selectedGoal, change ] );

  useEffect( () => {
    const getConceptPrimerFromURLParams = async () => {
      if ( router?.query?.contentId && router?.query?.title ) {
        const title = router?.query?.title;
        const response: any = await fetchConceptPrimerByContentId( {
          contentId: router?.query?.contentId,
          userId: user?.id,
          programId: user?.activeProgramId,
        } );

        //@ts-ignore // TODO Sateesh fix title for IFrame over route params (action center)
        setIFrameTitle( title );
        //   setIFrameLink(supportingMethod?.contentLink);
        setIFrameLink( response?.contentLink );
        setMediaType( response?.mediaType )
        setViewState( ACHIEVE_VIEW_STATES.IFRAME );
        // handleViewState(ACHIEVE_VIEW_STATES.IFRAME)
      }
      console.log( "concept primer" );
    };
    getConceptPrimerFromURLParams();
  }, [
    router.isReady,
    router?.query?.contentId,
    router?.query?.title,
    user?.activeProgramId,
    user?.id,
  ] );

  // useEffect(() => {
  //   if (router?.query?.goalId && (goals?.length || previousGoals?.length)) {
  //     const availableGoals = [...goals, ...previousGoals];
  //     const goalPassedOverRouteParams: any = availableGoals?.filter(
  //       (goal: any) => goal?.id === router?.query?.goalId
  //     );
  //     console.log("goal passed over route params", goalPassedOverRouteParams);

  //     if (goalPassedOverRouteParams?.length) {
  //       console.log("goal passed over route params", goalPassedOverRouteParams);
  //       if (
  //         goalPassedOverRouteParams?.[0]?.status?.toLowerCase() === "completed"
  //       ) {
  //         setCompletedActiveId(completedActiveId);
  //         setTabName("Completed");
  //       } else {
  //         setProgressActiveId(progressActiveId);
  //         setTabName("InProgress");
  //       }
  //       setSelectedGoal(goalPassedOverRouteParams[0]);
  //     }
  //   }
  // }, [router?.query?.goalId]);

  useEffect( () => {
    // TODO CHECK FOR ROUTER QUERY PARAMS AND FIX
    console.log( router?.query?.goalId, "123456 router query" );
    if ( router.isReady ) {
      // const goalId = getRouterParamFromAsPath("goalId", router?.asPath);
      if ( goalIdFromQuery ) {
        if ( goalIdFromQuery && ( goals?.length || previousGoals?.length ) ) {
          const availableGoals = [ ...goals, ...previousGoals ];

          const goalPassedOverRouteParams: any = availableGoals?.filter(
            ( goal: any ) => goal?.id === goalIdFromQuery
          );

          console.log(
            "123456 goal passed over route params",
            goalPassedOverRouteParams
          );

          if ( goalPassedOverRouteParams?.length ) {
            console.log( goalPassedOverRouteParams?.[ 0 ]?.id, " passed id found" );
            setSelectedGoal( goalPassedOverRouteParams?.[ 0 ] );
            if (
              goalPassedOverRouteParams?.[ 0 ]?.status?.toLowerCase() ===
              "completed"
            ) {
              console.log( "123456 it is completed" );
              setTabName( "Completed" );
            } else {
              console.log( "123456 it is not completed" );
              setTabName( "InProgress" );
            }
            return;
          }
        }
      } else {
        console.log( "in else" );
        if ( goals?.length && !selectedGoal ) {
          setSelectedGoal( goals[ 0 ] );
          setTabName( "InProgress" );
        }
      }
    }
  }, [ goals, previousGoals, goalIdFromQuery, router.isReady, change ] );

  const tabSwitch = ( event: any, newValue: any ) => {
    setTabName( newValue );
    if ( newValue === "InProgress" ) {
      setSelectedGoal( goals[ 0 ] );
      setProgressActiveId( progressActiveId );
    } else {
      setSelectedGoal( previousGoals[ 0 ] );
      setCompletedActiveId( completedActiveId );
    }
  };

  const showMilestones = ( clickedId: any, clickedEvent: any ) => {
    if ( clickedEvent === "taskInprogress" ) {
      setProgressActiveId( clickedId );
    } else {
      setCompletedActiveId( clickedId );
    }
  };

  const viewGoal = () => {
    setViewPurpose( true );
    popUpName = "viewEmployeeGoal";
  };

  const openPopup = ( value: any ) => {
    setViewPurpose( false );
  };

  const closePopup = ( value: any ) => {
    setViewPurpose( value );
  };

  const getIFrame = () => {
    setViewState( ACHIEVE_VIEW_STATES.IFRAME );
    // handleViewState(ACHIEVE_VIEW_STATES.IFRAME)
  };

  console.log( selectedGoal, "ufgksjfbdsnfsarkjsfhsvrhdskf=skj" );
  //   useEffect(() => {
  //     var elements = document.getElementsByClassName("achieve_accordion");
  //     //@ts-ignore
  //     if (elements !== "") {
  //       if (
  //         //@ts-ignore
  //         elements[0].firstElementChild.attributes.sheet_status.value === "new" ||
  //         //@ts-ignore
  //         elements[0].firstElementChild.attributes.sheet_status.value ===
  //           "pending"
  //       ) {
  //         toggleAccordion(
  //           //@ts-ignore
  //           parseInt(elements[0].firstElementChild.id),
  //           "taskInprogress"
  //         );
  //       }
  //     }
  //   }, []);

  // useEffect(() => {
  //   if (tabName === "InProgress") {
  //     setSelectedGoal(goals[0]);
  //   }
  //   if (tabName === "Completed") {
  //     setSelectedGoal(previousGoals[0]);
  //   }
  // }, [tabName]);

  // FETCH EMPLOYEE DETAILS
  useEffect( () => {
    const fetchNworxUser = async () => {
      try {
        if ( employeeEmail ) {
          const response = await getNworxUser( employeeEmail );
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
  }, [ employeeEmail, router?.isReady ] );

  return (
    <>
      { isManager ? (
        <>
          <UserDetails
            employeeData={ employeeData }
            viewState={ viewState }
            setViewState={ setViewState }
          />
          <br />
        </>
      ) : null }
      { viewState === ACHIEVE_VIEW_STATES.IFRAME ? (
        <>
          <Stack
            flexDirection="row"
            alignItems="center"
            gap="15px"
            justifyContent="space-between"
            mb="24px"
          >
            <Stack flexDirection="row" alignItems="center" gap="20px">
              <Typography
                //@ts-ignore
                variant="span"
                sx={ {
                  fontWeight: "500",
                  color: "#2D3648",
                  cursor: "pointer",
                } }
                className="go_back_flex"
                onClick={ () => { setViewState( ACHIEVE_VIEW_STATES.MILESTONE ) } }
              >
                <ChevronLeftIcon />
              </Typography>
              <Typography
                sx={ {
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#2D3648",
                } }
              >
                { showIFrameTitle ? showIFrameTitle : "" }
              </Typography>
            </Stack>
            {/* <Stack
              flexDirection="row"
              alignItems="center"
              gap="8px"
              sx={{ cursor: "pointer" }}
              onClick={() => setViewState(ACHIEVE_VIEW_STATES.DISCUSS)}
            >
              <img
                src="/images/icons/guidance.png"
                alt="guidance"
                width={16}
                height={20}
              ></img>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#2E5DB0",
                }}
              >
                Discuss
              </Typography>
            </Stack> */}
          </Stack>
          <Box>
            { mediaType !== null && mediaType !== undefined && mediaType === "video" ? (
              <VideoPlayer link={ iFrameLink } />
            ) : (
              <iframe
                style={ { width: "100%", height: "68vh" } }
                id="frame"
                src={ iFrameLink }
                name="extrnlCntnt"
                title="external content"
              ></iframe>
            ) }
          </Box>
        </>
      ) : viewState === ACHIEVE_VIEW_STATES.RECENT_ACTIVITY ? (
        <>
          { " " }
          <Stack
            flexDirection="row"
            alignItems="center"
            gap="15px"
            justifyContent="space-between"
            mb="24px"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              onClick={ () => { setViewState( ACHIEVE_VIEW_STATES.MILESTONE ) } }
              sx={ { cursor: "pointer" } }
            >
              <Typography
                //@ts-ignore
                variant="span"
                sx={ {
                  fontWeight: "500",
                  color: "#2D3648",
                  cursor: "pointer",
                } }
                className="go_back_flex"
              >
                <ChevronLeftIcon />
              </Typography>
              <Typography
                sx={ {
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#2D3648",
                } }
              >
                Go Back
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <PreviousActivity
              userId={ router?.query?.userId }
              programId={ router?.query?.programId }
              name={ employeeData?.name }
            />
          </Box>
        </>
      ) : viewState === ACHIEVE_VIEW_STATES.MILESTONE ? (
        <>
          <Stack className="achieve_flex tab" flexDirection="row" gap="16px">
            <Box className="achieve_left_box">
              <Box className="achieve_tab_box">
                <Tabs
                  value={ tabName }
                  onChange={ tabSwitch }
                  centered
                  className="achieve_tabs"
                >
                  <Tab
                    value="InProgress"
                    label="In Progress"
                    onClick={ () => setTabName( "InProgress" ) }
                  />
                  <Tab
                    value="Completed"
                    label="Completed"
                    onClick={ () => setTabName( "Completed" ) }
                  />
                </Tabs>
              </Box>
              <Box>
                { tabName === "InProgress" ? (
                  <>
                    { goalsLoading ? (
                      <Spinner />
                    ) : (
                      goals &&
                      goals.map( ( goal, index ) => (
                        <div
                          key={ index }
                          onClick={ () => {
                            //@ts-ignore
                            console.log( "clicked", goal?.name );
                            setSelectedGoal( goal );
                            if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
                              logUserEngagement( {
                                userId: user?.id,
                                //@ts-ignore
                                goalId: goal?.id,
                                programId: user?.activeProgramId,
                                type: "curiosity",
                                action: "employee_clicked_goal",
                                //@ts-ignore
                                contentName: goal?.name,
                                contentId: "NA",
                                milestoneId: "NA",
                                marks: 2,
                              } );
                            }
                          } }
                        >
                          <AchieveGoals
                            //@ts-ignore
                            key={ goal.id }
                            achieve={ goal }
                            index={ index }
                            goalActiveId={ selectedGoal?.id }
                            showMilestones={ showMilestones }
                          />
                        </div>
                      ) )
                    ) }
                  </>
                ) : tabName === "Completed" ? (
                  previousGoals.map( ( goal, index ) => (
                    <div
                      key={ index }
                      onClick={ () => {
                        //@ts-ignore
                        console.log( "clicked", goal?.name );
                        setSelectedGoal( goal );
                      } }
                    >
                      <AchieveGoals
                        //@ts-ignore
                        key={ goal?.id }
                        achieve={ goal }
                        index={ index }
                        goalActiveId={ selectedGoal?.id }
                        showMilestones={ showMilestones }
                        onClick={ () => setSelectedGoal( goal ) }
                      />
                    </div>
                  ) )
                ) : (
                  ""
                ) }
              </Box>
            </Box>

            { selectedGoal ? (
              <Box className="achieve_right_box">
                <Box sx={ { padding: "24px 16px" } }>
                  <Typography
                    variant="h2"
                    sx={ { color: "#3E4248", fontWeight: "600" } }
                    className="achieve_right_title"
                  >
                    { selectedGoal?.nameAlias
                      ? selectedGoal?.nameAlias
                      : selectedGoal?.name }
                  </Typography>
                  <Box sx={ { padding: "0 0 24px" } }>
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap="15px"
                      sx={ { margin: "12px 0" } }
                    >
                      <Stack flexDirection="row" gap="15px" alignItems="center">
                        <Typography
                          sx={ {
                            color: "#2E5DB0",
                            fontWeight: "500",
                            fontSize: "12px",
                            cursor: "pointer",
                          } }
                          onClick={ () => viewGoal() }
                        >
                          View Goal Details
                        </Typography>
                        { viewState !== ACHIEVE_VIEW_STATES.DISCUSS ? (
                          <Stack
                            flexDirection="row"
                            gap="5px"
                            alignItems="center"
                            sx={ { cursor: "pointer" } }
                            onClick={ () => {
                              {
                                setViewState( ACHIEVE_VIEW_STATES.DISCUSS )
                              }
                            }
                            }
                          >
                            <img
                              alt="guidance"
                              src="/images/guidance.png"
                              width={ 16 }
                              height={ 20 }
                            ></img>
                            {/* discuss change here */ }
                            <Typography
                              sx={ {
                                fontSize: "12px",
                                color: "#2E5DB0",
                                fontWeight: "500",
                              } }
                            >
                              Discuss
                            </Typography>
                          </Stack>
                        ) : null }
                      </Stack>
                      { !selectedGoal?.onStart && <Typography
                        sx={ {
                          color: "#989EA5",
                          fontWeight: "400",
                          fontSize: "12px",
                        } }
                      >
                        {/* {`${
                        selectedGoal?.addedByRole === "MANAGER"
                          ? "Assigned"
                          : "Approved"
                      } by ${
                        selectedGoal?.addedByRole === "MANAGER"
                          ? selectedGoal?.addedBy
                          : selectedGoal?.approvedBy || ""
                      }`} */}
                        Selected by { selectedGoal?.addedBy }
                      </Typography> }
                    </Stack>
                    <Stack
                      flexDirection="row"
                      sx={ {
                        gap: "24px",
                        borderRadius: "8px",
                        border: "1px dashed #C8CDD4",
                        padding: "16px",
                      } }
                    >
                      {/*{program?.configMap.enableAlign ? (
                        <Box sx={{ width: "100%" }}>
                          <Stack
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              sx={ { color: "#5D636B", fontWeight: "500" } }
                              className="progress_left_label"
                            >
                              Alignment on this goal
                            </Typography>
                            <Typography
                              sx={ {
                                color:
                                  selectedGoal?.alignmentScore < 40
                                    ? "#EE4412"
                                    : selectedGoal?.alignmentScore > 80
                                      ? "#21C262"
                                      : "#F2D56C",
                                fontWeight: "500",
                                fontSize: "12px",
                              } }
                              className="progress_right_label"
                            >
                              { selectedGoal?.alignmentScore }%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={ selectedGoal?.alignmentScore || 0 }
                            sx={ {
                              height: "8px",
                              borderRadius: "16px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  selectedGoal?.alignmentScore < 40
                                    ? "#EE4412"
                                    : selectedGoal?.alignmentScore > 80
                                      ? "#21C262"
                                      : "#F2D56C",
                              },
                              margin: "8px 0 16px",
                            } }
                          />
                          { tabName === "InProgress" ? (
                            <Typography
                              align="right"
                              sx={ {
                                color: "#2E5DB0",
                                fontWeight: "600",
                                fontSize: "12px",
                                cursor: "pointer",
                                width: "fit-content",
                                marginLeft: "auto",
                              } }
                              onClick={ () => {
                                setShowGoalOverview( true );
                              } }
                            >
                              Align further
                            </Typography>
                          ) : (
                            ""
                          ) }
                        </Box>
                      ) : null}*/}
                      <Box sx={ { width: "100%" } }>
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            sx={ { color: "#5D636B", fontWeight: "500" } }
                            className="progress_left_label"
                          >
                            Progress on this goal
                          </Typography>
                          <Typography
                            sx={ {
                              color:
                                selectedGoal?.goalAchieveScore < 40
                                  ? "#EE4412"
                                  : selectedGoal?.goalAchieveScore > 80
                                    ? "#21C262"
                                    : "#F2D56C",
                              fontWeight: "500",
                              fontSize: "12px",
                            } }
                            className="progress_right_label"
                          >
                            { selectedGoal?.goalAchieveScore }%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={ selectedGoal?.goalAchieveScore || 0 }
                          sx={ {
                            height: "8px",
                            borderRadius: "16px",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                selectedGoal?.goalAchieveScore < 40
                                  ? "#EE4412"
                                  : selectedGoal?.goalAchieveScore > 80
                                    ? "#21C262"
                                    : "#F2D56C",
                            },
                            margin: "8px 0 16px",
                          } }
                        />
                        { currentUserRole === MANAGER_VIEW_STATE.LP &&
                          program?.configMap.enableMra ? (
                          <Typography
                            onClick={ () => {
                              router.push( "/analyze", {
                                pathname: "/analyze",
                              } );
                            } }
                            align="right"
                            sx={ {
                              color: "#2E5DB0",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: "pointer",
                              width: "fit-content",
                              marginLeft: "auto",
                            } }
                          >
                            Seek Feedback
                          </Typography>
                        ) : null }
                      </Box>
                      {/* <Box sx={{ width: "100%" }}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{ color: "#5D636B", fontWeight: "500" }}
                className="progress_left_label"
              >
                Analyze
              </Typography>
              <Typography
                sx={{
                  color:
                    selectedGoal?.goalAssureScore < 40
                      ? "#EE4412"
                      : selectedGoal?.goalAssureScore > 80
                      ? "#21C262"
                      : "#F2D56C",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                className="progress_right_label"
              >
                {selectedGoal?.goalAssureScore}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={selectedGoal?.goalAssureScore || 0}
              sx={{
                height: "8px",
                borderRadius: "16px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    selectedGoal?.goalAssureScore < 40
                      ? "#EE4412"
                      : selectedGoal?.goalAssureScore > 80
                      ? "#21C262"
                      : "#F2D56C",
                },
                margin: "8px 0 16px",
              }}
            />
            <Typography
              align="right"
              sx={{
                color: "#2E5DB0",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                width: "fit-content",
                marginLeft: "auto",
              }}
            >
              {selectedGoal?.goalAssureScore > 0
                ? "Seek Feedback"
                : "Not yet Started"}
            </Typography>
          </Box> */}
                    </Stack>
                  </Box>
                  { milestonesDataLoading ? (
                    <Spinner />
                  ) : selectedGoal ? (
                    <Milestones
                      handleChange={ handleChange }
                      tabName={ tabName }
                      viewGoal={ viewGoal }
                      getIFrame={ getIFrame }
                      selectedGoal={ selectedGoal }
                      selectedGoalMilestones={ selectedGoalMilestones }
                      setIFrameLink={ setIFrameLink }
                      setMediaType={ setMediaType }
                      setIFrameTitle={ setIFrameTitle }
                      goal={ selectedGoal }
                      employeeData={ employeeData }
                      viewState={ viewState }
                      setViewState={ setViewState }
                    />
                  ) : tabName === "Completed" ? (
                    <div>
                      <p style={ { textAlign: "center" } }>
                        No goals have been completed. Complete your first goal.
                      </p>
                    </div>
                  ) : tabName === "InProgress" ? (
                    <div>
                      <p style={ { textAlign: "center" } }>
                        No goals are in progress.
                      </p>
                    </div>
                  ) : null }
                </Box>
              </Box>
            ) : (
              <Box className="achieve_right_box">
                { " " }
                <div>
                  <p style={ { textAlign: "center" } }>
                    <Typography
                      variant="h2"
                      sx={ {
                        color: "#3E4248",
                        marginTop: 35,
                        fontWeight: "600",
                      } }
                      className="achieve_right_title"
                    >
                      { tabName === "InProgress"
                        ? "No goals are in progress."
                        : "No goals have been completed. Complete your first goal." }
                    </Typography>{ " " }
                  </p>
                </div>
              </Box>
            ) }
            {/* <Box sx={{ padding: "24px 16px" }}></Box> */ }
          </Stack>
        </>
      ) : viewState === ACHIEVE_VIEW_STATES.DISCUSS ? (
        <>
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={ { marginBottom: "16px", cursor: "pointer" } }
            onClick={ () => { setViewState( ACHIEVE_VIEW_STATES.MILESTONE ) } }
          >
            <Typography
              //@ts-ignore
              variant="span"
              sx={ {
                fontWeight: "500",
                color: "#2D3648",
                cursor: "pointer",
              } }
              className="go_back_flex"
            >
              <ChevronLeftIcon />
            </Typography>
            <Typography
              sx={ {
                fontSize: "16px",
                fontWeight: "500",
                color: "#2D3648",
              } }
            >
              Go Back
            </Typography>
          </Stack>
          <Stack className="achieve_flex tab" flexDirection="row" gap="16px">
            <Box className="achieve_right_box">
              <Box sx={ { padding: "24px 16px" } }>
                <Typography
                  variant="h2"
                  sx={ { color: "#3E4248", fontWeight: "600" } }
                  className="achieve_right_title"
                >
                  { selectedGoal?.nameAlias
                    ? selectedGoal?.nameAlias
                    : selectedGoal?.name }
                </Typography>
                { milestonesDataLoading ? (
                  <Spinner />
                ) : selectedGoal ? (
                  <Milestones
                    handleChange={ handleChange }
                    tabName={ tabName }
                    viewGoal={ viewGoal }
                    getIFrame={ getIFrame }
                    selectedGoal={ selectedGoal }
                    selectedGoalMilestones={ selectedGoalMilestones }
                    setIFrameLink={ setIFrameLink }
                    setMediaType={ setMediaType }
                    setIFrameTitle={ setIFrameTitle }
                    goal={ selectedGoal }
                    employeeData={ employeeData }
                    viewState={ viewState }
                    setViewState={ setViewState }
                  />
                ) : tabName === "Completed" ? (
                  <div>
                    <p style={ { textAlign: "center" } }>
                      No goals have been completed. Complete your first goal.
                    </p>
                  </div>
                ) : tabName === "InProgress" ? (
                  <div>
                    <p style={ { textAlign: "center" } }>
                      No goals are in progress.
                    </p>
                  </div>
                ) : null }
              </Box>
            </Box>
            <Box className="achieve_left_box discuss_resp">
              <PostsSection
                type={ "ACHIEVE" }
                goal={ selectedGoal }
                // showAskQuestion={showAskQuestion}
                // reportee={reportee}
                // fetchDirectReports={fetchDirectReports}
                // setShowGoalOverview={setShowGoalOverview}
                // userWorkSheetId={userWorkSheetId}
                // reportee={reportee}
                reportee={ employeeData }
              />
            </Box>
          </Stack>
        </>
      ) : null }
      <ViewPurpose
        openPopup={ openPopup }
        closePopup={ closePopup }
        open={ { showViewPurpose, popUpName } }
        goal={ selectedGoal }
        reporteeProgramId={ employeeData?.activeProgramId }

      />
      <GoalOverviewModal
        goal={ selectedGoal }
        showGoalOverview={ showGoalOverview }
        setShowGoalOverview={ setShowGoalOverview }
        showAskQuestion={ false }
        type={ "ALIGN" }
        dontShowChat={ false }
        reportee={ employeeData }
      />
    </>
  );
};
export default EmployeeAchieve;
