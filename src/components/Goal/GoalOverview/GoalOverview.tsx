import {
  Button,
  Box,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { produce } from "immer";
import CircularProgress from "@mui/material/CircularProgress";

import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAlignUserGoals } from "../../../actions/user/fetchUserGoals";
import { fetchQuestionSet } from "../../../actions/user/fetchQuestionSet";
import { fetchQuestionById } from "../../../actions/goalOverview/fetchQuestionById";
import { addGoalAlignmentQuestionAnswer } from "../../../actions/goalOverview/addGoalAnswer";
import { fetchAnsweredQuestions } from "../../../actions/goalOverview/fetchAnsweredQuestions";
import { clearGoalAnswers } from "../../../actions/goalOverview/clearGoalAnswers";
import { updateUserGoalEmotion } from "../../../actions/goalOverview/updateUserGoalEmotion";
import { BorderLinearProgress } from "../BorderLinearProgress/BorderLinearProgress";
import { theme } from "../../Align/theme";
import { fetchUserGoal } from "../../../actions/align/fetchUserGoal";
import { updateUserGoalAlignQuestions } from "../../../actions/align/updateUserGoalAlignQuestions";
import Spinner from "../../common/Spinner/Spinner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { updateShowGoalOverviewNworxUser } from "../../../actions/user/updateShowGoalOverviewNworxUser";
import { getRouterParamFromAsPath } from "../../../utils/getRouterParam";
import { createPost } from "../../../actions/align/posts/createPost";
import { logUserEngagement } from "../../../actions/actionCenter/logUserEngagement";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import { updateUserActionToCompleted } from "../../../actions/actionCenter/updateUserActionToCompleted";
import { fetchAlignQuestions } from "../../../actions/align/fetchAlignQuestions";
import CustomQuestion from "./CustomQuestion";
import { ALIGN_QUESTION_TYPES } from "../../../constants/customAlignQuestionType";
import { updateCustomUserGoalAlignQuestions } from "../../../actions/align/updateCustomUserGoalAlignQuestions";

const GoalOverview = () => {
  const router = useRouter();
  const [ goal, setGoal ] = useState<any>( null );
  const [ goalLoading, setGoalLoading ] = useState( false );
  const [ questionSet, setQuestionSet ] = useState<any>( null );
  const [ selectedEmotion, setSelectedEmotion ] = useState<any>( null );
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState<any>( 0 );
  const [ currentAnswer, setCurrentAnswer ] = useState( "" );
  const [ loading, setLoading ] = useState( false );
  const [ submitDisabled, setSubmitDisabled ] = useState( true );
  const [ addGoalEmployeeQuestion, setAddGoalEmployeeQuestion ] = useState<any>( null );
  const [ alignmentQuestions, setalignmentQuestions ] = useState<any>( [] );


  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const actionId = router?.query?.actionCompleteId;
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  useEffect( () => {
    const fetchEmployeeAddGoalQuestion = async () => {
      const response = await fetchAlignQuestions( { programId: user?.activeProgramId, type: ALIGN_QUESTION_TYPES.ADD_GOAL_EMPLOYEE_RESPONSE } );

      console.log( response, "fetchAlignQuestions ADD_GOAL_EMPLOYEE_QUESION response" )
      setAddGoalEmployeeQuestion( response );
    }
    if ( !goal?.purposeStatus )
      fetchEmployeeAddGoalQuestion();
  }, [ goal ] );

  //@ts-ignore
  const firebaseUser = useSelector( ( state ) => state?.auth?.firebaseUser );

  const questions: any = {
    Alarming: [
      "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?",
      "What are you committing to do, that can improve the achievement odds of this changed goal?",
    ],
    Concerning: [
      "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?",
      "What are you committing to do, that can improve the achievement odds of this changed goal?",
    ],
    Okay: [
      "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?",
      "What are you committing to do, that can improve the achievement odds of this changed goal?",
    ],
    Encouraging: [
      "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?",
      "What are you committing to do, that can improve the achievement odds of this changed goal?",
    ],
    Exciting: [
      "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?",
      "What are you committing to do, that can improve the achievement odds of this changed goal?",
    ],
  };

  const question1 = "How do you feel about taking on this Goal?";

  const [ answer1, setAnswer1 ] = useState( "" );
  const [ answer2, setAnswer2 ] = useState( "" );
  const [ answer3, setAnswer3 ] = useState( "" );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  const startDate = new Date( goal?.startDate );
  const endDate = new Date( goal?.endDate );

  useEffect( () => {
    if ( goal ) {
      if ( goal?.answer1 ) {
        setAnswer1( goal?.answer1 );
      }
      if ( goal?.answer2 ) {
        setAnswer2( goal?.answer2 );
      }
      if ( goal?.answer3 ) {
        setAnswer3( goal?.answer3 );
      }
    }
  }, [ goal ] );

  console.log( goal, "goalinalign" )

  useEffect( () => {
    if ( answer1 !== "" && answer2 !== "" && answer3 !== "" ) {
      setSubmitDisabled( false );
    } else {
      setSubmitDisabled( true );
    }
  }, [ answer1, answer2, answer3 ] );

  useEffect( () => {
    const allQuestionsAnswered = addGoalEmployeeQuestion?.every( ( question: any ) => question.answer );
    setSubmitDisabled( !allQuestionsAnswered );
  }, [ addGoalEmployeeQuestion ] )
  useEffect( () => {
    let question: { title: any; description: any; }[] = [];
    if ( program?.configMap?.customAlignQuestion ) {
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
  }, [ goal, program ] )
  console.log( alignmentQuestions, goal, "adityaprabhdvdsd" );

  //   const onNextClick = async (question: any, questionIndex: number) => {
  //     try {
  //       const response = await addGoalAlignmentQuestionAnswer({
  //         emotion: selectedEmotion?.emotion,
  //         answerOption: currentAnswer,
  //         // answerOptionOrder: currentAnswer?.optionOrder,
  //         // nextQuestionId: currentAnswer?.nextQuestionId,
  //         goalId,
  //         programId: user?.activeProgramId,
  //         // userId: nWorxUser?.id,
  //         userId: user?.id,
  //         questionId: question?.id,
  //         questionName: question?.name,
  //       });
  //       console.log(response, "response");
  //       const nextState = produce((questions, draft: any) => {
  //         // draft?.[selectedEmotion?.emotion]?.[questionIndex]?.answer =
  //         //   currentAnswer;
  //         console.log(draft, "draft");
  //         // draft.push({title: "Tweet about it"})
  //       });
  //       setQuestions({ ...questions });
  //       setCurrentQuestionIndex(currentQuestionIndex + 1);

  //       setCurrentAnswer("");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const setCustomQuestion = async () => {
    console.log( addGoalEmployeeQuestion, "addGoalEmployeeQuestion1234" );
    const response = await updateCustomUserGoalAlignQuestions( {
      userId: user?.id,
      goalId: goal?.id,
      programId: user?.activeProgramId,
      customQuestionsObj: addGoalEmployeeQuestion
    } )
    if ( response ) {
      let typeAttributesObj: any = {};
      addGoalEmployeeQuestion?.forEach( ( question: any, index: number ) => {
        typeAttributesObj[ `${ index }_answer` ] = question.answer;
        typeAttributesObj[ `${ index }_question` ] = question.question;
      } );
      typeAttributesObj[ "type" ] = "CUSTOM_GOAL_OVERVIEW_POST";
      typeAttributesObj[ "size" ] = addGoalEmployeeQuestion?.length + "";
      console.log( typeAttributesObj, 'typeAttributesObj' );
      await createPost( {
        userId: user?.id,
        programId: user?.activeProgramId,
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
        postedToName: user?.manager,
        postedToUserId: user?.primaryManagerUserId,
        postedToRole: "MANAGER",
      } );
      await updateShowGoalOverviewNworxUser( false, user?.id );

      if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
        logUserEngagement( {
          userId: user?.id,
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "engagement",
          action: "employee_aligned",
          contentName: goal?.name,
          contentId: "NA",
          milestoneId: "NA",
          marks: 6,
        } );
      }

      toast.success( "Your goal definition info has been shared with your manager.", {
        toastId: "GOAL_OVERVIEW_ON_FINISH",
      } );
      //@ts-ignore
      if ( response?.statusCode === 2 ) {
        console.log( response );
        //@ts-ignore
        toast.error( response?.error, { toastId: "GOAL_OVERVIEW_ON_ERROR" } );
      }
      router.push( "/align" );
    }
    if ( router?.query?.actionCompleteId ) {
      //@ts-ignore
      await updateUserActionToCompleted(
        actionId
      );
    }
  }
  const onFinishClick = async () => {
    console.log( "clicked !!!!" );
    if ( program?.configMap?.customAlignQuestion ) {
      setCustomQuestion();
      return;
    }
    try {
      setLoading( true );
      console.log( "on finish click", {
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        userId: user?.id,
        goalId: goal?.id,
        programId: user?.activeProgramId,
      } );
      const response: any = await updateUserGoalAlignQuestions( {
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        userId: user?.id,
        goalId: goal?.id,
        programId: user?.activeProgramId,
      } );
      //@ts-ignore
      if ( response ) {
        console.log( response, "updateUserGoalAlignQuestions" );
        //@ts-ignore
        if ( response?.statusCode === 0 ) {
          await createPost( {
            userId: user?.id,
            programId: user?.activeProgramId,
            userGoalId: goal?.id,
            type: "ALIGN",
            title: "Test Title",
            text: "This is post text",
            subText: "This is post sub text",
            typeAttributes: {
              // questionAnswerArray: [
              //   {
              //     question: question1,
              //     answer: answer1,
              //   },
              //   { question: questions?.[answer1]?.[0], answer: answer2 },
              //   { question: questions?.[answer1]?.[1], answer: answer3 },
              // ],
              question1: question1,
              answer1: answer1,
              question2: questions?.[ answer1 ]?.[ 0 ],
              answer2: answer2,
              question3: questions?.[ answer1 ]?.[ 1 ],
              answer3: answer3,
              type: "GOAL_OVERVIEW_POST",
            },
            postedByUserId: user?.id,
            postedByName: user?.name,
            postedByDesignation: user?.designation,
            postedByRole: currentUserRole,
            postedByEmail: user?.email,
            id: new Date().valueOf().toString(),
            postedToName: user?.manager,
            postedToUserId: user?.primaryManagerUserId,
            postedToRole: "MANAGER",
          } );
          //@ts-ignore
          // let  = await firebaseUser.getIdToken().then(function(idToken){
          //   return idToken
          // })
          await updateShowGoalOverviewNworxUser( false, user?.id );

          if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
            logUserEngagement( {
              userId: user?.id,
              goalId: goal?.id,
              programId: user?.activeProgramId,
              type: "engagement",
              action: "employee_aligned",
              contentName: goal?.name,
              contentId: "NA",
              milestoneId: "NA",
              marks: 6,
            } );
          }

          toast.success( "Your goal definition info has been shared with your manager.", {
            toastId: "GOAL_OVERVIEW_ON_FINISH",
          } );
          //@ts-ignore
          if ( response?.statusCode === 2 ) {
            console.log( response );
            toast.error( response?.error, { toastId: "GOAL_OVERVIEW_ON_ERROR" } );
          }
          router.push( "/align" );
        }
      }

      if ( router?.query?.actionCompleteId ) {
        //@ts-ignore
        await updateUserActionToCompleted(
          actionId
        );
      }

      setLoading( false );
    } catch ( error ) {
      console.log( error );
      setLoading( false );
    }
  };

  //let alignmentQuestions: any=goal?.purposeQuestionAnswer
  //  ? Object.keys(goal?.purposeQuestionAnswer).map(
  //    (alignmentQuestion: any,index: number) => {
  //      return {
  //        title: alignmentQuestion,
  //        description: goal?.purposeQuestionAnswer[alignmentQuestion],
  //      };
  //    }
  //  )
  //  :[];

  // GET QUESTION SET (FIRST SET OF EMOTIONS)
  useEffect( () => {
    const getQuestionSet = async () => {
      if ( user?.activeProgramId ) {
        try {

          //@ts-ignore
          const response = await fetchQuestionSet( {
            programId: user?.activeProgramId,

          } );
          //@ts-ignore
          if ( response?.questionSet ) {
            //@ts-ignore
            setQuestionSet( response?.questionSet );
          }
        } catch ( error ) {
          console.log( error );
        }
      }
    };
    getQuestionSet();
  }, [ user?.activeProgramId ] );


  // GET GOAL DETAILS
  useEffect( () => {
    const goalId = router?.query?.goalId;
    const fetchGoalDetails = async () => {
      setGoalLoading( true );
      if ( router?.asPath ) {
        try {
          const response = await fetchUserGoal( {
            userId: user?.id,
            programId: user?.activeProgramId,
            userGoalId: goalId,
          } );
          //@ts-ignore
          if ( response?.userGoal ) {
            //@ts-ignore
            setGoal( response?.userGoal );
          }
        } catch ( error ) {
          console.log( error );
        }
      }
      console.log( "fetching details", goalId );
      if ( !goalId ) {
        console.log( "not goal id" );
        try {
          //   setLoading(true);
          //@ts-ignore


          const userGoals = await fetchAlignUserGoals( {
            userId: user?.id,
            programId: user?.activeProgramId,

          } );

          console.log( userGoals, " USER GOALS" );
          //@ts-ignore
          if ( userGoals?.length ) {
            //@ts-ignore
            setGoal( userGoals[ 0 ] );
          } else {
            // setLoading(false);
            router.push( "/action-center" );
          }
          //   setLoading(false);
        } catch ( error ) {
          //   setLoading(false);
          console.log( error );
        }
      }
      setGoalLoading( false );
    };
    fetchGoalDetails();
  }, [ router, router.isReady, router?.query?.goalId ] );

  console.log( submitDisabled, "submit disabled" );

  useEffect( () => {
    if ( router?.asPath ) {
      const goalId = getRouterParamFromAsPath( "goalId", router?.asPath );
      if ( !user.showGoalOverview && !goalId ) {
        router.push( "/action-center" );
        toast.error( "Goal Overview only accessible with a valid goal", {
          toastId: "NO_GOAL_GOAL_OVERVIEW",
        } );
      }
    }
  }, [ router, user ] );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Goal Preview</title>
        </Helmet>
      </HelmetProvider>
      <div className="modify-leftrigh-panel reviewpage">
        { goalLoading ? (
          <Box
            sx={ {
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            } }
          >
            <Spinner />
          </Box>
        ) : (
          <>
            <div className="modify-leftpanel">
              <div className="modfy-icons-holdead">
                <DialogTitle
                  sx={ {
                    color: "#252525",
                    textAlign: "left",
                    fontWeight: "700",
                    fontSize: { mobile: "18px", tablet: "31px" },
                    padding: "0 0 0px 0",
                  } }
                >
                  Take a look at one of your goals
                </DialogTitle>
              </div>
              <article className="gdnc-modal-subtxt modify-spl-marg">
                {/* {goal?.addedByRole === "SELF"
                  ? goal?.status === "APPROVED" ||
                    goal?.status === "AUTO_APPROVED"
                    ? `Approved by ${goal?.assignedBy}`
                    : `Added by ${goal?.assignedBy}, Approval pending`
                  : `Assigned by ${goal?.assignedBy}`}                  
                   */}
                { `Selected by: ${ goal?.assignedBy }` }
              </article>

              <div className="gl-modify-txtbox">
                <article className="gdnc-modal-headtxt txt-left">
                  { goal?.nameAlias ? goal?.nameAlias : goal?.name }
                </article>
                { goal?.topPriority && (
                  <article className="gl-modify-status">Top Priority</article>
                ) }
                <article className="gdnc-modal-subtxt modify-spl-marg">
                  { goal?.descriptionAlias
                    ? goal?.descriptionAlias
                    : goal?.description }
                </article>
                <article className="gdnc-modal-subtxt modify-spl-flx">
                  <span className="">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>{ " " }
                    { goal?.durationInDays } Days
                  </span>
                  <span className="">
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
                  </span>
                </article>
              </div>
              <div className="glmodify-subboxes-hold">
                { alignmentQuestions.map( ( item: any, key: number ) => {
                  return (
                    <div key={ key } className="gl-modify-txtbox2">
                      <article className="gdnc-modal-headtxt2 txt-left">
                        { item.title }
                      </article>
                      <article className="gdnc-modal-subtxt txt-left">
                        { item.description }
                      </article>
                    </div>
                  );
                } ) }
              </div>
            </div>
            { program?.configMap?.customAlignQuestion ?
              <CustomQuestion
                goal={ goal }
                addGoalEmployeeQuestion={ addGoalEmployeeQuestion }
                setAddGoalEmployeeQuestion={ setAddGoalEmployeeQuestion }
                classNames="modify-rightpanel reviewpage"
              /> :
              < div className="modify-rightpanel reviewpage">
                <div>
                  {/*<article className="textfield_label txt-left">
                    Alignment Score: { goal?.alignmentScore }%
                  </article>
                  <ThemeProvider theme={ theme }>
                    <BorderLinearProgress
                      //@ts-ignore
                      color="danger"
                      variant="determinate"
                      value={ goal?.alignmentScore || 0 }
                      sx={ {
                        color: ( theme: any ) =>
                          theme.palette.grey[
                          theme.palette.mode === "light" ? 200 : 800
                          ],
                      } }
                    />
                  </ThemeProvider>*/}
                  <article className="gdnc-modal-headtxt txt-left mar-t30">
                    What&apos;s your take on this Goal?
                  </article>
                  <div className="gl-modify-txtbox-clr">
                    <article className="gdnc-modal-headtxt2 txt-left">
                      Understand your Goal First!
                    </article>
                    <article className="gdnc-modal-subtxt txt-left">
                      It is important to read all the goal information before
                      you give your take on this goal.
                    </article>
                  </div>
                  { questionSet?.length ? (
                    <div className="gl-modify-txtbox-clr txtbox-clr2">
                      <article className="gdnc-modal-headtxt2 txt-left">
                        How do you feel about taking on this Goal?*
                      </article>
                      <div className="radios-back-bar"></div>
                      <div className="goal-feel-radios">
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={ answer1 }
                        >
                          { questionSet?.map( ( question: any, index: number ) => {
                            return (
                              <FormControlLabel
                                key={ index }
                                onClick={ ( e ) => {
                                  //@ts-ignore
                                  setSelectedEmotion( question );
                                  setAnswer1( question?.emotion );
                                } }
                                value={ question?.emotion }
                                control={ <Radio /> }
                                labelPlacement="bottom"
                                label={ question.emotion }
                              />
                            );
                          } ) }
                        </RadioGroup>
                      </div>
                    </div>
                  ) : null }
                  { answer1 && (
                    <SubjectiveQuestion
                      question={ questions?.[ answer1 ]?.[ 0 ] }
                      index={ 1 }
                      answer={ answer2 }
                      setAnswer={ setAnswer2 }
                    />
                  ) }
                  { answer1 && (
                    <SubjectiveQuestion
                      question={ questions?.[ answer1 ]?.[ 1 ] }
                      index={ 2 }
                      answer={ answer3 }
                      setAnswer={ setAnswer3 }
                    />
                  ) }
                  {/*{loading? (
                    <Spinner />
                  ):(
                    <Box sx={{display: "flex",justifyContent: "center"}}>
                      <Button
                        style={{
                          width: "180px",
                          margin: "30px auto 0 auto",
                        }}
                        variant="contained"
                        onClick={() => onFinishClick()}
                        sx={{
                          color: "#FFFFFF",
                          backgroundColor: "#F58A43",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#F58A43",
                            boxShadow: "none",
                          },
                          textTransform: "capitalize",
                        }}
                        disabled={submitDisabled}
                      >
                        Align
                      </Button>
                    </Box>
                  )}*/}
                </div>
              </div>
            }

          </>
        ) }
      </div >
      <div>
        { loading ? (
          <Spinner />
        ) : (
          <Box sx={ { display: "flex", justifyContent: "center" } }>
            <Button
              style={ {
                width: "180px",
                margin: "30px auto 0 auto",
              } }
              variant="contained"
              onClick={ () => onFinishClick() }
              sx={ {
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                },
                textTransform: "capitalize",
              } }
              disabled={ submitDisabled }
            >
              Share with Manager
            </Button>
          </Box>
        ) }
      </div>
    </>
  );
};

export default GoalOverview;

const SubjectiveQuestion = ( { question, index, answer, setAnswer }: any ) => {
  return (
    <Box sx={ { marginBottom: "24px", textAlign: "left" } }>
      <article className="statement_right_txtfld_lbl">{ question }*</article>
      <TextField
        id={ question }
        placeholder={ "Describe your thoughts here...." }
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={ 4 }
        inputProps={ {
          sx: {
            fontSize: "16px",
            color: "#5D636B",
            fontWeight: "400",
          },
        } }
        InputProps={ {
          sx: { padding: "0" },
          //   readOnly: true,
          endAdornment: <InputAdornment position="end"></InputAdornment>,
        } }
        // className="readOnlyInput"
        onChange={ ( e ) => {
          setAnswer( e.target.value );
        } }
        defaultValue={ answer }
        value={ answer }
      />
    </Box>
  );
};
