import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import EmployeeAlignGoalDiscussion from "../GoalOverviewModal/EmployeeAlignGoalDiscussion";
import AlignGoalUpdate from "../GoalOverviewModal/AlignGoalUpdate";
import PostsSection from "../../../common/Posts/PostsSection";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import ApproveRejectGoal from "../../../common/Posts/ApproveRejectGoal/ApproveRejectGoal";
import CustomQuestion from "../../../Goal/GoalOverview/CustomQuestion";
import { fetchAlignQuestions } from "../../../../actions/align/fetchAlignQuestions";
import { ALIGN_QUESTION_TYPES } from "../../../../constants/customAlignQuestionType";
import { createPost } from "../../../../actions/align/posts/createPost";
import { toast } from "react-toastify";
import { updateUserActionToCompleted } from "../../../../actions/actionCenter/updateUserActionToCompleted";
import { approveOrRejectEmployeeGoal } from "../../../../actions/align/approveOrRejectEmployeeGoal";
import { Spinner } from "@react-pdf-viewer/core";
import { fetchProgram, fetchProgramAPI } from "../../../../actions/align/fetchProgram";

interface GoalOverviewModalProps {
  showGoalOverview: boolean;
  setShowGoalOverview: React.Dispatch<React.SetStateAction<boolean>>;
  goal: any;
  showAskQuestion: boolean;
  type: any;
  reportee?: any;
  fetchDirectReports?: any;
  dontShowChat?: boolean;
}

const GoalOverviewModal = ( {
  showGoalOverview,
  setShowGoalOverview,
  goal,
  showAskQuestion,
  type,
  reportee,
  fetchDirectReports,
  dontShowChat,
}: GoalOverviewModalProps ) => {
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const [ addGoalEmployeeQuestion, setAddGoalEmployeeQuestion ] = useState<any>( null );
  //let alignmentQuestions: any=goal?.purposeQuestionAnswer
  //  ? Object.keys(goal?.purposeQuestionAnswer).map(
  //    (alignmentQuestion: any,index: number) => {
  //      return {
  //        title: alignmentQuestion,
  //        description: goal?.purposeQuestionAnswer[alignmentQuestion],
  //      };
  //    }
  //  )
  //  :goal?.managerAlignmentQuestions
  //    ? Object.keys(goal?.managerAlignmentQuestions).map(
  //      (alignmentQuestion: any,index: number) => {
  //        return {
  //          title: alignmentQuestion,
  //          description: goal?.managerAlignmentQuestions[alignmentQuestion],
  //        };
  //      }
  //    )
  //    :[];

  const startDate = new Date( goal?.startDate );
  const endDate = new Date( goal?.endDate );
  const [ showModifyAlign, setModifyAlign ] = useState( false );
  const [ showRejectTxtFld, setRejectTxtFld ] = useState( false );
  const [ rejectionReasonText, setRejectionReasonText ] = useState( "" );
  const [ rejectionLoading, setRejectionLoading ] = useState( false );
  const [ approvalLoading, setApprovalLoading ] = useState( false );
  const [ alignmentQuestions, setalignmentQuestions ] = useState<any>( [] );
  const [ disabled, setDisabled ] = useState( false );
  const [ userProgram, setUserProgram ] = useState<any>( null );
  const router = useRouter();
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  useEffect( () => {
    const setProgram = async () => {
      const response = await fetchProgramAPI( { programId: reportee?.programId } );
      console.log( response, reportee, goal, "fetchProgramAPIfetchProgramAPI" );
      if ( response ) {
        setUserProgram( response );
      }
    }
    if ( reportee ) {
      setProgram()
    } else {
      setUserProgram( program );
    }
  }, [ reportee, goal ] )
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const actionId = router?.query?.actionCompleteId;

  useEffect( () => {
    const isSubmitDisabled = addGoalEmployeeQuestion?.some(
      ( question: any ) =>
        question.mandatory &&
        ( question.answer === null || question.answer === undefined || question.answer.trim() === '' )
    );
    setDisabled( isSubmitDisabled );
  }, [ addGoalEmployeeQuestion ] )
  console.log( userProgram, goal, "ADITYAPRATAPSINGHLODHI" )
  useEffect( () => {
    let question: { title: any; description: any; }[] = [];
    if ( userProgram?.configMap?.customAlignQuestion ) {
      if ( goal?.addedByRole === "SELF" ) {
        question = goal?.addGoalEmployeeQuestion
          ? goal?.addGoalEmployeeQuestion.map( ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion?.question,
              description: alignmentQuestion?.answer,
            };
          } )
          : [];
      } else {
        question = goal?.addGoalManagerQuestion
          ? goal?.addGoalManagerQuestion.map( ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion?.question,
              description: alignmentQuestion?.answer,
            };
          } )
          : [];

      }
    } else {
      question = goal?.purposeQuestionAnswer
        ? Object.keys( goal?.purposeQuestionAnswer ).map(
          ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion,
              description: goal?.purposeQuestionAnswer[ alignmentQuestion ],
            };
          }
        )
        : goal?.managerAlignmentQuestions
          ? Object.keys( goal?.managerAlignmentQuestions ).map(
            ( alignmentQuestion: any, index: number ) => {
              return {
                title: alignmentQuestion,
                description: goal?.managerAlignmentQuestions[ alignmentQuestion ],
              };
            }
          )
          : [];
    }
    setalignmentQuestions( question );
  }, [ goal, userProgram ] )
  console.log( alignmentQuestions, goal, "adityaprabhdvdsd" );

  const onApprove = async () => {
    try {
      setApprovalLoading( true );
      const response = await approveOrRejectEmployeeGoal( {
        isApproved: true,
        employeeId: reportee?.userId,
        employeeProgramId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
        employeeGoalId: goal?.id,
        managerName: user?.name,
        customQuestionsObj: addGoalEmployeeQuestion
      } );
      if ( response ) {
        let typeAttributesObj: any = {};
        addGoalEmployeeQuestion?.forEach( ( question: any, index: number ) => {
          typeAttributesObj[ `${ index }_answer` ] = question.answer;
          typeAttributesObj[ `${ index }_question` ] = question.question;
        } );
        typeAttributesObj[ "type" ] = "CUSTOM_APPROVE_GOAL_POST";
        typeAttributesObj[ "size" ] = addGoalEmployeeQuestion?.length + "";
        console.log( typeAttributesObj, 'typeAttributesObj' );
        await createPost( {
          userId: reportee?.userId,
          programId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: typeAttributesObj,
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: reportee?.userName
            ? reportee?.userName
            : reportee?.name,
          postedToUserId: reportee?.userId ? reportee?.userId : reportee?.id,
          postedToRole: "LP",
        } );
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        if ( actionId ) {
          await updateUserActionToCompleted( actionId );
        }
        setApprovalLoading( false );
        router.push( "/align", { query: {} } );
        await fetchDirectReports();
        setShowGoalOverview( false );
        toast.success( "User goal approved", {
          toastId: "GOAL_DISCUSSION_APPROVED",
        } );
        // router?.push("/action-center");
      }

      console.log( response );
    } catch ( error ) {
      setApprovalLoading( false );
      console.log( error );
    }
  };
  console.log( goal, "goalgoalgoal" );

  const onReject = async () => {
    try {
      setRejectionLoading( true );
      const response = await approveOrRejectEmployeeGoal( {
        isApproved: false,
        employeeId: reportee?.userId,
        employeeProgramId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID,
        employeeGoalId: goal?.id,
        managerName: user?.name,
        customQuestionsObj: addGoalEmployeeQuestion
      } );
      if ( response ) {
        let typeAttributesObj: any = {};
        addGoalEmployeeQuestion?.forEach( ( question: any, index: number ) => {
          typeAttributesObj[ `${ index }_answer` ] = question.answer;
          typeAttributesObj[ `${ index }_question` ] = question.question;
        } );
        typeAttributesObj[ "type" ] = "CUSTOM_REJECTION_GOAL_POST";
        typeAttributesObj[ "size" ] = addGoalEmployeeQuestion?.length + "";

        typeAttributesObj[ "rejectionReason" ] = rejectionReasonText;
        await createPost( {
          userId: reportee?.userId,
          programId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: typeAttributesObj,
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: reportee?.userName
            ? reportee?.userName
            : reportee?.name,
          postedToUserId: reportee?.userId ? reportee?.userId : reportee?.id,
          postedToRole: "LP",
        } );
        setRejectionLoading( false );
        router.push( "/align", { query: {} } );
        await fetchDirectReports();
        setShowGoalOverview( false );
        toast.success( "User goal rejected", {
          toastId: "GOAL_DISCUSSION_REJECTED",
        } );
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        if ( actionId ) {
          await updateUserActionToCompleted( actionId );
        }
        // router?.push("/action-center");
      }

      console.log( response );
    } catch ( error ) {
      setRejectionLoading( false );
      console.log( error );
    }
  };
  const closeAlignGoalUpdate = ( value: any ) => {
    setModifyAlign( value );
  };
  useEffect( () => {
    const fetchEmployeeAddGoalQuestion = async () => {
      const response = await fetchAlignQuestions( { programId: program?.id, type: ALIGN_QUESTION_TYPES.ADD_GOAL_MANAGER_RESPONSE } );

      console.log( response, reportee, "fetchAlignQuestions ADD_GOAL_EMPLOYEE_QUESION response" )
      setAddGoalEmployeeQuestion( response );
    }
    fetchEmployeeAddGoalQuestion();
  }, [ goal ] );

  const openAlignGoal = ( value: any ) => {
    setShowGoalOverview( value );
  };

  return (
    <>
      <Dialog
        className="view_purpose_dialog addFlex"
        open={ showGoalOverview }
        sx={ {
          textAlign: "center",
          padding: "20px 80px",
        } }
      >
        <DialogContent>
          <CloseIcon
            style={ {
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: "1",
              cursor: "pointer",
            } }
            onClick={ () => {
              setShowGoalOverview( false );
            } }
          />
          <Stack
            flexDirection="row"
            alignItems="center"
            className="goal_dtls_flex"
          >
            <Box className="popup_left_box addFlex">
              <Stack
                flexDirection="row"
                alignItems="center"
                gap="15px"
                mb="30px"
                justifyContent="space-between"
              >
                <DialogTitle
                  id="title"
                  sx={ {
                    color: "#1C2129",
                    fontWeight: "700",
                    fontSize: { mobile: "18px", tablet: "25px" },
                    margin: "0 0 0px",
                    padding: "0 0 0px 0",
                    textAlign: "left",
                  } }
                >
                  {/* Goal Request */ }
                  Goal Details
                </DialogTitle>
                {/*{ currentUserRole === MANAGER_VIEW_STATE.LP ? (
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="8px"
                    sx={ { cursor: "pointer" } }
                    onClick={ () => {
                      router.push( {
                        pathname: "/goal/overview",
                        query: { goalId: goal?.id },
                      } );
                      setModifyAlign( true );
                      setShowGoalOverview( false );
                    } }
                  >
                    <img
                      src={ "/images/icons/align-opnion.svg" }
                      alt="modify goal emotion"
                      width={ 16 }
                      height={ 16 }
                    ></img>
                    <Typography
                      sx={ {
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#2E5DB0",
                      } }
                    >
                      How do you feel?
                    </Typography>
                  </Stack>
                ) : null }*/}
              </Stack>
              <Box className="gl-modify-txtbox">
                <article className="gdnc-modal-headtxt txt-left">
                  { goal?.nameAlias ? goal?.nameAlias : goal?.name }
                </article>

                { goal?.topPriority ? (
                  <article className="gl-modify-status">Top Priority</article>
                ) : null }
                <article className="gdnc-modal-subtxt modify-spl-marg">
                  { goal?.descriptionAlias
                    ? goal?.descriptionAlias
                    : goal?.description }
                </article>
                <article className="gdnc-modal-subtxt modify-spl-flx">
                  { goal?.durationInDays != 0 && <span className="">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>{ " " }
                    { goal?.durationInDays } Days
                  </span> }
                  { goal?.startDate && goal?.endDate && <span className="">
                    From :{ " " }
                    { startDate.toLocaleDateString( "en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    } ) }
                    &nbsp;&nbsp;&nbsp;Till :{ " " }
                    { endDate.toLocaleDateString( "en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    } ) }
                  </span> }
                </article>
              </Box>
              <Box className="glmodify-subboxes-hold">
                { alignmentQuestions &&
                  alignmentQuestions.map( ( item: any, key: number ) => {
                    return (
                      <Box key={ key } className="gl-modify-txtbox2">
                        <article className="gdnc-modal-headtxt2 txt-left">
                          { item.title }
                        </article>
                        <article className="gdnc-modal-subtxt txt-left">
                          { item.description }
                        </article>
                      </Box>
                    );
                  } ) }
              </Box>
            </Box>
            {/* {dontShowChat ? null : ( */ }
            { ( !program?.configMap.hasOwnProperty( "customAlignQuestion" ) || !program?.configMap?.customAlignQuestion || goal?.status === "IN_PROGRESS" || goal?.status === "APPROVED" || goal?.status === "REJECTED" || goal?.status === "ALIGNED" || goal?.status === "ASSIGNED" || goal?.status === "ADDED" || ( goal?.status === "SENT_FOR_APPROVAL" && ( currentUserRole === MANAGER_VIEW_STATE.LP || currentUserRole === MANAGER_VIEW_STATE.EXPERT ) ) ) &&
              <PostsSection
                type={ type }
                goal={ goal }
                showAskQuestion={ showAskQuestion }
                reportee={ reportee }
                fetchDirectReports={ fetchDirectReports }
                setShowGoalOverview={ setShowGoalOverview }
              />
            }

            { program?.configMap?.customAlignQuestion && goal?.status === "SENT_FOR_APPROVAL" && currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
              <Box
                className="popup_right_box bgcolor aligngl_dtls_popup_rght"
              >
                { program?.configMap?.customAlignQuestion && currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                  goal?.status === "SENT_FOR_APPROVAL" &&
                  <>
                    <CustomQuestion
                      goal={ goal }
                      addGoalEmployeeQuestion={ addGoalEmployeeQuestion }
                      setAddGoalEmployeeQuestion={ setAddGoalEmployeeQuestion }
                      classNames="mngralgn_takactn_box"
                    />
                    <Box className="mngralgn_takactn_box">
                      <Typography className="mngralgn_takactn_title">
                        { reportee?.userName } has added a new goal
                      </Typography>
                      <Typography className="mngralgn_takactn_subtitle">
                        Please take the required action for this goal
                      </Typography>
                      { approvalLoading ? (
                        <Spinner />
                      ) : (
                        <Stack className="mngralgn_takactn_cta_flex">
                          <Button
                            className="outlined_cta"
                            onClick={ () => {
                              onApprove();
                              setRejectTxtFld( false );
                            } }
                            disabled={ disabled }
                          >
                            Approve this Goal
                          </Button>
                          <Typography className="mngralgn_takactn_or">OR</Typography>
                          <Button
                            className="outlined_cta"
                            onClick={ () => setRejectTxtFld( true ) }
                            disabled={ disabled }
                          >
                            Reject this Goal
                          </Button>
                        </Stack>
                      ) }
                      { showRejectTxtFld === true ? (
                        <Box className="mngralgn_rjct_inpt_box" sx={ { marginTop: "24px" } }>
                          <Typography className="aligngl_quest_heading">
                            Please provide a reason for rejection
                          </Typography>
                          <Box className="algn_askqust_txtfld">
                            <TextField
                              id="aligngl_cmnt_txtfld"
                              placeholder="Write your reason here..."
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={ rejectionReasonText }
                              onChange={ ( e ) => setRejectionReasonText( e.target.value ) }
                              inputProps={ {
                                sx: { fontSize: "16px", color: "#1C2129" },
                              } }
                            />
                          </Box>
                          <Box className="standard_cta_box">
                            { rejectionLoading ? (
                              <Spinner />
                            ) : (
                              <Button
                                className="standard_cta"
                                disabled={ disabled }
                                onClick={ () => {
                                  if ( !rejectionReasonText ) {
                                    toast.error( "Please provide a rejection reason", {
                                      toastId: "REJECTION_REASON_NOT_GIVEN",
                                    } );
                                    return;
                                  }
                                  onReject();
                                  setRejectTxtFld( false );
                                } }
                              >
                                Reject
                              </Button>
                            ) }
                          </Box>
                        </Box>
                      ) : (
                        ""
                      ) }
                    </Box>
                  </>
                }
              </Box> }
            {/* <EmployeeAlignGoalDiscussion
            showAskQuestion={showAskQuestion}
            goal={goal}
          /> */}
          </Stack>
        </DialogContent>
      </Dialog>
      { showAskQuestion === false ? (
        <AlignGoalUpdate
          open={ showModifyAlign }
          // open={{showModifyAlign, popUpName}}
          //alignGoalId={goal.id}
          // alignGoalStatus={alignGoalStatus}
          goalTitle={ goal?.nameAlias ? goal?.nameAlias : goal?.name }
          goalSubTitle={ "Do you need guidance from your manager?" }
          closeAlignGoalUpdate={ closeAlignGoalUpdate }
          openAlignGoal={ openAlignGoal }
        />
      ) : (
        ""
      ) }
    </>
  );
};

export default GoalOverviewModal;
