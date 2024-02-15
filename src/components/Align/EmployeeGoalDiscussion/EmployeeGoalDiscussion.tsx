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
import {Helmet,HelmetProvider} from "react-helmet-async";
import {produce} from "immer";
import CircularProgress from "@mui/material/CircularProgress";

import {styled} from "@mui/material/styles";
import {createTheme,ThemeProvider} from "@mui/material/styles";
import {useCallback,useEffect,useState} from "react";
import {useSelector} from "react-redux";
import {fetchAlignUserGoals} from "../../../actions/user/fetchUserGoals";
import {fetchQuestionSet} from "../../../actions/user/fetchQuestionSet";
import {fetchQuestionById} from "../../../actions/goalOverview/fetchQuestionById";
import {addGoalAlignmentQuestionAnswer} from "../../../actions/goalOverview/addGoalAnswer";
import {fetchAnsweredQuestions} from "../../../actions/goalOverview/fetchAnsweredQuestions";
import {clearGoalAnswers} from "../../../actions/goalOverview/clearGoalAnswers";
import {updateUserGoalEmotion} from "../../../actions/goalOverview/updateUserGoalEmotion";
import {BorderLinearProgress} from "./BorderLinearProgress/BorderLinearProgress";
import {theme} from "../../Align/theme";
import {fetchUserGoal} from "../../../actions/align/fetchUserGoal";
import {updateUserGoalAlignQuestions} from "../../../actions/align/updateUserGoalAlignQuestions";
import Spinner from "../../common/Spinner/Spinner";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {updateShowGoalOverviewNworxUser} from "../../../actions/user/updateShowGoalOverviewNworxUser";
import {getRouterParamFromAsPath} from "../../../utils/getRouterParam";
import {approveOrRejectEmployeeGoal} from "../../../actions/align/approveOrRejectEmployeeGoal";
import React from "react";

const EmployeeGoalDiscussion=() => {
  const router=useRouter();
  const [goal,setGoal]=useState<any>(null);
  const [goalLoading,setGoalLoading]=useState(false);
  const [questionSet,setQuestionSet]=useState<any>(null);
  const [selectedEmotion,setSelectedEmotion]=useState<any>(null);
  const [questions,setQuestions]=useState<any>([]);
  const [currentQuestionIndex,setCurrentQuestionIndex]=useState<any>(0);
  const [currentAnswer,setCurrentAnswer]=useState("");
  const [loading,setLoading]=useState(false);
  const [submitDisabled,setSubmitDisabled]=useState(true);
  const isManager=router?.query?.isManager;
  const employeeId=router?.query?.employeeId;
  const employeeProgramId=router?.query?.employeeProgramId;
  const goalId=router?.query?.goalId;
  const actionId=router?.query?.actionId;

  const question1="How do you feel about taking on this Goal?";
  const question2=
    "What would you like to see changed in this goal, so that you could be more effective or so that work would be more satisfying?";
  const question3=
    "What are you committing to do, that can improve the achievement odds of this changed goal?";

  const [answer1,setAnswer1]=useState("");
  const [answer2,setAnswer2]=useState("");
  const [answer3,setAnswer3]=useState("");

  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);
  const [flag,setflag]=useState(false);
  const startDate=new Date(goal?.startDate);
  const endDate=new Date(goal?.endDate);

  useEffect(() => {
    if(goal) {
      if(goal?.answer1) {
        setAnswer1(goal?.answer1);
      }
      if(goal?.answer2) {
        setAnswer2(goal?.answer2);
      }
      if(goal?.answer3) {
        setAnswer3(goal?.answer3);
      }
    }
  },[goal]);

  useEffect(() => {
    if(answer1!==""&&answer2!==""&&answer3!=="") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  },[answer1,answer2,answer3]);

  const onApprove=async () => {
    try {
      const response=await approveOrRejectEmployeeGoal({
        isApproved: true,
        employeeId,
        employeeProgramId,
        employeeGoalId: goalId,
        managerName: user?.name,
      });

      if(response) {
        toast.success("User goal approved",{
          toastId: "GOAL_DISCUSSION_APPROVED",
        });
        router?.push("/action-center");
      }

      console.log(response);
    } catch(error) {
      console.log(error);
    }
  };

  const onReject=async () => {
    try {
      const response=await approveOrRejectEmployeeGoal({
        isApproved: false,
        employeeId,
        employeeProgramId,
        employeeGoalId: goalId,
        managerName: user?.name,
      });
      if(response) {
        toast.success("User goal rejected",{
          toastId: "GOAL_DISCUSSION_REJECTED",
        });
        router?.push("/action-center");
      }

      console.log(response);
    } catch(error) {
      console.log(error);
    }
  };

  let alignmentQuestions: any=goal?.purposeQuestionAnswer
    ? Object.keys(goal?.purposeQuestionAnswer).map(
      (alignmentQuestion: any,index: number) => {
        return {
          title: alignmentQuestion,
          description: goal?.purposeQuestionAnswer[alignmentQuestion],
        };
      }
    )
    :[];



  // GET QUESTION SET (FIRST SET OF EMOTIONS)
  useEffect(() => {
    const getQuestionSet=async () => {
      if(employeeProgramId) {
        try {

          //@ts-ignore
          const response=await fetchQuestionSet({
            programId: employeeProgramId,

          });
          //@ts-ignore
          if(response?.questionSet) {
            //@ts-ignore
            setQuestionSet(response?.questionSet);
          }
        } catch(error) {
          console.log(error);
        }
      }
    };
    getQuestionSet();
  },[employeeProgramId]);

  // GET GOAL DETAILS
  useEffect(() => {
    // const goalId = getRouterParamFromAsPath("goalId", router?.asPath);
    const fetchGoalDetails=async () => {
      setGoalLoading(true);
      //   if (router?.asPath) {
      try {
        const response=await fetchUserGoal({
          userId: employeeId,
          programId: employeeProgramId,
          userGoalId: goalId,
        });
        setflag(true);
        //@ts-ignore
        if(response?.userGoal) {
          //@ts-ignore
          setGoal(response?.userGoal);
        }
      } catch(error) {
        console.log(error);
      }
      setGoalLoading(false);
    };
    fetchGoalDetails();
  },[router?.isReady]);
  console.log(goal,"goal");

  console.log(submitDisabled,"submit disabled");

  useEffect(() => {
    if(flag) {
      if(router?.asPath) {
        const goalId=router?.query?.goalId;
        if(!goalId) {
          router.push("/action-center");
          toast.error("Goal Overview only accessible with a valid goal",{
            toastId: "NO_GOAL_GOAL_OVERVIEW",
          });
        }
      }
    }
  },[router,user,flag]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Goal Preview</title>
        </Helmet>
      </HelmetProvider>
      <div className="modify-leftrigh-panel reviewpage">
        {goalLoading? (
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </Box>
        ):(
          <>
            <div className="modify-leftpanel">
              <div className="modfy-icons-holdead">
                <DialogTitle
                  sx={{
                    color: "#252525",
                    textAlign: "left",
                    fontWeight: "700",
                    fontSize: {mobile: "18px",tablet: "31px"},
                    padding: "0 0 0px 0",
                  }}
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
                  : `Assigned by ${goal?.assignedBy}`} */}
                {`Selected by: ${goal?.assignedBy}`} adity
              </article>

              <div className="gl-modify-txtbox">
                <article className="gdnc-modal-headtxt txt-left">
                  {goal?.name}
                </article>
                {goal?.topPriority&&(
                  <article className="gl-modify-status">Top Priority</article>
                )}
                <article className="gdnc-modal-subtxt modify-spl-marg">
                  {goal?.description}
                </article>
                <article className="gdnc-modal-subtxt modify-spl-flx">
                  <span className="">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                    {goal?.durationInDays} Days
                  </span>
                  <span className="">
                    From :{" "}
                    {startDate.toLocaleDateString("en-GB",{
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    &nbsp;&nbsp;&nbsp;Till :{" "}
                    {endDate.toLocaleDateString("en-GB",{
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </article>
              </div>
              <div className="glmodify-subboxes-hold">
                {alignmentQuestions.map((item: any,key: number) => {
                  return (
                    <div key={key} className="gl-modify-txtbox2">
                      <article className="gdnc-modal-headtxt2 txt-left">
                        {item.title}
                      </article>
                      <article className="gdnc-modal-subtxt txt-left">
                        {item.description}
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
            {
              <div className="modify-rightpanel reviewpage">
                <div>
                  <article className="textfield_label txt-left">
                    Alignment Score: {goal?.alignmentScore}%
                  </article>
                  <ThemeProvider theme={theme}>
                    <BorderLinearProgress
                      //@ts-ignore
                      color="danger"
                      variant="determinate"
                      value={goal?.alignmentScore||0}
                      sx={{
                        color: (theme: any) =>
                          theme.palette.grey[
                          theme.palette.mode==="light"? 200:800
                          ],
                      }}
                    />
                  </ThemeProvider>
                  <article className="gdnc-modal-headtxt txt-left mar-t30">
                    What&apos;s your take on this Goal?
                  </article>
                  {/* <div className="gl-modify-txtbox-clr">
                    <article className="gdnc-modal-headtxt2 txt-left">
                      Understand your Goal First!
                    </article>
                    <article className="gdnc-modal-subtxt txt-left">
                      It is important to read all the goal information before
                      you give your take on this goal.
                    </article>
                  </div>
                  {questionSet?.length ? (
                    <div className="gl-modify-txtbox-clr txtbox-clr2">
                      <article className="gdnc-modal-headtxt2 txt-left">
                        How do you feel about taking on this Goal?
                      </article>
                      <div className="radios-back-bar"></div>
                      <div className="goal-feel-radios">
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={answer1}
                        >
                          {questionSet?.map((question: any, index: number) => {
                            return (
                              <FormControlLabel
                                key={index}
                                // onClick={(e) => {
                                //   //@ts-ignore
                                //   setSelectedEmotion(question);
                                //   setAnswer1(question?.emotion);
                                // }}
                                value={question?.emotion}
                                control={<Radio />}
                                labelPlacement="bottom"
                                label={question.emotion}
                              />
                            );
                          })}
                        </RadioGroup>
                      </div>
                    </div>
                  ) : null}
                  <SubjectiveQuestion
                    question={question2}
                    index={1}
                    answer={answer2}
                    setAnswer={setAnswer2}
                  />
                  <SubjectiveQuestion
                    question={question3}
                    index={2}
                    answer={answer3}
                    setAnswer={setAnswer3}
                  /> */}
                  {loading? (
                    <Spinner />
                  ):goal?.status==="APPROVED"||
                    goal?.status==="AUTO_APPROVED"||
                    goal?.status==="REJECTED"? (
                    <div>
                      <p>{goal?.status}</p>
                    </div>
                  ):(
                    <Box sx={{display: "flex",justifyContent: "center"}}>
                      <Button
                        style={{
                          width: "180px",
                          margin: "30px auto 0 auto",
                        }}
                        variant="contained"
                        onClick={() => onApprove()}
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
                      // disabled={submitDisabled}
                      >
                        Approve
                      </Button>
                      <Button
                        style={{
                          width: "180px",
                          margin: "30px auto 0 auto",
                        }}
                        variant="contained"
                        onClick={() => onReject()}
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
                      // disabled={submitDisabled}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </div>
              </div>
            }
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeGoalDiscussion;

const SubjectiveQuestion=({question,index,answer,setAnswer}: any) => {
  return (
    <Box sx={{marginBottom: "24px",textAlign: "left"}}>
      <article className="statement_right_txtfld_lbl">{question}</article>
      <TextField
        id={question}
        placeholder={"Describe your thoughts here...."}
        variant="outlined"
        size="small"
        fullWidth
        multiline
        rows={4}
        inputProps={{
          sx: {
            fontSize: "16px",
            color: "#5D636B",
            fontWeight: "400",
          },
        }}
        InputProps={{
          sx: {padding: "0"},
          readOnly: true,
          endAdornment: <InputAdornment position="end"></InputAdornment>,
        }}
        className="readOnlyInput"
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        defaultValue={answer}
        value={answer}
      />
    </Box>
  );
};
