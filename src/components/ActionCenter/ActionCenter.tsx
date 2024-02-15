import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Tooltip,
  Divider,
  Button,
  LinearProgress,
  Collapse,
} from "@mui/material";
import { useEffect, useState } from "react";
//@ts-ignore
import UAParser from 'ua-parser-js';
import "react-circular-progressbar/dist/styles.css";
import Graph from "../common/Graph/Graph";
import HorizontalBarGraph from "../common/HorizontalBarGraph/HorizontalBarGraph";
import Link from "next/link";
import { fetchUserProgram } from "../../actions/achieve/fetchUserProgram";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoalsInProgress } from "../../actions/achieve/fetchGoalsInProgress";
import { fetchUserActions } from "../../actions/actionCenter/fetchUserActions";
import { fetchUserActivity } from "../../actions/actionCenter/fetchUserActivity";
import { fetchTeamScore } from "../../actions/actionCenter/fetchTeamScore";
import { getUserProgram } from "../../actions/achieve/fetchUserProgram";
import { useRouter } from "next/router";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import { updateUserActionToRead } from "../../actions/actionCenter/updateUserActionToRead";
import { fetchProgressTracker } from "../../actions/HULActionCenter/fetchProgressTracker";
import Spinner from "../common/Spinner/Spinner";
import { updateReport } from "../../actions/user/onboardNworxUser";

const drawerWidth = 250;

const ActionCenter = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const getDate = ( d: any ) => {
    const date = new Date( d );
    const day = date.getDate().toString().padStart( 2, '0' );
    const month = date.toLocaleString( 'en-US', { month: 'short' } );
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart( 2, '0' );
    const minutes = date.getMinutes().toString().padStart( 2, '0' );
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${ day } ${ month } ${ year }`;
    return formattedDate;
  };
  const [ open, setOpen ] = useState( "" );
  const [ showData, setData ] = useState<any>( "" );
  const [ userProgram, setUserProgram ] = useState<any>( null );
  const [ goalsLoading, setGoalsLoading ] = useState( false );
  const [ goals, setGoals ] = useState<any>( [] );
  const [ userActvity, setUserActivity ] = useState<any>( null );
  const [ userActions, setUserActions ] = useState<any>( null );
  const [ alignUnreadCount, setAlignUnreadCount ] = useState<any>( 0 );
  const [ achieveUnreadCount, setAchieveUnreadCount ] = useState<any>( 0 );
  const [ teamScore, setTeamScore ] = useState( null );
  const router = useRouter();
  const [ viewPending, setPending ] = useState<any>( false );
  const [ viewInProgress, setInProgress ] = useState<any>( false );
  const [ viewCompleted, setCompleted ] = useState<any>( false );
  const [ pendingMileStone, setPendingMileStone ] = useState<any>( null );
  const [ pendingVisible, setPendingVisible ] = useState<any>( 4 );
  const [ inProgressMileStone, setInProgressMileStone ] = useState<any>( null );
  const [ inProgresVisible, setInProgressVisible ] = useState<any>( 4 );
  const [ completedMileStone, setCompletedMileStone ] = useState<any>( null );
  const [ completedVisible, setCompletedVisible ] = useState<any>( 4 );
  const [ progressSpinner, setProgressSpinner ] = useState<any>( false );
  // const [showPrivacyPolicyModal, setPrivacyPolicyModal] = useState<any>(false);

  // const closePrivacyPolicyModal = (value: any) => {
  //   setPrivacyPolicyModal(value);
  // }

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  useEffect( () => {
    const getTeamScore = async () => {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })

        const response = await fetchTeamScore( {
          managerId: user?.id,
          role: currentUserRole,
        } );
        console.log( response );
        //@ts-ignore
        if ( response ) {
          //@ts-ignore
          setTeamScore( response?.teamScore );
        }
      } catch ( error ) {
        console.error( error, " ERROR getTeamScore" );
      }
    };
    getTeamScore();
  }, [] );

  useEffect( () => {
    const fetchUserProgram = async () => {
      try {
        const response = await getUserProgram( {
          userId: user?.id,
          programId: user?.activeProgramId,
        } );
        //@ts-ignore
        if ( response?.userProgram ) {
          //@ts-ignore
          setUserProgram( response?.userProgram );
        }
      } catch ( error ) {
        console.error( error, " ERROR getUserProgram" );
      }
    };

    fetchUserProgram();
  }, [] );
  useEffect( () => {
    if (
      !program?.configMap.enableAlign &&
      ( currentUserRole == MANAGER_VIEW_STATE.LP ||
        currentUserRole == MANAGER_VIEW_STATE.MANAGER )
    ) {
      setData( "Achieve" );
    } else {
      setData( "Align" )
    }
  }, [ program ] )
  // FETCH USER GOALS
  useEffect( () => {
    const getUserGoals = async () => {
      try {
        setGoalsLoading( true );
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });

        const response = await fetchGoalsInProgress( {
          userId: user.id,
          programId: user.activeProgramId,
        } );
        //@ts-ignore
        //@ts-ignore
        if ( response?.inProgressGoals ) {
          //@ts-ignore
          setGoals( response?.inProgressGoals );
        }
        setGoalsLoading( false );
      } catch ( error ) {
        setGoalsLoading( false );
        console.error( error, " ERROR getUserGoals" );
      }
    };
    getUserGoals();
  }, [] );

  // FETCH USER ACTIONS
  useEffect( () => {
    const getUserActions = async () => {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });

        const response = await fetchUserActions( {
          userId: user?.id,
          programId: user?.activeProgramId,
        } );

        //@ts-ignore
        if ( response?.userActions ) {
          //@ts-ignore
          setUserActions( response?.userActions );
          //@ts-ignore
          const alignUnreadCount = response?.userActions?.filter(
            ( action: any ) => action.actionType === "Align" && action.unRead
          );
          setAlignUnreadCount( alignUnreadCount?.length );
          //@ts-ignore
          const achieveUnreadCount = response?.userActions?.filter(
            ( action: any ) =>
              ( action.actionType === "Achieve" ||
                action.actionType === "Alert" ) &&
              action.unRead
          );
          setAchieveUnreadCount( achieveUnreadCount?.length );
        }
      } catch ( error ) {
        console.error( error, " ERROR getUserActions" );
      }
    };
    getUserActions();
  }, [] );

  const filteredAction = userActions?.filter( ( userAction: any ) =>
    showData === "Achieve"
      ? ( userAction?.actionType === showData ||
        userAction?.actionType === "Alert" ) &&
      userAction?.role === "SELF" &&
      userAction?.show
      : userAction?.actionType === showData &&
      userAction?.role === "SELF" &&
      userAction?.show
  );

  //fetch userProgressbar Deatils

  useEffect( () => {
    const getfetchProgressTracker = async () => {
      setProgressSpinner( true );
      const response = await fetchProgressTracker( {
        userId: user?.id,
        programId: user?.activeProgramId,
      } );
      if ( response ) {
        //@ts-ignore
        setPendingMileStone( response?.pending );
        //@ts-ignore
        setInProgressMileStone( response?.inProgress );
        //@ts-ignore
        setCompletedMileStone( response?.completed );
        setProgressSpinner( false );
      }

    };
    if ( program?.configMap.hasOwnProperty( "enableProgressTracker" ) && program?.configMap?.enableProgressTracker ) {
      getfetchProgressTracker();
    }
  }, [ router?.isReady ] );
  const userAgentString = window.navigator.userAgent;
  const parser = new UAParser( userAgentString );
  const result = parser.getResult();
  useEffect( () => {
    const updateDevice = () => {
      const updateObject = {
        //@ts-ignore
        id: user.id,
        lastSignInTime: new Date().getTime(),
        lastUsedDeviceType: result.device.type,
        lastUsedDeviceModel: result.os.name,
        lastUsedBrowser: result.browser.name,
        lastUsedPlatform: result.os.name,
      };
      //@ts-ignore
      dispatch( updateReport( updateObject ) );
    }
    updateDevice();

  }, [] )
  // console.log(user,"hdfbkdsfkbf");
  // FETCH USER ACTIVITY
  useEffect( () => {
    console.log( "getUserActivity called" );
    const getUserActivity = async () => {
      try {
        console.log( "SELF CHECK", user?.id, user?.activeProgramId );
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });

        const response = await fetchUserActivity( {
          userId: user?.id,
          programId: user?.activeProgramId,
        } );
        console.log( "getUserActivity response?.userActivity ", response );
        //@ts-ignore
        if ( response?.userActivity ) {
          //@ts-ignore
          setUserActivity( response?.userActivity );
        }
      } catch ( error ) {
        console.error( error, " ERROR getUserActivity" );
      }
    };
    getUserActivity();
  }, [] );

  const handleTooltipOpen = ( value: any ) => {
    setOpen(
      value === "overallAlign" ||
        value === "overallAchieve" ||
        value === "progressTracker"
        ? value
        : false
    );
  };

  const handleTooltipClose = () => {
    //@ts-ignore
    setOpen( false );
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPrivacyPolicyModal(true);
  //   }, 1000);
  // }, []);

  const handleUnreadClick = async ( action: any ) => {
    //@ts-ignore
    await updateUserActionToRead( action );
    return;
  };

  function routeToAddGoalsPage (): void {
    router.push( {
      pathname: "/align/add-goal/",
    } );
  }
  function routeToAchievePage (): void {
    router.push( {
      pathname: "/achieve/",
    } );
  }
  console.log( goals, "user goals" );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Action Center</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box
          sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }
          className="mngr_action_center"
        >
          <Typography
            variant="h1"
            sx={ { fontWeight: "700", color: "#1C2129", marginBottom: "24px" } }
            className="dash_title"
          >
            Action Center
          </Typography>
          { showData && <Stack className="emp_actcntr_top_flex">
            <Box className="mngr_actcntr_tplft_flex">
              <Stack className="mngr_actcntr_tab_flex">
                { program?.configMap.enableProgressTracker && (
                  <Box
                    className={
                      showData === "progressTracker"
                        ? "action_center_box overall_align"
                        : "action_center_box overall_align no_bg"
                    }
                    onClick={ () => setData( "progressTracker" ) }
                  >
                    <Stack className="action_inner_flex">
                      <Box>
                        <Typography className="action_title prog_trckr_title">
                          Progress Tracker
                        </Typography>
                      </Box>
                      <Box className="tooltip_box">
                        <Tooltip
                          open={ open === "progressTracker" }
                          onClose={ handleTooltipClose }
                          title="Your progress on the milestones of each goal"
                          arrow
                          disableTouchListener
                          placement="bottom-end"
                        >
                          <img
                            src="/images/more-info.png"
                            alt="more info"
                            width={ 22 }
                            height={ 22 }
                            style={ { cursor: "pointer" } }
                            onClick={ () => handleTooltipOpen( "progressTracker" ) }
                            onMouseEnter={ () =>
                              handleTooltipOpen( "progressTracker" )
                            }
                          />
                        </Tooltip>
                      </Box>
                    </Stack>
                  </Box>
                ) }
                { program?.configMap.enableAlign &&
                  ( currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER ) ? (
                  <Box
                    className={
                      showData === "Align"
                        ? "action_center_box overall_align"
                        : "action_center_box overall_align no_bg"
                    }
                    onClick={ () => setData( "Align" ) }
                  >
                    { alignUnreadCount ? (
                      <Box className="new_msg_badge">
                        <Typography className="badge_text">
                          { alignUnreadCount }
                        </Typography>
                      </Box>
                    ) : null }

                    <Stack className="action_inner_flex">
                      <Box>
                        <Typography className="action_title">
                          Goal setting
                        </Typography>

                      </Box>
                      {/*<Box className="tooltip_box">
                        <Tooltip
                          open={ open === "overallAchieve" }
                          onClose={ handleTooltipClose }
                          title="Your alignment with your manager across all chosen goals."
                          arrow
                          disableTouchListener
                          placement="bottom-end"
                        >
                          <img
                            src="/images/more-info.png"
                            alt="more info"
                            width={ 22 }
                            height={ 22 }
                            style={ { cursor: "pointer" } }
                            onClick={ () => handleTooltipOpen( "overallAchieve" ) }
                            onMouseEnter={ () =>
                              handleTooltipOpen( "overallAchieve" )
                            }
                          />
                        </Tooltip>
                      </Box>*/}
                    </Stack>

                    {/*<Box>
                      <Typography className="action_percentage">
                        {
                          //@ts-ignore
                          userProgram?.alignScore === 0 ? (
                            <span style={ { color: "#989EA5" } }>
                              { userProgram?.alignScore + "%" }
                            </span>
                          ) : userProgram?.alignScore ? (
                            userProgram?.alignScore + "%"
                          ) : (
                            "0%"
                          )
                        }
                      </Typography>
                    </Box>*/}
                  </Box>
                ) : null }
                <Box
                  className={
                    showData === "Achieve"
                      ? "action_center_box overall_achieve"
                      : "action_center_box overall_achieve no_bg"
                  }
                  onClick={ () => setData( "Achieve" ) }
                >
                  { achieveUnreadCount ? (
                    <Box className="new_msg_badge">
                      <Typography className="badge_text">
                        { achieveUnreadCount }
                      </Typography>
                    </Box>
                  ) : null }
                  <Stack className="action_inner_flex">
                    <Box>
                      <Typography className="action_title">
                        Overall Progress
                      </Typography>
                    </Box>
                    <Box className="tooltip_box">
                      <Tooltip
                        open={ open === "overallAlign" }
                        onClose={ handleTooltipClose }
                        title="Your progress on each goal."
                        arrow
                        disableTouchListener
                        placement="bottom-end"
                      >
                        <img
                          src="/images/more-info.png"
                          alt="more info"
                          width={ 22 }
                          height={ 22 }
                          style={ { cursor: "pointer" } }
                          onClick={ () => handleTooltipOpen( "overallAlign" ) }
                          onMouseEnter={ () => handleTooltipOpen( "overallAlign" ) }
                        />
                      </Tooltip>
                    </Box>

                  </Stack>
                  <Box>
                    <Typography className="action_percentage">
                      {
                        //@ts-ignore
                        userProgram?.achieveScore === 0 ? (
                          <span style={ { color: "#989EA5" } }>
                            { userProgram?.achieveScore + "%" }
                          </span>
                        ) : userProgram?.achieveScore ? (
                          userProgram?.achieveScore + "%"
                        ) : (
                          "0%"
                        )
                      }
                    </Typography>
                  </Box>

                </Box>
              </Stack>

              <Box className="mngr_actcntr_tplft_btmbx">
                { showData === "progressTracker" ? (
                  <Box className="prgtrckr_contr">
                    <Box className="prgtrckr_box_contr">
                      <Box className="prgtrckr_heading_box pendng">
                        <Typography className="prgtrckr_heading pendng">
                          Pending
                        </Typography>
                      </Box>
                      <Box className="prgtrckr_cntnt_contr">
                        <Stack className="prgtrckr_cntnt_flx">
                          <Box className="prgtrckr_top_cntnt">
                            <Typography className="prgtrckr_cntnt_hdng">
                              Milestones
                            </Typography>
                            { progressSpinner ? <Spinner /> : pendingMileStone &&
                              pendingMileStone?.length !== 0 ? (
                              pendingMileStone
                                ?.slice( 0, pendingVisible )
                                .map( ( milestone: any, index: any ) => {
                                  return (
                                    <Box
                                      className="prgtrckr_innr_contr"
                                      key={ index }
                                    >
                                      <Box className="prgtrckr_innr_cntnt_contr">
                                        <Typography className="prgtrckr_cntnt_title">
                                          { milestone?.milestoneName }
                                        </Typography>
                                        { new Date( milestone?.milestoneEndDate ).getFullYear() < 2100 && <Typography className="prgtrckr_cntnt_date_time">
                                          Ending on{ " " }
                                          { new Date(
                                            milestone?.milestoneEndDate
                                          ).toDateString() }
                                        </Typography> }
                                        { milestone?.goalName && <Typography className="prgtrckr_cntnt_descp">
                                          Goal - { milestone?.goalName }
                                        </Typography> }
                                      </Box>
                                      <Divider className="prgtrckr_hr" />
                                    </Box>
                                  );
                                } )
                            ) : (
                              <Box>
                                { " " }
                                <Typography className="prgtrckr_cntnt_date_time">
                                  No milestones pending
                                </Typography>
                              </Box>
                            ) }
                            {/* <Collapse in={viewPending} unmountOnExit>
                              <Box className="prgtrckr_innr_contr">
                                <Box className="prgtrckr_innr_cntnt_contr">
                                  <Typography className="prgtrckr_cntnt_title">
                                    Self Paced Video
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_date_time">
                                    Starting on 04th Aug 2023 at 05:00 pm
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_descp">
                                    Goal - Create a strategic network of
                                    relationship and goal title
                                  </Typography>
                                </Box>
                                <Divider className="prgtrckr_hr" />
                              </Box>
                            </Collapse> */}
                          </Box>
                          { pendingMileStone?.length > 4 && (
                            <Typography
                              className="prgtrckr_more_milestones"
                              onClick={ () =>
                                pendingVisible <= 4
                                  ? setPendingVisible( pendingMileStone?.length )
                                  : setPendingVisible( 4 )
                              }
                            >
                              View { pendingVisible > 4 ? "Less" : "More" }
                            </Typography>
                          ) }
                        </Stack>
                      </Box>
                    </Box>
                    <Box className="prgtrckr_box_contr">
                      <Box className="prgtrckr_heading_box inprog">
                        <Typography className="prgtrckr_heading inprog">
                          In Progress
                        </Typography>
                      </Box>
                      <Box className="prgtrckr_cntnt_contr">
                        <Stack className="prgtrckr_cntnt_flx">
                          <Box className="prgtrckr_top_cntnt">
                            <Typography className="prgtrckr_cntnt_hdng">
                              Milestones
                            </Typography>
                            { progressSpinner ? <Spinner /> : inProgressMileStone &&
                              inProgressMileStone?.length > 0 ? (
                              inProgressMileStone
                                ?.slice( 0, inProgresVisible )
                                ?.map( ( milestone: any, index: any ) => {
                                  return (
                                    <Box
                                      className="prgtrckr_innr_contr"
                                      key={ index }
                                    >
                                      <Box className="prgtrckr_innr_cntnt_contr">
                                        <Typography className="prgtrckr_cntnt_title">
                                          { milestone?.milestoneName }
                                        </Typography>
                                        { new Date( milestone?.milestoneEndDate ).getFullYear() < 2100 && <Typography className="prgtrckr_cntnt_date_time">
                                          Ending on{ " " }
                                          { new Date(
                                            milestone?.milestoneEndDate
                                          ).toLocaleDateString( 'en-GB' ) }
                                        </Typography> }
                                        <Typography className={ `prgtrckr_relt_stat ${ milestone?.resultStatus === "PASS" ? "kudos" : milestone?.resultStatus === "FAIL" ? "no_attempts_left" : "try_again" }` }>
                                          { milestone?.resultStatement }
                                        </Typography>
                                        <Typography className="prgtrckr_cntnt_descp">
                                          Goal - { milestone?.goalName }
                                        </Typography>
                                      </Box>
                                      <Divider className="prgtrckr_hr" />
                                    </Box>
                                  );
                                } )
                            ) : (
                              <Box>
                                { " " }
                                <Typography className="prgtrckr_cntnt_date_time">
                                  No milestones in progress
                                </Typography>
                              </Box>
                            ) }
                            {/* <Collapse in={viewInProgress} unmountOnExit>
                              <Box className="prgtrckr_innr_contr">
                                <Box className="prgtrckr_innr_cntnt_contr">
                                  <Typography className="prgtrckr_cntnt_title">
                                    Self Paced Video
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_date_time">
                                    Starting on 04th Aug 2023 at 05:00 pm
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_descp">
                                    Goal - Create a strategic network of
                                    relationship and goal title
                                  </Typography>
                                </Box>
                                <Divider className="prgtrckr_hr" />
                              </Box>
                            </Collapse> */}
                          </Box>
                          { inProgressMileStone?.length > 4 && (
                            <Typography
                              className="prgtrckr_more_milestones"
                              onClick={ () =>
                                inProgresVisible <= 4
                                  ? setInProgressVisible(
                                    inProgressMileStone?.length
                                  )
                                  : setInProgressVisible( 4 )
                              }
                            >
                              View { inProgresVisible > 4 ? "Less" : "More" }
                            </Typography>
                          ) }
                        </Stack>
                      </Box>
                    </Box>
                    <Box className="prgtrckr_box_contr">
                      <Box className="prgtrckr_heading_box compltd">
                        <Typography className="prgtrckr_heading compltd">
                          Completed
                        </Typography>
                      </Box>
                      <Box className="prgtrckr_cntnt_contr">
                        <Stack className="prgtrckr_cntnt_flx">
                          <Box className="prgtrckr_top_cntnt">
                            <Typography className="prgtrckr_cntnt_hdng">
                              Milestones
                            </Typography>
                            { progressSpinner ? <Spinner /> : completedMileStone &&
                              completedMileStone?.length !== 0 ? (
                              completedMileStone
                                ?.slice( 0, completedVisible )
                                ?.map( ( milestone: any, index: any ) => {
                                  return (
                                    <Box
                                      className="prgtrckr_innr_contr"
                                      key={ index }
                                    >
                                      <Box className="prgtrckr_innr_cntnt_contr">
                                        <Typography className="prgtrckr_cntnt_title">
                                          { milestone?.milestoneName }
                                        </Typography>
                                        { new Date( milestone?.milestoneEndDate ).getFullYear() < 2100 && <Typography className="prgtrckr_cntnt_date_time">
                                          { milestone?.status === "COMPLETED"
                                            ? "Completed on"
                                            : "Elapsed on" }{ " " }
                                          { getDate( milestone?.milestoneEndDate ) }
                                        </Typography> }
                                        <Typography className={ `prgtrckr_relt_stat ${ milestone?.resultStatus === "PASS" ? "kudos" : milestone?.resultStatus === "FAIL" ? "no_attempts_left" : "try_again" }` }>
                                          { milestone?.resultStatement }
                                        </Typography>
                                        <Typography className="prgtrckr_cntnt_descp">
                                          Goal - { milestone?.goalName }
                                        </Typography>
                                      </Box>
                                      <Divider className="prgtrckr_hr" />
                                    </Box>
                                  );
                                } )
                            ) : (
                              <Box>
                                { " " }
                                <Typography className="prgtrckr_cntnt_date_time">
                                  No milestones completed
                                </Typography>
                              </Box>
                            ) }

                            {/* <Collapse in={viewCompleted} unmountOnExit>
                              <Box className="prgtrckr_innr_contr">
                                <Box className="prgtrckr_innr_cntnt_contr">
                                  <Typography className="prgtrckr_cntnt_title">
                                    Self Paced Video
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_date_time">
                                    Starting on 04th Aug 2023 at 05:00 pm
                                  </Typography>
                                  <Typography className="prgtrckr_cntnt_descp">
                                    Goal - Create a strategic network of
                                    relationship and goal title
                                  </Typography>
                                </Box>
                                <Divider className="prgtrckr_hr" />
                              </Box>
                            </Collapse> */}
                          </Box>
                          { completedMileStone?.length > 4 && (
                            <Typography
                              className="prgtrckr_more_milestones"
                              onClick={ () =>
                                completedVisible <= 4
                                  ? setCompletedVisible(
                                    completedMileStone?.length
                                  )
                                  : setCompletedVisible( 4 )
                              }
                            >
                              View { completedVisible > 4 ? "Less" : "More" }
                            </Typography>
                          ) }
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className="action_center_box mngr_actcntr_msg_box"
                    sx={ {
                      height: "350px",
                      overflowX: "auto",
                      marginBottom: "16px",
                    } }
                  >
                    <Typography
                      className="action_title mngr_actcntr_msg_title"
                      sx={ { marginBottom: "20px" } }
                    >
                      { showData === "Align" ? "Call-to-action" : "Call-to-action" }
                    </Typography>
                    { userActions?.length ? (
                      filteredAction.length === 0 ? (
                        <Box className="no_action_box">
                          <img
                            src="/images/no-action.png"
                            alt="no action"
                            width={ 40 }
                            height={ 40 }
                          />
                          <Typography className="no_action_title">
                            You have no Action Items on your list
                          </Typography>
                          <Box className="button-container">
                            { goals?.length !== 0 && (
                              <Button
                                onClick={ routeToAchievePage }
                                className="standard_cta no_action_btn Act_btn"
                                style={ { cursor: "pointer" } }
                              >
                                Resume Goal
                              </Button>
                            ) }
                            <Button
                              onClick={ routeToAddGoalsPage }
                              className="standard_cta no_action_btn Act_btn"
                              style={ { cursor: "pointer" } }
                            >
                              Add Goal
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        filteredAction.map( ( userAction: any, index: number ) => {
                          return (
                            <Link
                              href={ userAction?.pageLink }
                              // as={userAction?.pageLink.substring(
                              //   0,
                              //   userAction?.pageLink?.indexOf("?")
                              // )}
                              key={ index }
                              onClick={ () =>
                                handleUnreadClick( userAction?.actionCompleteId )
                              }
                            >
                              <Box
                                className={ `action_drpdwn_inner ${ userAction?.unRead ? "new_msg" : null
                                  }` }
                                key={ index }
                              >
                                <Box
                                  sx={ {
                                    marginBottom: "12px",
                                    paddingRight: "30px",
                                  } }
                                >
                                  <Typography className="prev_act_title">
                                    { userAction?.statement }
                                  </Typography>
                                  { userAction?.goalStatemen && <Typography className="prev_act_subtitle">
                                    Goal - { userAction?.goalStatement }
                                  </Typography> }
                                </Box>
                                { userAction?.important && (
                                  <Box className="actn_cntr_impt_flag">
                                    <img
                                      src="/images/icons/important.svg"
                                      alt="Important"
                                      width={ 20 }
                                      height={ 20 }
                                    ></img>
                                  </Box>
                                ) }
                                <Stack className="take_action_box">
                                  <Stack className="take_action_flex">
                                    <Typography className="take_action_title">
                                      { userAction?.buttonLabel }
                                    </Typography>
                                    <img
                                      src="/images/review-action.png"
                                      alt="take action"
                                      width={ 15 }
                                      height={ 11 }
                                    ></img>
                                  </Stack>
                                  <Typography className="msg_elapsed_time">
                                    ({ userAction?.durationMins } mins)
                                  </Typography>
                                </Stack>
                              </Box>
                              <Divider sx={ { color: "#EAECEF" } } />
                            </Link>
                          );
                        } )
                      )
                    ) : (
                      <Box className="no_action_box">
                        <img
                          src="/images/no-action.png"
                          alt="no action"
                          width={ 40 }
                          height={ 40 }
                        ></img>
                        <Typography className="no_action_title">
                          You have no Action Items on your list
                        </Typography>
                        <Button
                          onClick={ routeToAddGoalsPage }
                          className="standard_cta no_action_btn"
                          style={ { cursor: "pointer" } }
                        >
                          Add Goal
                        </Button>
                      </Box>
                    ) }
                  </Box>
                ) }
                { showData === "progressTracker"
                  ? ""
                  : showData === "Achieve" && user?.primaryManagerUserId !== null && (
                    <Box className="mngr_actcntr_bargraph">
                      <Box className="mngr_bargraph_flex">
                        <Typography className="mngr_bargraph_title">
                          { showData === "Align" ? " Alignment" : " Progress" }
                        </Typography>
                        <Typography className="action_subtitle">
                          { showData === "Align"
                            ? "How much alignment have others gained?"
                            : "How much progress have others made?" }
                        </Typography>
                      </Box>
                      <Box>
                        <HorizontalBarGraph
                          teamScore={ teamScore }
                          showData={ showData }
                        />
                        {/* <Typography className='no_data'>No data found</Typography> */ }
                      </Box>
                    </Box>
                  ) }
              </Box>
            </Box>
            <Box className="mngr_actcntr_tprgt_flex">
              <Box
                className="action_center_box low_align"
                sx={ { height: "797px", overflowX: "auto" } }
              >
                <Typography
                  className="action_title prev_actvty"
                  sx={ { marginBottom: "20px" } }
                >
                  Your Previous Activity
                </Typography>
                { userActvity?.length ? (
                  userActvity
                    ?.filter( ( item: any ) => item?.role === "SELF" )
                    ?.map( ( item: any, index: number ) => {
                      return (
                        <>
                          <Link
                            href={ `${ item?.pageLink }` }
                            className="prev_actvty_link"
                            key={ index }
                          >
                            <Typography className="prev_act_title">
                              { item?.statement }
                            </Typography>
                          </Link>
                          <Divider
                            sx={ { color: "#EAECEF", margin: "12px 0" } }
                          />
                        </>
                      );
                    } )
                ) : (
                  <Typography className="no_data">No activity yet.</Typography>
                ) }
              </Box>
            </Box>
          </Stack> }
          {
            //@ts-ignore
            goals?.length ? (
              <Box className="action_center_bottom_box">
                <Typography className="achvmnt_prog_title">
                  Current Achievement Progress
                </Typography>
                <Grid className="action_center_bottom_flex">
                  { goals?.length && (
                    <Box className="action_center_box goal_milestone">
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography className="goal_title">
                          { goals?.[ 0 ]?.nameAlias
                            ? goals?.[ 0 ]?.nameAlias
                            : goals?.[ 0 ]?.name }
                        </Typography>
                        <Typography
                          sx={ {
                            color:
                              goals?.[ 0 ]?.goalAchieveScore < 40
                                ? "#EE4412"
                                : goals?.[ 0 ]?.goalAchieveScore > 80
                                  ? "#21C262"
                                  : "#F2D56C",
                            fontWeight: "500",
                            fontSize: "12px",
                          } }
                          className="progress_right_label"
                        >
                          { goals?.[ 0 ]?.goalAchieveScore }%
                        </Typography>
                      </Stack>
                      <Box sx={ { margin: "16px 0 30px" } }>
                        <Box className="progressbar_box">
                          <LinearProgress
                            variant="determinate"
                            value={ goals?.[ 0 ]?.goalAchieveScore }
                            className="pb1"
                            sx={ {
                              height: "16px",
                              borderRadius: "22px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  goals?.[ 0 ]?.goalAchieveScore < 40
                                    ? "#EE4412"
                                    : goals?.[ 0 ]?.goalAchieveScore > 80
                                      ? "#21C262"
                                      : "#F2D56C",
                                borderRadius: "22px",
                              },
                            } }
                          />
                          <LinearProgress
                            variant="determinate"
                            value={ 0 }
                            className="pb2"
                            sx={ {
                              height: "16px",
                              borderRadius: "22px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#DFEBF6",
                                borderRadius: "22px",
                              },
                            } }
                          />
                        </Box>
                        {/* <Typography className="milestone_title">
                          <span style={{ color: "#1C2129", fontWeight: "500" }}>
                            Current Milestone :
                          </span>{" "}
                          Anticipate risks, and build contingency plans.
                        </Typography> */}
                      </Box>
                      <Link
                        href={ {
                          pathname: "/achieve",
                          query: { goalId: goals?.[ 0 ]?.id },
                        } }
                      >
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
                            padding: "8px !important",
                            width: "124px !important",
                            fontSize: "14px  !important",
                          } }
                        >
                          Resume Goal
                        </Button>
                      </Link>
                    </Box>
                  ) }
                  { goals?.length > 1 ? (
                    <Box className="action_center_box goal_milestone">
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography className="goal_title">
                          { goals?.[ 1 ]?.name }
                        </Typography>
                        <Typography
                          sx={ {
                            color:
                              goals?.[ 1 ]?.goalAchieveScore < 40
                                ? "#EE4412"
                                : goals?.[ 1 ]?.goalAchieveScore > 80
                                  ? "#21C262"
                                  : "#F2D56C",
                            fontWeight: "500",
                            fontSize: "12px",
                          } }
                          className="progress_right_label"
                        >
                          { goals?.[ 1 ]?.goalAchieveScore }%
                        </Typography>
                      </Stack>
                      <Box sx={ { margin: "16px 0 30px" } }>
                        <Box className="progressbar_box">
                          <LinearProgress
                            variant="determinate"
                            value={ goals?.[ 1 ]?.goalAchieveScore }
                            className="pb1"
                            sx={ {
                              height: "16px",
                              borderRadius: "22px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  goals?.[ 1 ]?.goalAchieveScore < 40
                                    ? "#EE4412"
                                    : goals?.[ 1 ]?.goalAchieveScore > 80
                                      ? "#21C262"
                                      : "#F2D56C",
                                borderRadius: "22px",
                              },
                            } }
                          />
                          <LinearProgress
                            variant="determinate"
                            value={ 0 }
                            className="pb2"
                            sx={ {
                              height: "16px",
                              borderRadius: "22px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#E8E3FF",
                                borderRadius: "22px",
                              },
                            } }
                          />
                        </Box>
                        {/* <Typography className="milestone_title">
                          <span style={{ color: "#1C2129", fontWeight: "500" }}>
                            Current Milestone :
                          </span>{" "}
                          Anticipate risks, and build contingency plans.
                        </Typography> */}
                      </Box>
                      <Link
                        href={ {
                          pathname: "/achieve",
                          query: { goalId: goals?.[ 1 ]?.id },
                        } }
                      >
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
                            padding: "8px !important",
                            width: "124px !important",
                            fontSize: "14px  !important",
                          } }
                        >
                          Resume Goal
                        </Button>
                      </Link>
                    </Box>
                  ) : (
                    <Box></Box>
                  ) }
                </Grid>
              </Box>
            ) : (
              ""
            )
          }
        </Box>
      </Box>
      {/* <PrivacyPolicy showPrivacyPolicyModal={showPrivacyPolicyModal} closePrivacyPolicyModal={closePrivacyPolicyModal} /> */ }
    </>
  );
};
export default ActionCenter;
