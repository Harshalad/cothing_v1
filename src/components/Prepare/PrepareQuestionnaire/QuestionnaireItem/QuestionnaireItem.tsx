import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PromptQuestionItem from "./PromptQuestionItem/PromptQuestionItem";
import { saveSectionQuestionAnswer } from "../../../../actions/prepare/saveSectionQuestionAnswer";
import { useSelector } from "react-redux";
import { saveSectionQuestionAnswerQuickPrep } from "../../../../actions/quickPrep/saveSectionQuestionAnswerQuickPrep";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { logUserEngagement } from "../../../../actions/actionCenter/logUserEngagement";
import Spinner from "../../../common/Spinner/Spinner";
import React from "react";
import { saveUserWorksheetEvent } from "../../../../actions/quickPrep/saveUserWorksheetEvent";
import { useRouter } from "next/router";
var prepPopupName = "";
const QuestionnaireItem = ( {
  closePopup,
  setPrepPopup,
  section,
  sectionIndex,
  open,
  goalId,
  milestoneId,
  methodId,
  methodType,
  worksheetId,
  sectionId,
  userWorkSheetId,
  currentPanel,
  setCurrentPanel,
  worksheet,
  setShowFinish,
  setPickWorksheetFrom,
  pageType,
  canEdit,
  empData,
  managerRater,
  unsavedChanges,
  onSetUnsavedChanges,
  event
}: any ) => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ onNextClickLoading, setOnNextClickLoading ] = useState( false );

  const [ localSection, setLocalSection ] = useState<any>( null );
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState( 0 );
  // const [currentPanel, setCurrentPanel] = useState("panel1");

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const userEventId = router?.query?.userEventId;
  const eventSectionId = router?.query?.eventSectionId
  const eventMethodId = router?.query?.eventMethodId;
  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );
  const permissions =
    roleBasedAccess?.[ currentUserRole ]?.permissions?.PREPARATION || [];
  const canView = () => {
    if ( currentUserRole === MANAGER_VIEW_STATE.MANAGER ) {
      return worksheet?.shareWithManager ? worksheet?.shareWithManager === "true" ? true : false : empData?.managerPermissions;
    } else if ( currentUserRole === MANAGER_VIEW_STATE.EXPERT ) {
      console.log( " empData?.expertPermissions ", empData?.expertPermissions );
      return empData?.expertPermissions;
    } else {
      return permissions.includes( "VIEW" );
    }
  };
  console.log( pageType, event, "pageTypeAdityaPageType" );
  useEffect( () => {
    if ( section ) {
      setLocalSection( section );
    }
    if ( section?.lastQuestionAnsweredIndex ) {
      setCurrentQuestionIndex( section?.lastQuestionAnsweredIndex );
    } else {
      setCurrentQuestionIndex( 0 );
    }
  }, [ section ] );

  const editSectionAnswers = () => {
    setCurrentQuestionIndex(
      section?.lastQuestionAnsweredIndex
        ? section?.lastQuestionAnsweredIndex - 1
        : 0
    );
  };
  const setOnsavechangesOn = () => {
    console.log( "0909" );
    onSetUnsavedChanges( true );
  };
  const setOnsavechangesoff = () => {
    console.log( "999" );
    onSetUnsavedChanges( false );
  };
  useEffect( () => {
    if ( localSection?.promptQuestionsMap?.[ currentQuestionIndex ]?.answer ) {
      // ()=> setOnsavechangesOn();
    }
  }, [ localSection?.promptQuestionsMap?.[ currentQuestionIndex ]?.answer ] );

  const onNextClick = async () => {
    setOnNextClickLoading( true );
    // setOnsavechangesoff();
    try {
      if (
        localSection?.promptQuestionsMap?.[ currentQuestionIndex ]?.answer !==
        null &&
        canEdit
      ) {
        setShowFinish( false );

        const questionsAnswersArray = localSection?.promptQuestionsMap?.map(
          ( promptQuestion: any, index: number ) => {
            return {
              question: promptQuestion?.question,
              answer: promptQuestion?.answer,
            };
          }
        );

        console.log( questionsAnswersArray, "QUESTIONS ANSWERS ARRAY " );

        const saveConfig = {
          userId: user?.id,
          programId: user?.activeProgramId,
          goalId,
          milestoneId,
          methodId,
          methodType,
          worksheetId,
          sectionId,
          userWorkSheetId: userWorkSheetId,
          questionsAnswersArray,
          // question:
          //   localSection?.promptQuestionsMap?.[currentQuestionIndex]?.question,
          // answer:
          //   localSection?.promptQuestionsMap?.[currentQuestionIndex]?.answer,
          lastQuestionAnsweredIndex: currentQuestionIndex + 1,
        };
        console.log( {
          worksheetId,
          userWorkSheetId: userWorkSheetId,
        } );
        console.log( pageType, "  " );
        const response =
          ( !event && pageType === "QUICK_PREPARATION" )
            ? saveSectionQuestionAnswerQuickPrep( saveConfig )
            : ( event && pageType === "QUICK_PREPARATION" )
              ? saveUserWorksheetEvent( {
                userId: user?.id,
                programId: user?.activeProgramId,
                worksheetId,
                sectionId,
                userWorkSheetId: userWorkSheetId,
                questionsAnswersArray,
                lastQuestionAnsweredIndex: currentQuestionIndex + 1,
                userEventId: userEventId,
                eventMethodId: eventMethodId,
                eventSectionId: eventSectionId,
              } )
              : saveSectionQuestionAnswer( saveConfig );

        setPickWorksheetFrom( "user_work_sheet" );

        if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
          logUserEngagement( {
            userId: user?.id,
            goalId: goalId,
            programId: user?.activeProgramId,
            type: "engagement",
            action: "employee_prep_question_answered",
            contentName: worksheet?.name,
            contentId: worksheetId,
            milestoneId: milestoneId,
            marks: 1,
          } );
        }
      }

      setLocalSection( {
        ...localSection,
        lastQuestionAnsweredIndex: currentQuestionIndex + 1,
      } );

      if (
        currentUserRole === MANAGER_VIEW_STATE.LP &&
        sectionIndex + 1 === worksheet?.sections?.length
      ) {
        if (
          currentQuestionIndex + 1 >=
          localSection?.promptQuestionsMap.length
        ) {
          setShowFinish( true );
          console.log( " debug condition satisfied" );
        }
      }

      setCurrentQuestionIndex( currentQuestionIndex + 1 );
    } catch ( error ) {
      console.log( error );
    } finally {
      setOnNextClickLoading( false );
    }
  };

  // useEffect(() => {
  //   if (localSection?.prompQuestionsMap?.length) {
  //     let count = 0;
  //     localSection?.prompQuestionsMap?.map(
  //       (questionAnswerObject: any, index: number) => {
  //         if (questionAnswerObject?.answer) {
  //           count++;
  //         }
  //       }
  //     );
  //     setCurrentQuestionIndex(count);
  //   }
  // }, []);

  // const toggleAccordion = (panel: any) => {
  //   if (panel !== null && panel !== "") {
  //     var accordionStatus = (
  //       document.getElementById(panel) as HTMLElement
  //     ).getAttribute("aria-expanded");
  //     setCurrentPanel(accordionStatus === "false" ? panel : false);
  //   }
  // };

  console.log( currentQuestionIndex, "current question index" );
  console.log( localSection, "local section" );
  return (
    <Accordion
      key={ sectionIndex }
      //@ts-ignore
      expanded={ currentPanel === `panel${ sectionIndex + 1 }` }
      onChange={ () => {
        if ( currentPanel === `panel${ sectionIndex + 1 }` ) {
          setCurrentPanel( "" );
        } else {
          setCurrentPanel( `panel${ sectionIndex + 1 }` );
        }
        // toggleAccordion(`panel${sectionIndex + 1}`);
        //}
      } }
    >
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon /> }
        aria-controls={ `panel${ sectionIndex + 1 }` }
        id={ `panel${ sectionIndex + 1 }` }
      >
        <Typography className="prep_accord_title">
          { sectionIndex + 1 }. { section?.name }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <>
          { currentQuestionIndex >= localSection?.promptQuestionsMap?.length ? (
            <Box
              className="prep_accrod_cnt_box prep_quest_prvw"
            // sx={{ minWidth: "650px" }}
            >
              <EditIcon
                className="edit_btn"
                onClick={ () => editSectionAnswers() }
              />
              { localSection &&
                localSection?.promptQuestionsMap &&
                localSection?.promptQuestionsMap?.map(
                  ( questionAnswerObject: any, index: number ) => {
                    return (
                      <>
                        { " " }
                        { questionAnswerObject?.answer !== "" &&
                          questionAnswerObject?.answer !== null ? (
                          <>
                            <Typography className="prep_accrod_content">
                              { canView()
                                ? questionAnswerObject?.answer
                                : "*You do not have permission to view this*" }
                            </Typography>
                            <Divider className="prep_quest_prvw_hr" />
                          </>
                        ) : (
                          ""
                        ) }
                      </>
                    );
                  }
                ) }
            </Box>
          ) : (
            <>
              { localSection?.description.trim().length ? (
                <Box className="prep_accrod_cnt_box">
                  <Typography className="prep_accrod_content">
                    { localSection?.description
                      .split( "|" )
                      .map( ( part: any, index: any ) => (
                        <React.Fragment key={ index }>
                          { part }
                          <br />
                        </React.Fragment>
                      ) ) }
                  </Typography>
                </Box>
              ) : null }
              <Box className="prep_quest_answ_box">
                { worksheet && typeof localSection?.promptQuestionsMap === "object" &&
                  localSection?.promptQuestionsMap?.map(
                    ( questionAnswerObject: any, index: number ) => {
                      if ( currentQuestionIndex < index ) return <></>;
                      return (
                        <>
                          <PromptQuestionItem
                            questionAnswerObject={ questionAnswerObject }
                            localSection={ localSection }
                            setLocalSection={ setLocalSection }
                            promptQuestion={ questionAnswerObject?.question }
                            key={ index }
                            index={ index }
                            canEdit={ canEdit }
                            canView={ canView() }
                          />
                          { currentQuestionIndex === index && (
                            <Box className="prep_quest_btn">
                              { onNextClickLoading ? (
                                <Spinner />
                              ) : (
                                <Button
                                  sx={ {
                                    color: "#FFFFFF",
                                    backgroundColor: "#F58A43",
                                    boxShadow: "none",
                                    "&:hover": {
                                      backgroundColor: "#F58A43",
                                      boxShadow: "none",
                                    },
                                    textTransform: "none",
                                    width: "105px !important",
                                  } }
                                  onClick={ () => onNextClick() }
                                >
                                  { index + 1 ===
                                    Object.keys( section?.promptQuestionsMap )
                                      ?.length &&
                                    sectionIndex + 1 ===
                                    worksheet?.sections?.length
                                    ? "Done"
                                    : "Next" }
                                </Button>
                              ) }
                            </Box>
                          ) }
                        </>
                      );
                    }
                  ) }
              </Box>
            </>
          ) }
        </>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionnaireItem;
