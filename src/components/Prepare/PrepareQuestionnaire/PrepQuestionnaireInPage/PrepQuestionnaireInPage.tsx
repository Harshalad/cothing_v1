import { useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogContent,
  LinearProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SubmitPrepPopUp from "../../SubmitPrepPopUp/SubmitPrepPopUp";
import QuestionnaireItem from "../QuestionnaireItem/QuestionnaireItem";
import { completeUserWorksheet } from "../../../../actions/prepare/completeUserWorksheet";
import { useSelector } from "react-redux";
import PostsSection from "../../../common/Posts/PostsSection";
import RatingComp from "../../RatingComp/RatingComp";
import AskComp from "../../AskComp/AskComp";
import { requestRating } from "../../../../actions/prepare/rating/requestRating";
import { toast } from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { updateRatingRequestToDone } from "../../../../actions/prepare/rating/updateRatingRequestToDone";
import { createPost } from "../../../../actions/align/posts/createPost";
import ExpertRating from "../../ExpertRating/ExpertRating";
import ManagerRating from "../../ManagerRating/ManagerRating";
import { fetchRatingRequests } from "../../../../actions/prepare/rating/fetchRatingRequests";
import { fetchRatingRequestQp } from "../../../../actions/quickPrep/rating/fetchRatingRequest";
import { requestRatingQp } from "../../../../actions/quickPrep/rating/requestRating";
import { useRouter } from "next/router";
import { completeUserWorksheetQuickPrep } from "../../../../actions/quickPrep/completeUserWorksheetQuickPrep";
import PrepShare from "../../../ShareWithManager/PrepShare";
var prepPopupName = "";
const PrepQuestionnaireInPage = ( {
  preparePage,
  closePopup,
  open,
  openQuestionnairePopup,
  worksheet,
  goalId,
  milestoneId,
  methodId,
  methodType,
  worksheetId,
  pickWorksheetFrom,
  userWorkSheetId,
  currentPanel,
  setCurrentPanel,
  setPickWorksheetFrom,
  displayMode,
  setDisplayMode,
  DISPLAY_MODES,
  collaborators,
  employeeData,
  pageType,
  canEdit,
  unsavedChanges,
  onSetUnsavedChanges,
  shareManager,
  setShareManager
}: any ) => {
  console.log( pageType, "collaboratorscollaborators" );
  const [ event, setEvent ] = useState<any>( pageType === "EVENT" ? true : false );
  console.log( pageType, event, "collaboratorscollaborators" );

  const [ expanded, setExpanded ] = useState( false );
  const [ showPrepOnePreview, setPrepOnePreview ] = useState( false );
  const [ showPrepPopup, setPrepPopup ] = useState( false );
  const [ showFinish, setShowFinish ] = useState( false );
  const [ selectedCollaborator, setSelectedCollaborator ] = useState<any>( null );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ requestFeedbackLoading, setRequestFeedbackLoading ] = useState( false );
  const closePrepPopup = ( value: any ) => {
    setPrepPopup( value );
  };
  const [ managerRater, setManagerRater ] = useState( null );
  const [ ratingRequests, setRatingRequests ] = useState<any>( null );

  console.log( "canEdit 123456", canEdit );
  pageType === "EVENT" ? pageType = "QUICK_PREPARATION" : null;


  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const getRatingRequests = useCallback( async () => {
    try {
      // if (currentUserRole !== MANAGER_VIEW_STATE.LP) return;
      if ( userWorkSheetId ) {
        const response = preparePage
          ? await fetchRatingRequests( userWorkSheetId )
          : await fetchRatingRequestQp( {
            userWorksheetId: userWorkSheetId,
            userId: user?.id,
            programId: user?.activeProgramId,
          } );
        if ( response !== null ) {
          setRatingRequests( response );
        }
      }
    } catch ( error ) {
      console.log( error );
    }
  }, [ userWorkSheetId ] );

  useEffect( () => {
    getRatingRequests();
  }, [ getRatingRequests ] );
  console.log( "prepkaiandarinprep" );

  useEffect( () => {
    if ( ratingRequests?.length ) {
      const founRatingsObj = ratingRequests.find(
        ( ratingRequestObj: any ) =>
          ratingRequestObj?.raterId === user?.id &&
          ratingRequestObj?.status === "rating_requested"
      );
      console.log( founRatingsObj, "foundRatingsObj" );
      setManagerRater( founRatingsObj );
    }
  }, [ ratingRequests ] );

  useEffect( () => {

    const completeWorksheet = async () => {
      console.log( showFinish, "eventShoeFinsh" );
      try {
        if ( showFinish ) {
          const response = preparePage
            ? await completeUserWorksheet( {
              uwid: userWorkSheetId,
            } )
            : await completeUserWorksheetQuickPrep( {
              uwid: userWorkSheetId,
              userId: user?.id,
              programId: user?.activeProgramId,
            } );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    completeWorksheet();
  }, [ showFinish ] );

  // useEffect(() => {
  //   if (
  //     worksheet?.progressPercentage === 100 ||
  //     worksheet?.status?.toUpperCase() === "COMPLETED"
  //   ) {
  //     setShowFinish(true);
  //   }
  // }, [worksheet?.progressPercentage, worksheet?.status]);

  const askManagerForFeedbackPrepare = async () => {
    try {
      setRequestFeedbackLoading( true );
      const response = await requestRating(
        userWorkSheetId,
        selectedCollaborator?.userId,
        selectedCollaborator?.userName,
        selectedCollaborator?.collaboratorRole
      );

      if ( response ) {
        toast.success( "Request for feedback sent successfully!", {
          toastId: "FEEDBACK_REQ_SENT",
        } );
      }
    } catch ( error ) {
      console.log( error );
    } finally {
      setRequestFeedbackLoading( false );
    }
  };
  const askManagerForFeedbackQp = async () => {
    try {
      setRequestFeedbackLoading( true );
      const response = await requestRatingQp( {
        userWorksheetId: userWorkSheetId,
        raterId: selectedCollaborator?.userId,
        raterName: selectedCollaborator?.userName,
        raterRole: selectedCollaborator?.collaboratorRole,
        userId: user?.id,
        programId: user?.activeProgramId,
      } );

      if ( response ) {
        toast.success( "Request for feedback sent successfully!", {
          toastId: "FEEDBACK_REQ_SENT",
        } );
      }
    } catch ( error ) {
      console.log( error );
    } finally {
      setRequestFeedbackLoading( false );
    }
  };

  return (
    <>
      {/* <Dialog
        className="prep_modal  addFlex"
        open={open.showPrepQuestionnaire}
        sx={{ textAlign: "center", padding: "30px" }}
      > */}
      {/*<CloseIcon
        style={ {
          position: "absolute",
          top: "15px",
          right: "15px",
          zIndex: "1",
          cursor: "pointer",
        } }
        onClick={ () => {
          closePopup( false );
          setExpanded( false );
          setDisplayMode( DISPLAY_MODES.MILE_MARKERS );
        } }
      />*/}
      <DialogContent className="prep_modal_content" sx={ { marginTop: "30px" } }>
        <Stack
          flexDirection="row"
          alignItems="center"
          className="goal_dtls_flex gap"
        >
          <Box className="popup_left_box bgcolor addFlex">
            { worksheet?.sections?.map( ( section: any, index: number ) => {
              return (
                <QuestionnaireItem
                  key={ index }
                  sectionIndex={ index }
                  showPrepOnePreview={ showPrepOnePreview }
                  setPrepOnePreview={ setPrepOnePreview }
                  section={ section }
                  closePopup={ closePopup }
                  expanded={ expanded }
                  setExpanded={ setExpanded }
                  setPrepPopup={ setPrepPopup }
                  open={ open }
                  goalId={ goalId }
                  milestoneId={ milestoneId }
                  methodId={ methodId }
                  methodType={ methodType }
                  worksheetId={ worksheetId }
                  sectionId={ section?.id }
                  userWorkSheetId={ userWorkSheetId }
                  currentPanel={ currentPanel }
                  setCurrentPanel={ setCurrentPanel }
                  worksheet={ worksheet }
                  setShowFinish={ setShowFinish }
                  setPickWorksheetFrom={ setPickWorksheetFrom }
                  pageType={ pageType }
                  canEdit={ canEdit }
                  empData={ employeeData }
                  managerRater={ managerRater }
                  unsavedChanges={ unsavedChanges }
                  onSetUnsavedChanges={ onSetUnsavedChanges }
                  event={ event }
                />
              );
            } ) }
            { showFinish && currentUserRole === MANAGER_VIEW_STATE.LP ? (
              <>
                <Box>
                  <Typography className="sbmt_prep_title">
                    The completed preparation will be sent to the{ " " }
                    { user?.noAlignRequired ? "" : "manager and" } expert
                  </Typography>
                  { collaborators?.length ? (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      gap="15px"
                      mb="24px"
                    >
                      <RadioGroup
                        row
                        aria-labelledby="manager-achieve"
                        name="prep-mngr-exprt-feedback"
                        value={ selectedCollaborator }
                      >
                        { collaborators?.map(
                          ( collaborator: any, index: number ) => {
                            const alreadyRequested = ratingRequests?.find(
                              ( alreadyRequestedCollaborator: any ) =>
                                alreadyRequestedCollaborator?.raterId ===
                                collaborator?.userId &&
                                alreadyRequestedCollaborator?.status ===
                                "rating_requested"
                            );
                            return (
                              <FormControlLabel
                                key={ index }
                                onClick={ ( e ) => {
                                  //@ts-ignore
                                  setSelectedCollaborator( collaborator );
                                } }
                                value={ collaborator }
                                control={
                                  <Radio
                                    size="small"
                                    sx={ {
                                      color: "#989EA5",
                                      "&.Mui-checked": { color: "#F58A43" },
                                    } }
                                    className="prep_mngr_exprt_radiolbl"
                                  />
                                }
                                labelPlacement="bottom"
                                label={ `${ collaborator?.userName }
                                  ${ collaborator?.collaboratorLabel } ${ alreadyRequested ? "(Already requested)" : ""
                                  }
                                `}
                                checked={ selectedCollaborator === collaborator }
                              />
                            );
                          }
                        ) }
                      </RadioGroup>
                    </Stack>
                  ) : (
                    ""
                  ) }
                  { requestFeedbackLoading ? (
                    <Spinner />
                  ) : (
                    <Box
                      className="sbmt_prep_btn"
                      sx={ { display: "flex", justifyContent: "center" } }
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
                          textTransform: "none",
                          padding: "12px 32px !important",
                          width: "max-content !important",
                        } }
                        onClick={ () => {
                          preparePage
                            ? askManagerForFeedbackPrepare()
                            : askManagerForFeedbackQp();
                        } }
                        disabled={ !selectedCollaborator }
                      >
                        Ask for feedback
                      </Button>
                    </Box>
                  ) }
                </Box>
              </>
            ) : null }
          </Box>
          { worksheet && !worksheet?.aiWorksheet && <div className="rating_flex_prepare">
            <RatingComp
              preparePage
              expertRatings={ worksheet?.expertRatings }
              employeeData={ employeeData }
              userWorkSheetId={ userWorkSheetId }
              worksheet={ worksheet }
              pageType={ pageType }
            />
            { currentUserRole === MANAGER_VIEW_STATE.LP && pickWorksheetFrom === "user_work_sheet" && <PrepShare shareManager={ shareManager } setShareManager={ setShareManager } qp={ preparePage ? false : true } worksheetId={ userWorkSheetId } /> }
            <PostsSection
              preparePage
              type={ preparePage ? "PREPARE" : "QUICK_PREPARE" }
              userWorkSheetId={ userWorkSheetId }
              // reportee={reportee}
              reportee={ employeeData }
            />
            {/* <AskComp /> */ }
            { currentUserRole === MANAGER_VIEW_STATE.EXPERT && managerRater ? (
              <ExpertRating
                preparePage
                employeeData={ employeeData }
                userWorkSheetId={ userWorkSheetId }
                getRatingRequests={ getRatingRequests }
              />
            ) : null }
            { currentUserRole === MANAGER_VIEW_STATE.MANAGER && managerRater ? (
              <ManagerRating
                preparePage
                employeeData={ employeeData }
                userWorkSheetId={ userWorkSheetId }
                getRatingRequests={ getRatingRequests }
              />
            ) : null }
          </div> }
          {/* </div> */ }
        </Stack>
      </DialogContent>
      {/* </Dialog> */ }
      <SubmitPrepPopUp
        closePrepPopup={ closePrepPopup }
        openPrepPopup={ { showPrepPopup, prepPopupName } }
        openQuestionnairePopup={ openQuestionnairePopup }
        closePopup={ closePopup }
        setExpanded={ setExpanded }
        setPrepPopup={ setPrepPopup }
      />
    </>
  );
};
export default PrepQuestionnaireInPage;
