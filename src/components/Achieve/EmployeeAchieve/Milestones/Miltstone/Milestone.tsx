import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import InlineConceptPrimer from "../../../../common/InlineConceptPrimer/InlineConceptPrimer";
import Spinner from "../../../../common/Spinner/Spinner";
import { fetchConceptPrimerByContentId } from "../../../../../actions/achieve/fetchConceptPrimerByContentId";
import { ASSESSMENT_BASE_URL } from "../../../../../constants/constants";
import { logUserEngagement } from "../../../../../actions/actionCenter/logUserEngagement";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
import { toast } from "react-toastify";
import { createUserTestMap } from "../../../../../actions/assessment/createUserTestMap";
import { fetchUserTestDetailsApi } from "../../../../../actions/assessment/fetchTestDetails";
import { fetchUserEventId } from "../../../../../actions/event/fetchUserEventId";
import { completeMethodStatus } from "../../../../../actions/status-update/completeMethodStatus";
import { createSheet } from "../../../../../actions/coThinkPrep/createSheet";

const Milestone = ( {
  milestone,
  mainMethodStatus,
  mainMethod,
  supportingMethods,
  milestonesCount,
  currentIndex,
  getIFrame,
  setIFrameLink,
  setIFrameTitle,
  goal,
  initiallyExpandedIndex,
  employeeData,
  handleChange,
  setMediaType
}: any ) => {
  const router = useRouter();
  const [ expanded, setExpanded ] = useState(
    initiallyExpandedIndex === currentIndex
  );

  console.log( milestone, mainMethod, goal, "aditya090909" );
  const [ mainMethodCallLoading, setMainMethodCallLoading ] = useState( false );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  //@ts-ignore
  const firebaseUser = useSelector( ( state ) => state?.auth?.firebaseUser );
  // //@ts-ignore
  // let  = await firebaseUser.getIdToken().then(function(idToken){
  //   return idToken
  // })
  console.log( user, "mainmethod1234" );
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
  const onMainMethodCall = async ( e: any ) => {
    try {
      setMainMethodCallLoading( true );
      console.log( mainMethod, goal, "on prepare click" );
      if ( mainMethod?.startDate && mainMethod?.endDate && user?.considerForDashboard ) {
        let startDate = new Date( mainMethod?.startDate );
        let endDate = new Date( mainMethod?.endDate );

        const currentDate = new Date();
        if ( currentDate < startDate ) {
          toast.error( `This is currently locked. Please come back on ${ getDate( startDate ) }. It will be available then.` )
          return;
        }
        if ( currentDate > endDate ) {
          toast.error( `This ${ milestone?.statement } is not available anymore as the deadline of ${ getDate( endDate ) } has expired.` );
          return;
        }

      }
      if ( mainMethod?.type === "cothink_worksheet" ) {
        if ( mainMethod?.userMethodContentId == null ) {
          const response = await createSheet( {
            userId: user?.id,
            programId: user?.activeProgramId,
            gaolId: goal?.id,
            milestoneId: milestone?.id,
            worksheetId: mainMethod?.contentId,
            methodId: mainMethod?.id,
            methodType: "mainMethod",
            type: "PREPARE"
          } )
          if ( response ) {
            router.push( {
              pathname: "/cothink-prepare",
              query: {
                //@ts-ignore
                id: response?.id,
                type: "prep"
              },
            } );
          }
        } else {
          router.push( {
            pathname: "/cothink-prepare",
            query: {
              //@ts-ignore
              id: mainMethod?.userMethodContentId,
              type: "prep"
            },
          } );
        }
      }
      if ( mainMethod?.type === "test" ) {
        const response = await createUserTestMap( {
          userId: user?.id,
          testId: mainMethod?.contentId,
          startDate: mainMethod?.startDate,
          endDate: mainMethod?.endDate,
          attemptNo: mainMethod?.noOfAttempts,
          role: currentUserRole,
          type: mainMethod?.type,
          programId: user?.activeProgramId,
          userGoalId: goal?.id,
          milestoneId: milestone?.id,
          methodId: mainMethod?.id,
        } );
        // console.log(response,"utmresponse");
        if ( response ) {
          const utmId = response;
          const testResponse = await fetchUserTestDetailsApi( {
            userTestMapId: utmId,
          } );
          // console.log(testResponse,"testResponse");
          //@ts-ignore
          if ( testResponse?.response === null ) {
            //@ts-ignore
            toast.error( testResponse?.extra );
          } else {
            router.push( {
              pathname: "/assessment",
              query: {
                //@ts-ignore
                id: utmId,
              },
            } );
          }
        }
      }
      if ( mainMethod?.type === "battery_group" ) {
        router.push( {
          pathname: "/viewBatteryGroup",
          query: {
            gId: mainMethod?.contentId,
            type: mainMethod?.type,
            goalId: goal?.id,
            milestoneId: milestone?.id,
            methodId: mainMethod?.id,
          },
        } );
      }
      if ( mainMethod?.type === "battery" ) {
        router.push( {
          pathname: "/viewBattery",
          query: {
            bId: mainMethod?.contentId,
            type: mainMethod?.type,
            goalId: goal?.id,
            milestoneId: milestone?.id,
            methodId: mainMethod?.id,
          },
        } );
      }
      if ( mainMethod?.type === "work_sheet" ) {
        router.push( {
          pathname: "/prepare",
          query: {
            goalId: goal?.id,
            milestoneId: milestone?.id,
            milestoneName: milestone?.statement,
            methodId: mainMethod?.id,
            methodType: "mainMethod",
            worksheetId:
              mainMethodStatus &&
                ( mainMethodStatus === "in_progress" ||
                  mainMethodStatus === "completed" )
                ? mainMethod?.userMethodContentId
                : mainMethod?.contentId,
            pickWorksheetFrom:
              mainMethodStatus &&
                ( mainMethodStatus === "in_progress" ||
                  mainMethodStatus === "completed" )
                ? "user_work_sheet"
                : "work_sheet",
            employeeEmail: employeeData?.email,
            id: mainMethod?.contentId,
          },
        } );
      }
      if ( mainMethod?.type === "concept_primer" ) {
        const response: any = await fetchConceptPrimerByContentId( {
          contentId: mainMethod?.contentId,
          userId: user?.id,
          programId: user?.activeProgramId,
          goalId: goal?.id,
          methodTitle: mainMethod?.title,
        } );
        if ( !response?.contentLink?.startsWith( "http" ) ) {
          toast.error( "Content is not available yet" );
          return;
        }
        if ( mainMethod?.status !== "COMPLETED" ) {
          const response = await completeMethodStatus( {
            programId: user?.activeProgramId,
            goalId: goal?.id,
            methodId: mainMethod?.id,
            milestoneId: milestone?.id,
            userId: user?.id
          } );
          handleChange();

        }
        if ( response?.openNewTab?.toLowerCase() === "yes" ) {
          window.open( response?.contentLink, "_blank" );
          return;
        }
        setIFrameTitle( mainMethod?.title );
        //   setIFrameLink(supportingMethod?.contentLink);
        setIFrameLink( response?.contentLink );
        setMediaType( response?.mediaType )
        getIFrame( e );
      }
      if ( mainMethod?.type === "event_select_slots" ) {
        if (
          mainMethod?.userMethodContentId !== null &&
          mainMethod.userMethodContentId?.length !== 0
        ) {
          router.push( {
            pathname: "/events",
            query: {
              id: mainMethod?.userMethodContentId,
            },
          } );
        } else {
          router.push( {
            pathname: "pre-events",
            query: {
              id: mainMethod?.contentId,
              role: "PARTICIPANT",
              goalId: goal?.id,
              milestoneId: milestone?.id,
              methodId: mainMethod?.id,
            },
          } );
        }
      }
      if ( mainMethod?.type === "event_presecheduled" ) {
        console.log( mainMethod, "dsdhvjdfshkknbfkjkbsbjf" );
        if (
          mainMethod?.userMethodContentId !== null &&
          mainMethod?.userMethodContentId?.length !== 0
        ) {
          router.push( {
            pathname: "/events",
            query: {
              id: mainMethod?.userMethodContentId,
            },
          } );
        } else {
          const response = await fetchUserEventId( {
            userId: user?.id,
            methodId: mainMethod?.id,
            milestoneId: milestone?.id,
            goalId: goal?.id,
            programId: user?.activeProgramId,
            eventConfigId: mainMethod?.contentId,
          } );
          //@ts-ignore
          if ( response.statusCode === 0 ) {
            router.push( {
              pathname: "/events",
              query: {
                //@ts-ignore
                id: response?.response,
              },
            } );
          } else {
            toast.error( "Event has not been configured" );
            return;
          }
        }
      }
      if (
        mainMethod?.type === "assess2" &&
        currentUserRole === MANAGER_VIEW_STATE.LP
      ) {
        window.location.replace(
          `${ ASSESSMENT_BASE_URL }/initiate/?programId=${ user?.activeProgramId
          }&userId=${ user?.id }&userName=${ user?.name }&firebaseId=${ firebaseUser?.uid
          }&email=${ user?.email }&testId=${ mainMethod?.contentId
          }&programName=${ "PROGRAM NAME" }&goalId=${ goal?.id }&goalName=${ goal?.name
          }&milestoneId=${ milestone?.id }&milestoneName=${ milestone?.statement
          }&mainMethodId=${ mainMethod?.id }&mainMethodName=${ mainMethod?.title
          }&lpId=${ user?.id
          }&token=NA&redirectUrl=https://n4-devapp.web.app/achieve`
        );
      } else {
        if ( mainMethod?.type === "assess2" ) {
          toast.error(
            "This functionality is only available to " + employeeData?.name,
            { toastId: "DONT_SHOW_TO_OTHER_ROLES" }
          );
        }
      }

      if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
        logUserEngagement( {
          userId: user?.id,
          //@ts-ignore
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "curiosity",
          action: "employee_clicked_mainmethod",
          //@ts-ignore
          contentName: mainMethod?.type,
          contentId: mainMethod?.contentId,
          milestoneId: milestone?.id,
          marks: 2,
        } );
      }
      // handleChange();
    } catch ( error ) {
      console.log( error );
    } finally {
      setMainMethodCallLoading( false );
    }
  };

  const onSupportingMethodAssessment = async ( { supportingMethod }: any ) => {
    window.location.replace(
      `${ ASSESSMENT_BASE_URL }/initiate/?programId=${ user?.activeProgramId
      }&userId=${ user?.id }&userName=${ user?.name }&firebaseId=${ firebaseUser?.uid
      }&email=${ user?.email }&testId=${ supportingMethod?.contentId
      }&programName=${ "PROGRAM NAME" }&goalId=${ goal?.id }&goalName=${ goal?.name
      }&milestoneId=${ milestone?.id }&milestoneName=${ milestone?.statement
      }&lpId=${ user?.id }&token=NA&redirectUrl=https://n4-devapp.web.app/achieve`
    );
  };

  return (
    <>
      <Stack flexDirection="row" gap="16px" key={ milestone?.id }>
        <Stack alignItems="center">
          <Typography
            //@ts-ignore
            variant="span"
            sx={ {
              fontWeight: "600",
              border:
                mainMethodStatus === "completed"
                  ? "1px solid #2DC887"
                  : mainMethodStatus === "in_progress"
                    ? "1px solid #EFD02E"
                    : "1px dashed #1C2129",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                mainMethodStatus === "completed"
                  ? "#2DC887"
                  : mainMethodStatus === "in_progress"
                    ? "#EFD02E"
                    : "transparent",
              color:
                mainMethodStatus === "completed"
                  ? "#DFFFF2"
                  : mainMethodStatus === "in_progress"
                    ? "#FDF9E4"
                    : "#1C2129",
            } }
          >
            { mainMethodStatus === "completed" ? (
              <CheckIcon />
            ) : mainMethodStatus === "in_progress" ? (
              <CachedIcon />
            ) : (
              currentIndex + 1
            ) }
          </Typography>
          { milestonesCount - 1 === currentIndex ? (
            ""
          ) : (
            <hr className="accordion_hr" />
          ) }
        </Stack>
        <Accordion
          className="achieve_accordion"
          expanded={ expanded }
          sx={ {
            "&.MuiAccordion-root": {
              borderRadius: "8px",
              border: "1px solid #EAECEF",
              boxShadow: "0px 2px 10px rgba(21, 16, 88, 0.1)",
              width: "100%",
              marginBottom: "16px",
            },
          } }
        >
          {/*@ts-ignore */ }
          <AccordionSummary
            sx={ {
              pointerEvents: "none",
              "& .MuiAccordionSummary-content": {
                flexDirection: "column",
              },
            } }
            aria-controls={ milestone.id }
            id={ milestone.id }
            className="accordAchieve"
            sheet_status={ milestone.sheetStatus }
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap="16px"
            >
              <Box>
                <Typography
                  sx={ {
                    fontSize: "13px",
                    color: "#1C2129",
                    fontWeight: "500",
                  } }
                >
                  <span style={ { color: "#989EA5" } }>Milestone</span> -{ " " }
                  { milestone?.statement } |{ " " }
                  <span style={ { color: "black" } }>
                    { mainMethod?.duration ? mainMethod?.duration : "15" } mins
                  </span>
                </Typography>
                <Stack className="achieve_milestone_flx">
                  { mainMethod?.startDate && new Date( mainMethod?.startDate ).getFullYear() < 2100 && <Typography className="achv_strt_dt_tym">Start Date : { getDate( mainMethod?.startDate ) }</Typography> }
                  { mainMethod?.endDate && new Date( mainMethod?.endDate ).getFullYear() < 2100 && <Typography className="achv_end_dt_tym">End Date : { getDate( mainMethod?.endDate ) }</Typography> }</Stack>
              </Box>
              <Box>
                { mainMethodCallLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    sx={ {
                      color:
                        mainMethodStatus === "completed"
                          ? "#F58A43"
                          : "#FFFFFF",
                      backgroundColor:
                        mainMethodStatus === "completed"
                          ? "transparent"
                          : "#F58A43",
                      border: "2px solid #F58A43",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor:
                          mainMethodStatus === "completed"
                            ? "transparent"
                            : "#F58A43",
                        boxShadow: "none",
                      },
                      textTransform: "capitalize",
                      "&.MuiButton-root": {
                        fontSize: "12px",
                        width: "140px",
                        padding: "6px",
                        pointerEvents: "auto",
                      },
                    } }
                    onClick={ ( e ) => onMainMethodCall( e ) }
                  >
                    { mainMethodStatus === "completed"
                      ? mainMethod?.buttonLabelCompleted
                        ? mainMethod?.buttonLabelCompleted
                        : mainMethod?.buttonLabel
                      : mainMethod?.buttonLabel }
                  </Button>
                ) }
              </Box>
            </Stack>
            { ( mainMethod?.type === "test" && mainMethod?.resultStatus ) &&
              <>
                { mainMethod?.resultStatus === "PASS" && <Stack className="score_card_tag kudos">
                  <img src="../images/icons/kudos.svg" alt="kudos" width={ 16 } height={ 16 }></img>
                  <Typography className="score_card_tag_txt kudos">{ mainMethod?.resultStatement }</Typography>
                </Stack> }
                { mainMethod?.resultStatus === "TRY_AGAIN" && <Stack className="score_card_tag try_again">
                  <img src="../images/icons/try-again.svg" alt="try again" width={ 16 } height={ 16 }></img>
                  <Typography className="score_card_tag_txt try_again">{ mainMethod?.resultStatement }</Typography>
                </Stack> }
                { mainMethod?.resultStatus === "FAIL" && <Stack className="score_card_tag no_attempts_left">
                  <img src="../images/icons/no-attempts-left.svg" alt="no attempts left" width={ 16 } height={ 16 }></img>
                  <Typography className="score_card_tag_txt no_attempts_left">{ mainMethod?.resultStatement }</Typography>
                </Stack> }
              </> }
            { supportingMethods.length > 0 && <Stack flexDirection="row" gap="15px" mt="15px">
              <Stack
                flexDirection="row"
                gap="0px"
                alignItems="center"
                sx={ { pointerEvents: "auto" } }
                onClick={ () => {
                  setExpanded( !expanded );
                } }
              >
                { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                <Typography
                  sx={ {
                    fontSize: "12px",
                    color: "#2E5DB0",
                    fontWeight: "500",
                  } }
                >
                  Learn More
                </Typography>
              </Stack>
            </Stack> }
          </AccordionSummary>
          { supportingMethods && supportingMethods?.length > 0 && <AccordionDetails
            sx={ { padding: "24px", borderTop: "1px solid #EAECEF" } }
            className="addtnl_rscrs_detls"
          >
            { supportingMethods.length > 0 && (
              supportingMethods.map(
                ( supportingMethod: any, index: number, achieveArr: any ) => {
                  console.log( "supportingMethod 123457", supportingMethod );
                  if ( supportingMethod?.type === "concept_primer" ) {
                    //@ts-ignore
                    return (
                      <InlineConceptPrimer
                        setIFrameTitle={ setIFrameTitle }
                        setIFrameLink={ setIFrameLink }
                        setMediaType={ setMediaType }
                        getIFrame={ getIFrame }
                        supportingMethod={ supportingMethod }
                        mainMethod={ mainMethod }
                        goal={ goal }
                        key={ index }
                        milestone={ milestone }
                      />
                    );
                  }
                  if ( supportingMethod?.type === "assess2" ) {
                    return (
                      <Stack
                        flexDirection="row"
                        gap="4px"
                        alignItems="center"
                        onClick={ () =>
                          onSupportingMethodAssessment( supportingMethod )
                        }
                        key={ index }
                        sx={ { cursor: "pointer" } }
                      >
                        <FiberManualRecordIcon
                          style={ {
                            width: "15px",
                            height: "15px",
                            color: "#C8CDD4",
                          } }
                        />
                        <div
                          //@ts-ignore
                          // href={supportingMethod?.contentLink}
                          target="extrnlCntnt"
                          //@ts-ignore
                          datatitle={ supportingMethod?.title }
                          rel="noopener noreferrer nofollow"
                          style={ {
                            fontSize: "13px",
                            color: "#2E5DB0",
                            textDecoration: "none",
                          } }
                        // onClick={(e) => onLinkClick(e)}
                        >
                          { supportingMethod?.duration
                            ? `${ supportingMethod?.title } | ${ supportingMethod?.duration } mins`
                            : supportingMethod?.title }
                        </div>
                      </Stack>
                    );
                  }
                  if ( supportingMethod?.type === "work_sheet" ) {
                    return (
                      <Stack
                        flexDirection="row"
                        gap="4px"
                        alignItems="center"
                        onClick={ () =>
                          router.push( {
                            pathname: "/prepare",
                            query: {
                              goalId: goal?.id,
                              milestoneId: milestone?.id,
                              milestoneName: milestone?.statement,
                              methodId: supportingMethod?.id,
                              methodType: "supportingMethod",
                              worksheetId: supportingMethod?.userMethodContentId
                                ? supportingMethod?.userMethodContentId
                                : supportingMethod?.contentId,
                              pickWorksheetFrom:
                                supportingMethod?.userMethodContentId
                                  ? "user_work_sheet"
                                  : "work_sheet",
                              employeeEmail: employeeData?.email,
                              id: supportingMethod?.contentId,
                            },
                          } )
                        }
                        key={ index }
                        sx={ { cursor: "pointer" } }
                      >
                        <FiberManualRecordIcon
                          style={ {
                            width: "15px",
                            height: "15px",
                            color: "#C8CDD4",
                          } }
                        />
                        <div
                          //@ts-ignore
                          // href={supportingMethod?.contentLink}
                          target="extrnlCntnt"
                          //@ts-ignore
                          datatitle={ supportingMethod?.title }
                          rel="noopener noreferrer nofollow"
                          style={ {
                            fontSize: "13px",
                            color: "#2E5DB0",
                            textDecoration: "none",
                          } }
                        // onClick={(e) => onLinkClick(e)}
                        >
                          { supportingMethod?.duration
                            ? `${ supportingMethod?.title } | ${ supportingMethod?.duration } mins`
                            : supportingMethod?.title }
                        </div>
                      </Stack>
                    );
                  }
                }
              )
            )
              // : (
              //   <Stack
              //     flexDirection="row"
              //     justifyContent="space-between"
              //     alignItems="center"
              //     className="addtnl_rscrs"
              //   >
              //     <Box>
              //       <Stack flexDirection="row" gap="20px" alignItems="center">
              //         <Typography sx={{ fontSize: "13px", color: "#989EA5" }}>
              //           No Additional Resources Available
              //         </Typography>
              //       </Stack>
              //     </Box>
              //   </Stack>
              // )
            }
          </AccordionDetails> }
        </Accordion>
      </Stack>
    </>
  );
};

export default Milestone;
