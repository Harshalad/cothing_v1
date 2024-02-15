import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  Tooltip,
  Grid,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Graph from "../common/Graph/Graph";
import VerticalBarGraph from "../common/VerticalBarGraph/VerticalBarGraph";
import Link from "next/link";
import { fetchTeamScore } from "../../actions/actionCenter/fetchTeamScore";
import { useSelector } from "react-redux";
import { fetchUserActivity } from "../../actions/actionCenter/fetchUserActivity";
import { fetchUserActions } from "../../actions/actionCenter/fetchUserActions";
import { useRouter } from "next/router";
import AlignGoalDetails from "./AlignGoalDetails";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import { PRIMARY_MANAGER } from "../../constants/color";

import { updateUserActionToRead } from "../../actions/actionCenter/updateUserActionToRead";

const drawerWidth = 250;

const ManagerActionCenter = () => {
  const [ open, setOpen ] = useState( "" );
  const [ showData, setData ] = useState( "Achieve" );
  const router = useRouter();

  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const [ teamScore, setTeamScore ] = useState<any>( null );
  const [ userActvity, setUserActivity ] = useState<any>( null );
  const [ userActions, setUserActions ] = useState<any>( null );
  const [ alignUnreadCount, setAlignUnreadCount ] = useState<any>( 0 );
  const [ achieveUnreadCount, setAchieveUnreadCount ] = useState<any>( 0 );
  const [ showViewPurpose, setViewPurpose ] = useState<any>( false );
  const align = teamScore?.teamAlignScoreAggregated || 0;
  const achieve = teamScore?.teamAchieveScoreAggregated || 0;

  const takeAlignAction = ( e: any, id: any ) => {
    e.preventDefault;
    setViewPurpose( id );
  };
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const closePopup = ( value: any ) => {
    setViewPurpose( value );
  };

  useEffect( () => {
    const getTeamScore = async () => {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });

        const response: any = await fetchTeamScore( {
          managerId: user?.id,
          role: currentUserRole,
        } );
        //@ts-ignore
        if ( response ) {
          //@ts-ignore
          setTeamScore( response?.teamScore?.response );
        }
      } catch ( error ) {
        console.error( error, "ERROR getTeamScore Manager" );
      }
    };
    getTeamScore();
  }, [ currentUserRole, user?.id ] );

  useEffect( () => {
    if (
      ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
        program?.configMap.enableAlign ) ||
      currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
      currentUserRole === MANAGER_VIEW_STATE.JP
    ) {
      setData( "Align" );
    } else {
      setData( "Achieve" );
    }
  }, [ program ] );

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
            ( action: any ) =>
              action.actionType === "Align" &&
              action.role === currentUserRole &&
              action.unRead
          );
          setAlignUnreadCount( alignUnreadCount?.length );
          //@ts-ignore
          const achieveUnreadCount = response?.userActions?.filter(
            ( action: any ) =>
              action.actionType === "Achieve" &&
              action.role === currentUserRole &&
              action.unRead
          );
          setAchieveUnreadCount( achieveUnreadCount?.length );
        }
      } catch ( error ) {
        console.error( error, "ERROR getUserActions Manager" );
      }
    };
    getUserActions();
  }, [ currentUserRole, user?.activeProgramId, user?.id ] );

  // FETCH USER ACTIVITY
  useEffect( () => {
    const getUserActivity = async () => {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });

        const response = await fetchUserActivity( {
          userId: user?.id,
          programId: user?.activeProgramId,
        } );
        //@ts-ignore
        if ( response?.userActivity ) {
          //@ts-ignore
          setUserActivity( response?.userActivity );
        }
      } catch ( error ) {
        console.error( error, "ERROR getUserActivity Manager" );
      }
    };
    getUserActivity();
  }, [ currentUserRole, user?.activeProgramId, user?.id ] );

  const handleTooltipOpen = ( value: any ) => {
    setOpen(
      value === "overallAlign" || value === "overallAchieve" ? value : false
    );
  };

  const handleTooltipClose = () => {
    //@ts-ignore
    setOpen( false );
  };

  useEffect( () => { }, [] );

  function routeToAlignPage (): void {
    router.push( {
      pathname: "/align",
    } );
  }

  const handleUnreadClick = async ( action: any ) => {
    //@ts-ignore
    await updateUserActionToRead( action );
    return;
  };
  const filteredAction = userActions?.filter(
    ( userAction: any ) =>
      userAction?.actionType === showData &&
      userAction?.role === currentUserRole
  );
  console.log( filteredAction, "filterActions" );

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
          <Stack className="mngr_actcntr_top_flex">
            <Box className="mngr_actcntr_tplft_flex">
              <Stack className="mngr_actcntr_tab_flex">
                { ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                  program?.configMap.enableAlign ) ||
                  currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
                  currentUserRole === MANAGER_VIEW_STATE.JP ? (
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
                          { currentUserRole === MANAGER_VIEW_STATE.EXPERT
                            ? "Goal setting of Assigned Employees"
                            : "Goal setting with Direct Reports" }
                        </Typography>
                        {/* <Box className="graph_box graph_posvt">
                        <Graph id="canvas_align" graphStaus={"positive"} />
                        <Typography className="graph_label">+ve</Typography>
                      </Box> */}
                      </Box>
                      {/*<Box>
                        <Typography className="action_percentage">
                          { align === 0 ? (
                            <span style={ { color: "#989EA5" } }>
                              { align + "%" }
                            </span>
                          ) : (
                            align + "%"
                          ) }
                        </Typography>
                      </Box>*/}
                    </Stack>
                    {/*<Box className="tooltip_box">
                      <Tooltip
                        open={ open === "overallAchieve" }
                        onClose={ handleTooltipClose }
                        title="View progress on goal alignment"
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
                        { currentUserRole === MANAGER_VIEW_STATE?.EXPERT
                          ? "Progress on goals of Assigned Employees"
                          : "Overall Progress of All Direct Reports" }
                      </Typography>
                      {/* <Box className="graph_box graph_posvt">
                        <Graph id="canvas_achieve" graphStaus={"positive"} />
                        <Typography className="graph_label">+ve</Typography>
                      </Box> */}
                    </Box>
                    <Box>
                      <Typography className="action_percentage">
                        { achieve === 0 ? (
                          <span style={ { color: "#989EA5" } }>
                            { achieve + "%" }
                          </span>
                        ) : (
                          achieve + "%"
                        ) }
                      </Typography>
                    </Box>
                  </Stack>
                  <Box className="tooltip_box">
                    <Tooltip
                      open={ open === "overallAlign" }
                      onClose={ handleTooltipClose }
                      title="View progress on Goals."
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
                </Box>
              </Stack>
              <Box className="mngr_actcntr_tplft_btmbx">
                { showData !== "Align" && <Box className="mngr_actcntr_bargraph">
                  <Stack className="mngr_bargraph_flex">
                    <Typography className="mngr_bargraph_title">
                      { showData === "Align" ? align : achieve }%
                      { showData === "Align" ? " Goal Alignment" : " Overall Progress of each Direct Report" }
                    </Typography>
                    <Link
                      className={
                        showData === "Align"
                          ? align === 0
                            ? "mngr_bargraph_link disable_link"
                            : //@ts-ignore
                            showData === "Achieve"
                              ? achieve === 0
                                ? "mngr_bargraph_link disable_link"
                                : "mngr_bargraph_link"
                              : "mngr_bargraph_link"
                          : "mngr_bargraph_link"
                      }
                      href={ showData === "Align" ? "/align" : "/achieve" }
                      style={ {
                        textDecoration: "none",
                        color:
                          roleBasedAccess?.[ MANAGER_VIEW_STATE.MANAGER ]
                            ?.themeColor,
                      } }
                    >
                      View Details
                    </Link>
                  </Stack>
                  <Box className="bar_graph_container">
                    <VerticalBarGraph
                      chartData={ showData }
                      teamScore={ teamScore }
                    />
                  </Box>
                </Box> }
                <Grid
                  className="action_center_middle_flex"
                  sx={ { margin: "16px 0 0" } }
                >
                  <Box
                    className="action_center_box mngr_actcntr_msg_box"
                    sx={ { height: "435px", overflowX: "auto" } }
                  >
                    <Typography
                      className="action_title mngr_actcntr_msg_title"
                      sx={ { marginBottom: "20px" } }
                    >
                      { showData === "Align" ? "Call-to-action" : "Call-to-action" }
                    </Typography>

                    { console.log( userActions, "2345" ) }
                    { userActions?.length ? (
                      filteredAction.length === 0 ? (
                        <Box className="no_action_box">
                          <img
                            src="/images/no-action.png"
                            alt="no action"
                            width={ 40 }
                            height={ 40 }
                          ></img>
                          <Typography className="no_action_title">
                            No { showData === "Align" ? "Alignment" : "Achieve" }{ " " }
                            action is pending
                          </Typography>
                        </Box>
                      ) : (
                        filteredAction.map( ( userAction: any, index: number ) => {
                          if ( !userAction?.show ) return <></>;
                          console.log( userAction, "111", currentUserRole );
                          return (
                            <Link
                              href={ userAction?.pageLink }
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
                                    {/* {userAction?.important ? "*" : null} */ }
                                  </Typography>
                                  <Typography className="prev_act_subtitle">
                                    { userAction?.goalStatement }
                                  </Typography>
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
                                    <Typography
                                      className="take_action_title"
                                      sx={ {
                                        color: `${ PRIMARY_MANAGER }!important`,
                                      } }
                                    >
                                      { userAction?.buttonLabel }
                                    </Typography>
                                    <img
                                      src="/images/review-action.png" // TODO Sateesh get blue icon for manager
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
                          Oops! looks like you have no Action Items on your List
                        </Typography>
                        { currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                          program?.configMap?.enableAlign && (
                            <>
                              <Typography className="no_action_subtitle">
                                Start assigning goals
                              </Typography>
                              <Button
                                onClick={ routeToAlignPage }
                                className="standard_cta no_action_btn"
                              >
                                Assign Goal
                              </Button>
                            </>
                          ) }
                      </Box>
                    ) }
                  </Box>
                  <Box
                    className="action_center_box low_align"
                    sx={ { height: "435px", overflowX: "auto" } }
                  >
                    <Typography
                      className="action_title"
                      sx={ { marginBottom: "20px" } }
                    >
                      Top{ " " }
                      { showData === "Align"
                        ? currentUserRole === MANAGER_VIEW_STATE.EXPERT
                          ? "Assigned Employees"
                          : "Direct Employee"
                        : currentUserRole === MANAGER_VIEW_STATE.EXPERT
                          ? "Assigned Employees"
                          : "Direct Reports" }{ " " }
                    </Typography>
                    { teamScore?.teamIndividualScore
                      ?.sort( ( a: any, b: any ) => {
                        if ( showData === "Align" ) {
                          return b?.alignScore - a?.alignScore;
                        }
                        if ( showData === "Achieve" ) {
                          return b?.achieveScore - a?.achieveScore;
                        }
                      } )
                      ?.map( ( individual: any, index: number ) => {
                        return (
                          <Box key={ index }>
                            <Link
                              href={ `/employee/profile?employeeId=${ individual?.userId }&employeeEmail=${ individual?.userEmail }&employeeProgramId=${ individual?.programId }&managerId=${ user?.id }&userAlignmentScore=${ individual?.alignScore }&userAchievementScore=${ individual?.achieveScore }` }
                              style={ { textDecoration: "none" } }
                            >
                              <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="16px"
                                justifyContent="space-between"
                                key={ index }
                              >
                                <Stack
                                  flexDirection="row"
                                  alignItems="center"
                                  gap="16px"
                                >
                                  <Box>
                                    <Avatar
                                      sx={ {
                                        width: "32px",
                                        height: "32px",
                                        bgcolor: "#DFFFF2",
                                        color: "#1BAD70",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      } }
                                    >
                                      { individual?.userName?.substring( 0, 1 ) }
                                    </Avatar>
                                  </Box>
                                  <Box>
                                    <Typography className="low_align_title">
                                      { individual?.userName }
                                    </Typography>

                                    <Typography className="low_align_subtitle">
                                      { individual?.designation }
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Typography className="low_align_percentage">
                                  { showData === "Align"
                                    ? ""
                                    : `${ individual?.achieveScore }%` }

                                </Typography>
                              </Stack>
                              <Divider
                                sx={ { color: "#EAECEF", margin: "12px 0" } }
                              />
                            </Link>
                          </Box>
                        );
                      } ) }
                    {/* <Typography className='no_data'>No details found</Typography> */ }
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box className="mngr_actcntr_tprgt_flex">
              <Box
                className="action_center_box low_align"
                sx={ { height: "1030px", overflowX: "auto" } }
              >
                <Typography
                  className="action_title prev_actvty"
                  sx={ { marginBottom: "20px" } }
                >
                  Your Previous Activity
                </Typography>
                { userActvity?.length ? (
                  userActvity
                    ?.filter( ( item: any ) => item?.role === "MANAGER" )
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
                  <Typography className="no_data">No activity found</Typography>
                ) }
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* {goalsData.length > 0 &&
        goalsData.map((goal, key) => (
          <AlignGoalDetails 
            key={key+1} 
            //closePopup={closePopup} 
            //open={showViewPurpose} 
            alignGoalId={goal.sno} 
            alignGoalStatus={goal.status} 
            goalTitle={goal.text}
            goalSubTitle={goal.subtxt}
          />
        ))} */}
    </>
  );
};
export default ManagerActionCenter;
