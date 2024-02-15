import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Tooltip,
  Button,
  Link,
} from "@mui/material";
import Graph from "../Graph/Graph";
import { fetchUserActions } from "../../../../../actions/actionCenter/fetchUserActions";
import { useSelector } from "react-redux";
import Spinner from "../../../../common/Spinner/Spinner";
import { useRouter } from "next/router";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
const align = 20;
const achieve = 80;

const EmployeeOverview = ( {
  employeeId,
  employeeProgramId,
  userAlignmentScore = 0,
  userAchievementScore = 0,
}: any ) => {
  const [ open, setOpen ] = useState( "" );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const router = useRouter();

  const [ teamScore, setTeamScore ] = useState<any>( null );
  const [ userActvity, setUserActivity ] = useState<any>( null );
  const [ userActions, setUserActions ] = useState<any>( null );
  const [ alignUnreadCount, setAlignUnreadCount ] = useState<any>( 0 );
  const [ achieveUnreadCount, setAchieveUnreadCount ] = useState<any>( 0 );
  const [ userActionsLoading, setUserActionsLoading ] = useState<any>( false );

  const handleTooltipClose = () => {
    //@ts-ignore
    setOpen( false );
  };

  const handleTooltipOpen = ( value: any ) => {
    setOpen(
      value === "overallAlign" || value === "overallAchieve" ? value : false
    );
  };
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  // FETCH USER ACTIONS
  useEffect( () => {
    const getUserActions = async () => {
      try {
        setUserActionsLoading( true );

        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })

        const response = await fetchUserActions( {
          userId: user?.id,
          programId: user?.activeProgramId,
        } );

        console.log( "here response", response );

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
            ( action: any ) => action.actionType === "Achieve" && action.unRead
          );
          setAchieveUnreadCount( achieveUnreadCount?.length );
        }
        setUserActionsLoading( false );
      } catch ( error ) {
        console.log( error );
        setUserActionsLoading( false );
      }
    };
    getUserActions();
  }, [] );

  console.log( userActions, "userActions ** " );

  function routeToAlignPage (): void {
    router.push( {
      pathname: "/align",
    } );
  }

  const filteredAlignAction = userActions?.filter(
    ( userAction: any ) =>
      userAction?.actionType === "Align" &&
      userAction?.role === "MANAGER" &&
      userAction?.pageLink.includes( employeeId )
  );
  const filteredAchieveAction = userActions?.filter(
    ( userAction: any ) =>
      userAction?.actionType === "Achieve" &&
      userAction?.role === "MANAGER" &&
      userAction?.pageLink.includes( employeeId )
  );

  return (
    <Box className="emp_ovrview">
      <Typography className="emp_ovrvw_title">Overview</Typography>
      <Stack className="mngr_actcntr_tab_flex">
        { currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
          ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
            program?.configMap.enableAlign ) ?
          <Box className="emp_dtls_algn_box">
            <Box
              className={
                //@ts-ignore
                userAlignmentScore === 0
                  ? "action_center_box overall_align action_center_brdrdsbld"
                  : "action_center_box overall_align"
              }
            >
              <Stack className="action_inner_flex">
                <Box>
                  <Typography className="action_title">
                    Set Goals
                  </Typography>
                  {/* <Box className="graph_box graph_posvt">
                  <Graph id="canvas_align" graphStaus={"positive"} />
                  <Typography className="graph_label">+ve</Typography>
                </Box> */}
                </Box>
                <Box>
                  <Typography className="action_percentage">
                    {/*{
                      //@ts-ignore
                      userAlignmentScore === 0 ? (
                        <span style={ { color: "#989EA5" } }>
                          { userAlignmentScore + "%" }
                        </span>
                      ) : (
                        userAlignmentScore + "%"
                      )
                    }*/}
                    <br />
                  </Typography>
                </Box>
              </Stack>
              <Box className="tooltip_box">
                <Box style={ { height: "29px" } }><br /></Box>
                {/*<Tooltip
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
                    onMouseEnter={ () => handleTooltipOpen( "overallAchieve" ) }
                  />
                </Tooltip>*/}
              </Box>
            </Box>
            {
              userActionsLoading ? (
                <Spinner />
              ) : (
                <Box
                  className="action_center_box mngr_actcntr_msg_box"
                  sx={ {
                    height: "320px",
                    overflowX: "auto",
                    marginBottom: "16px",
                  } }
                >
                  <Typography
                    className="action_title mngr_actcntr_msg_title"
                    sx={ { marginBottom: "20px" } }
                  >
                    Call-to-action
                  </Typography>
                  { userActions?.length ? (
                    filteredAlignAction.length === 0 ? (
                      <Box className="no_action_box">
                        <img
                          src="/images/no-action.png"
                          alt="no action"
                          width={ 40 }
                          height={ 40 }
                        ></img>
                        <Typography className="no_action_title">
                          There are no pending actions
                        </Typography>
                      </Box>
                    ) : (
                      filteredAlignAction.map(
                        ( userAction: any, index: number ) => {
                          console.log( "userAction", userAction );
                          if ( !userAction?.show ) return <></>;
                          return (
                            <Link href={ userAction?.pageLink } key={ index }>
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
                        }
                      )
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
                      <Typography className="no_action_subtitle">
                        Start asSesigning goals
                      </Typography>
                      <Button
                        onClick={ routeToAlignPage }
                        className="standard_cta no_action_btn"
                      >
                        Set Goal
                      </Button>
                    </Box>
                  ) }
                </Box>
              )
            }
          </Box >
          : null }
        <Box className="emp_dtls_achv_box">
          <Box
            className={
              //@ts-ignore
              achieve === 0
                ? "action_center_box overall_achieve action_center_brdrdsbld"
                : "action_center_box overall_achieve"
            }
          >
            <Stack className="action_inner_flex">
              <Box>
                <Typography className="action_title">Overall Progress</Typography>
                {/* <Box className="graph_box graph_posvt"> */ }
                {/* <Graph id="canvas_achieve" graphStaus={"positive"} /> */ }
                {/* <Typography className="graph_label">+ve</Typography> */ }
                {/* </Box> */ }
              </Box>
              <Box>
                <Typography className="action_percentage">
                  {
                    //@ts-ignore
                    userAchievementScore === 0 ? (
                      <span style={ { color: "#989EA5" } }>
                        { userAchievementScore + "%" }
                      </span>
                    ) : (
                      userAchievementScore + "%"
                    )
                  }
                </Typography>
              </Box>
            </Stack>
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
          </Box>
          { userActionsLoading ? (
            <Spinner />
          ) : (
            <Box
              className="action_center_box mngr_actcntr_msg_box"
              sx={ {
                height: "320px",
                overflowX: "auto",
                marginBottom: "16px",
              } }
            >
              <Typography
                className="action_title mngr_actcntr_msg_title"
                sx={ { marginBottom: "20px" } }
              >
                Call-to-action
              </Typography>
              { userActions?.length ? (
                filteredAchieveAction.length === 0 ? (
                  <Box className="no_action_box">
                    <img
                      src="/images/no-action.png"
                      alt="no action"
                      width={ 40 }
                      height={ 40 }
                    ></img>
                    <Typography className="no_action_title">
                      There are no pending actions
                    </Typography>
                  </Box>
                ) : (
                  filteredAchieveAction.map(
                    ( userAction: any, index: number ) => {
                      if ( !userAction?.show ) return <></>;
                      return (
                        <Link href={ userAction?.pageLink } key={ index }>
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
                    }
                  )
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
                          Set Goal
                        </Button>
                      </>
                    ) }
                </Box>
              ) }
            </Box>
          ) }
        </Box>
      </Stack >
    </Box >
  );
};

export default EmployeeOverview;
