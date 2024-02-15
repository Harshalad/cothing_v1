import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BorderLinearProgress } from "../../../../Goal/BorderLinearProgress/BorderLinearProgress";
import { theme } from "../../../theme";
import GoalOverviewModal from "../../GoalOverviewModal/GoalOverviewModal";
import { useRouter } from "next/router";
import ViewPurpose from "../../../../common/ViewPurpose/ViewPurpose";

const UserGoalRow = ( { goal, serialNo }: any ) => {
  const GOAL_STATUS_TYPES = {
    START_ALIGNMENT: "START_ALIGNMENT",
  };
  const [ goalStatus, setGoalStatus ] = useState(
    GOAL_STATUS_TYPES.START_ALIGNMENT
  );

  const [ showGoalOverview, setShowGoalOverview ] = useState( false );
  const [ showGuidance, setShowGuidance ] = useState( false );
  const [ showModifyGoal, setShowModifyGoal ] = useState( false );
  const [ showAskQuestion, setAskQuestion ] = useState( false );
  const [ dontShowChat, setDontShowChat ] = useState( false );
  const [ showViewPurpose, setShowViewPurpose ] = useState( false );
  const router = useRouter();

  const popupName = "viewEmployeeGoal";

  const showGoalDetailsModel = ( value: String ) => {
    if ( value === "askQuestion" ) {
      setAskQuestion( false );
    } else {
      setAskQuestion( false );
    }

    if ( value === "dontShowChat" ) {
      setDontShowChat( true );
      setShowViewPurpose( true );
    } else {
      setDontShowChat( false );
    }

    //

    if ( value === "showDiscuss" ) {
      setShowGoalOverview( true );
    }
  };

  const openPopup = ( value: any ) => {
    setShowViewPurpose( false );
  };

  const closePopup = ( value: any ) => {
    setShowViewPurpose( value );
  };

  useEffect( () => {
    if (
      router?.isReady &&
      router?.query?.goalId === goal?.id
    ) {
      setShowGoalOverview( true );
    }
  }, [ goal?.id, router?.isReady, router?.query?.goalId ] );

  console.log( "123456 goal ", goal );

  return (
    <>
      <div key={ goal.sno } className="details-panel-nav no-bg">
        {/* <div className="flx-1">
          <article className="dtls-pnl-snotxt">{serialNo}</article>
        </div> */}
        <div className="flx-5">
          {/* <Typography
            sx={{ fontSize: "10px", fontWeight: "400", color: "#EE4412" }}
          >
            !Goal Modified
          </Typography> */}
          <article className="dtls-pnl-goaltxt">
            { goal?.nameAlias ? goal?.nameAlias : goal?.name }
            <span
              className="dtls-pnl-moretxt"
              onClick={ () => showGoalDetailsModel( "dontShowChat" ) }
            >
              &nbsp;Details
            </span>
          </article>
        </div>
        <Tooltip title={ goal?.assignedBy } disableFocusListener>
          <div className="flx-2">
            <article className="dtls-pnl-asignee">
              {/* {/* <span className="assinge-icons">H</span> */ }
              <span className="assinge-icons ver2">
                { goal?.assignedBy?.substring( 0, 1 )?.toUpperCase() }
              </span>
            </article>
          </div>
        </Tooltip>
        {/*<Tooltip title={`${goal?.alignmentScore}%`} disableFocusListener>
          <div className="flx-3">
            <ThemeProvider theme={ theme }>
              <BorderLinearProgress
                //@ts-ignore
                color={
                  goal?.alignmentScore > 66
                    ? "success"
                    : goal?.alignmentScore < 33
                      ? "danger"
                      : "medium"
                }
                variant="determinate"
                value={ goal?.alignmentScore }
              />
            </ThemeProvider>
          </div>
        </Tooltip>*/}
        {
          // <div className="flx-2">
          //   <article
          //     className={
          //       goal?.status === "ADDED" || goal?.status === "ASSIGNED"
          //         ? "dtls-pnl-guidnce disabled"
          //         : "dtls-pnl-guidnce"
          //     }
          //     onClick={() => {
          //       if (goal.status === "ADDED" || goal?.status === "ASSIGNED") {
          //         console.log("ignore");
          //       } else {
          //         // showGoalDetailsModel("askQuestion");
          //       }
          //     }}
          //   >
          //     &nbsp;
          //   </article>
          // </div>
        }
        <Box className="flx-5">
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="8px"
          >
            <Button
              className="align_cta"
              variant={ goal.status === "ADDED" ? "contained" : "outlined" }
              disabled={ goal?.status === "ADDED" }
              sx={ {
                color:
                  // goal?.status?.toLowerCase() === "completed"
                  //   ? "#F58A43"
                  //   : goal?.alignmentScore < 20
                  //   ? "#fff"
                  //   : goal?.status?.toLowerCase() === "rejected" ||
                  //     goal?.status?.toLowerCase() === "sent_for_approval"
                  //   ? "#fff"
                  //   : "#F58A43",
                  goal?.status?.toLowerCase() === "completed" ||
                    goal?.status?.toLowerCase() === "aligned" ||
                    goal?.status?.toLowerCase() === "in_progress" ||
                    goal?.status?.toLowerCase() === "approved" ||
                    goal?.status?.toLowerCase() === "auto_approved"
                    ? "#F58A43"
                    : "#fff",

                borderColor:
                  goal?.status?.toLowerCase() === "completed"
                    ? "#EAECEF"
                    : goal?.status?.toLowerCase() === "rejected" ||
                      goal?.status?.toLowerCase() === "sent_for_approval"
                      ? "#989EA5"
                      : "#F58A43",
                backgroundColor:
                  // goal?.status?.toLowerCase() === "completed"
                  //   ? "#fff"
                  //   : goal?.status?.toLowerCase() === "rejected" ||
                  //     goal?.status?.toLowerCase() === "sent_for_approval"
                  //   ? "#989EA5"
                  //   : goal?.alignmentScore < 20
                  //   ? "#F58A43"
                  //   : "transparent",
                  goal?.status?.toLowerCase() === "completed" ||
                    goal?.status?.toLowerCase() === "aligned" ||
                    goal?.status?.toLowerCase() === "in_progress" ||
                    goal?.status?.toLowerCase() === "approved" ||
                    goal?.status?.toLowerCase() === "auto_approved"
                    ? "#fff"
                    : goal?.status?.toLowerCase() === "assigned"
                      ? "#F58A43"
                      : "#989EA5",

                boxShadow: "none",
                padding: "5px 15px",
                textTransform: "capitalize",
                // "&:hover": {
                //   // backgroundColor:
                //   //   goal?.status?.toLowerCase() === "completed"
                //   //     ? "#EAECEF"
                //   //     : goal?.status?.toLowerCase() === "rejected" ||
                //   //       goal?.status?.toLowerCase() === "sent_for_approval"
                //   //     ? "#989EA5"
                //   //     : "#F58A43",
                //   backgroundColor:
                //     // goal?.status?.toLowerCase() === "completed"
                //     //   ? "#fff"
                //     //   : goal?.status?.toLowerCase() === "rejected" ||
                //     //     goal?.status?.toLowerCase() === "sent_for_approval"
                //     //   ? "#989EA5"
                //     //   : goal?.alignmentScore < 20
                //     //   ? "#F58A43"
                //     //   : "transparent",
                //     goal?.status?.toLowerCase() === "completed" ||
                //     goal?.status?.toLowerCase() === "aligned" ||
                //     goal?.status?.toLowerCase() === "in_progress" ||
                //     goal?.status?.toLowerCase() === "approved"
                //       ? "#fff"
                //       : goal?.status?.toLowerCase() === "assigned"
                //       ? "#F58A43"
                //       : "#989EA5",
                //   },
                "&:hover": {
                  backgroundColor:
                    goal?.status?.toLowerCase() === "completed"
                      ? "transparent"
                      : goal?.status?.toLowerCase() === "rejected" ||
                        goal?.status?.toLowerCase() === "sent_for_approval"
                        ? "#989EA5"
                        : goal?.status?.toLowerCase() === "assigned"
                          ? "#F58A43"
                          : "transparent",
                  boxShadow: "none",
                  border:
                    goal?.status?.toLowerCase() === "rejected" ||
                      goal?.status?.toLowerCase() === "sent_for_approval"
                      ? "1px solid #989EA5"
                      : "1px solid #F58A43",
                },
              } }
              // onClick={() => {
              //   if (
              //     goal?.status?.toLowerCase() === "sent_for_approval" ||
              //     goal?.status?.toLowerCase() === "rejected"
              //   ) {
              //     router.push(`/achieve?goalId=${goal?.id}`, `/achieve`);
              //     return;
              //   }
              // }}

              onClick={ () => {
                console.log( " 123456 clicked", goal?.id );

                if (
                  goal?.status?.toLowerCase() === "sent_for_approval" ||
                  goal?.status?.toLowerCase() === "rejected"
                ) {
                  console.log( "ignore" );
                } else {
                  if (
                    goal?.status?.toLowerCase() === "completed" || goal?.status?.toLowerCase() === "approved" || goal?.status?.toLowerCase() === "aligned" || goal?.status?.toLowerCase() === "auto_approved" || goal?.status?.toLowerCase() === "in_progress" ||
                    goal?.alignmentScore >= 20
                  ) {
                    router.push( `/achieve?goalId=${ goal?.id }`, "/achieve" );
                    return;
                  }
                  if ( goal?.alignmentScore < 20 ) {
                    console.log( " 123456 clicked", goal?.id );
                    router.push( {
                      pathname: "/goal/overview",
                      query: { goalId: goal?.id },
                    } );
                    return;
                  }
                }
              } }
            >
              { goal?.status?.toLowerCase() === "completed"
                ? "Review"
                : goal?.status === "ASSIGNED"
                  ? "Respond to goal"
                  : goal?.status === "ALIGNED" ||
                    goal?.status === "IN_PROGRESS" ||
                    goal?.status === "APPROVED" ||
                    goal?.status === "AUTO_APPROVED"
                    ? "Start Goal"
                    : goal?.status === "REJECTED"
                      ? "Rejected"
                      : goal?.status === "SENT_FOR_APPROVAL"
                        ? "Approval Pending"
                        : goal?.status }
            </Button>
            <Button
              className="align_cta"
              variant={ goal.status === "ADDED" ? "outlined" : "outlined" }
              sx={ {
                color: "#F58A43",
                borderColor: "#F58A43",
                backgroundColor: "#fff",
                boxShadow: "none",
                padding: "5px 15px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  border: "1px solid #F58A43",
                },
              } }
              onClick={ () => showGoalDetailsModel( "showDiscuss" ) }
            >
              { "Discuss" }
            </Button>
          </Stack>
        </Box>
      </div>
      <Box className="align_my_goals tab">
        <article className="dtls-pnl-goaltxt">
          { goal?.nameAlias ? goal?.nameAlias : goal?.name }
          <span
            className="dtls-pnl-moretxt"
            onClick={ () => showGoalDetailsModel( "" ) }
          >
            &nbsp;Details
          </span>
        </article>
        <ThemeProvider theme={ theme }>
          {/*<BorderLinearProgress
            //@ts-ignore
            color={
              goal?.alignmentScore > 66
                ? "success"
                : goal?.alignmentScore < 33
                  ? "danger"
                  : "medium"
            }
            variant="determinate"
            value={ goal?.alignmentScore }
          />*/}
        </ThemeProvider>
        <Stack className="align_my_goals_btm">
          <Box>
            <article className="dtls-pnl-asignee">
              <span className="assinge-icons ver2">
                { goal?.assignedBy?.substring( 0, 1 )?.toUpperCase() }
              </span>
            </article>
          </Box>
          <Stack className="align_my_goals_btminnr">
            <Button
              className="align_cta"
              variant={ goal.status === "ADDED" ? "contained" : "outlined" }
              sx={ {
                color:
                  goal?.status?.toLowerCase() === "completed" ||
                    goal?.status?.toLowerCase() === "aligned" ||
                    goal?.status?.toLowerCase() === "in_progress" ||
                    goal?.status?.toLowerCase() === "approved" ||
                    goal?.status?.toLowerCase() === "auto_approved"
                    ? "#F58A43"
                    : "#fff",
                borderColor:
                  goal?.status?.toLowerCase() === "completed"
                    ? "#EAECEF"
                    : goal?.status?.toLowerCase() === "rejected" ||
                      goal?.status?.toLowerCase() === "sent_for_approval"
                      ? "#989EA5"
                      : "#F58A43",
                backgroundColor:
                  goal?.status?.toLowerCase() === "completed" ||
                    goal?.status?.toLowerCase() === "aligned" ||
                    goal?.status?.toLowerCase() === "in_progress" ||
                    goal?.status?.toLowerCase() === "approved" ||
                    goal?.status?.toLowerCase() === "auto_approved"
                    ? "#fff"
                    : goal?.status?.toLowerCase() === "assigned"
                      ? "#F58A43"
                      : "#989EA5",
                boxShadow: "none",
                padding: "5px 15px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor:
                    goal?.status?.toLowerCase() === "completed"
                      ? "transparent"
                      : goal?.status?.toLowerCase() === "rejected" ||
                        goal?.status?.toLowerCase() === "sent_for_approval"
                        ? "#989EA5"
                        : goal?.status?.toLowerCase() === "assigned"
                          ? "#F58A43"
                          : "transparent",
                  boxShadow: "none",
                  border:
                    goal?.status?.toLowerCase() === "rejected" ||
                      goal?.status?.toLowerCase() === "sent_for_approval"
                      ? "1px solid #989EA5"
                      : "1px solid #F58A43",
                },
              } }
              onClick={ () => {
                console.log( " 123456 clicked", goal?.id );

                if (
                  goal?.status?.toLowerCase() === "sent_for_approval" ||
                  goal?.status?.toLowerCase() === "rejected"
                ) {
                  console.log( "ignore" );
                } else {
                  if (
                    goal?.status?.toLowerCase() === "completed" ||
                    goal?.alignmentScore >= 20
                  ) {
                    router.push( `/achieve?goalId=${ goal?.id }`, "/achieve" );
                    return;
                  }
                  if ( goal?.alignmentScore < 20 ) {
                    console.log( " 123456 clicked", goal?.id );
                    router.push( {
                      pathname: "/goal/overview",
                      query: { goalId: goal?.id },
                    } );
                    return;
                  }
                }
              } }
            >
              { goal?.status?.toLowerCase() === "completed"
                ? "Review"
                : goal?.status === "ASSIGNED"
                  ? "Start Alignment"
                  : goal?.status === "ALIGNED" ||
                    goal?.status === "IN_PROGRESS" ||
                    goal?.status === "APPROVED" ||
                    goal?.status === "AUTO_APPROVED"
                    ? "Start Goal"
                    : goal?.status === "REJECTED"
                      ? "Rejected"
                      : goal?.status === "SENT_FOR_APPROVAL"
                        ? "Approval Pending"
                        : goal?.status }
            </Button>
          </Stack>
        </Stack>
      </Box>{ " " }
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
        showAskQuestion={ showAskQuestion }
        type={ "ALIGN" }
        dontShowChat={ dontShowChat }
      />
      <ViewPurpose
        openPopup={ openPopup }
        closePopup={ closePopup }
        open={ { showViewPurpose, popupName } }
        goal={ goal }
      />
    </>
  );
};

export default UserGoalRow;
