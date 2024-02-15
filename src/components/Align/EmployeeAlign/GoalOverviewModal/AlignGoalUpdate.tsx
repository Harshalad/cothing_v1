import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  Stack,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  linearProgressClasses,
  CircularProgress,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
//import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { auth } from "../../firebase/firebase"
// import { authenticationService } from "../services/authentication/authenticationService";
// import { FetchProgramServiceClient } from "../proto/fetchProgram/fetch-program_grpc_web_pb";
// import { FetchProgramRequest } from "../proto/fetchProgram/fetch-program_pb";
// import { useLocation } from "react-router-dom";
// import { FetchQuestionServiceClient } from "../proto/fetchQuestion/fetch-question_grpc_web_pb";
// import { QuestionRequest } from "../proto/fetchQuestion/fetch-question_pb";
// import AlignmentQbjectiveQuestion from "./AlignmentObjectiveQuestion";
// import AlignmentSubjectQuestion from "./AlignmentSubjectQuestion";
//import { useNavigate } from "react-router-dom";
// import { UpdateUserProgramServiceClient } from "../proto/update-user-program/update-user-program_grpc_web_pb";
// import { addGoalAlignmentQuestionAnswerRequest } from "../proto/update-user-program/update-user-program_pb";
// import { UpdateNworxUserServiceClient } from "../proto/updateNworxUser/update-nworx-user_grpc_web_pb";
// import { UpdateRequest } from "../proto/updateNworxUser/update-nworx-user_pb";

interface EmployeeAlignEmotionProps {
  open: boolean;
  goalTitle: string;
  goalSubTitle: string;
  closeAlignGoalUpdate: any;
  openAlignGoal: any;
}

const AlignGoalUpdate = ({
  open,
  goalTitle,
  goalSubTitle,
  closeAlignGoalUpdate,
  openAlignGoal,
}: EmployeeAlignEmotionProps) => {
  {
    /* closeAlignGoalUpdate, open, openAlignGoal, alignGoalId, alignGoalStatus, goalTitle, goalSubTitle */
  }

  //const navigate = useNavigate();

  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [showPrpcess, setShowProcess] = useState(0);
  const [radioValue, setRadioValue] = useState("Neutral");
  //const location = useLocation();
  const [goal, setGoal] = useState();
  const [worried, setWorried] = useState("");
  const [excited, setExcited] = useState("");
  const [apprehensive, setApprehensive] = useState("");
  const [neutral, setNeutral] = useState("");
  const [nervous, setNervous] = useState("");
  const [question, setQuestion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [end, setEnd] = useState("Next");
  // const [managerAlignmentQuestions, setmanagerAlignmentQuestions] = useState([]);
  // const [userAlignmentQuestions, setUserAlignmentQuestions] = useState([]);

  // const theme = createTheme({
  //     palette: {
  //         danger: {
  //             main: "#E74649",
  //             contrastText: "#fff",
  //         },
  //         medium: {
  //             main: "#EFCE5B",
  //             contrastText: "#fff",
  //         },
  //         success: {
  //             main: "#21C262",
  //             contrastText: "#fff",
  //         },
  //     },
  // });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));

  // const fetchUserGoals = async () => {
  //     const data = location.state?.data;
  //     setGoal(data);
  //     const sDate = data.startDate;
  //     const ssdate = new Date(sDate);
  //     const eDate = data.endDate;
  //     const eedate = new Date(eDate);
  //     setEndDate(eedate.toLocaleDateString("en-US"));
  //     setStartDate(ssdate.toLocaleDateString("en-US"));
  //     const q = data.managerAlignmentQuestions;

  //     setmanagerAlignmentQuestions([]);
  //     for (const key in q) {
  //         setmanagerAlignmentQuestions((managerAlignmentQuestions) => [
  //             ...managerAlignmentQuestions,
  //             {
  //             text: key,
  //             status: q[key],
  //             },
  //       ]);
  //     }

  //     // setmanagerAlignmentQuestions(data.managerAlignmentQuestions);
  //     const request = new FetchProgramRequest();
  //     const user = authenticationService.getUser();
  //     request.setProgramid(user.activeProgramId);
  //     request.setDepartment(user.department);
  //     request.setUserid(user.id);

  //     await new FetchProgramServiceClient(
  //         "https://envoy-proxy-ji7zjwsata-uc.a.run.app",
  //         null,
  //         null
  //     ).fetchQuestionSet(request, {}, async (err, response) => {
  //         console.log("question set", JSON.parse(response));
  //         const ques = JSON.parse(response).response;
  //         ques.map((q) => {
  //             if (q.emotion === "Excited") {
  //                 setExcited(q.first_question_id);
  //             } else if (q.emotion === "Apprehensive") {
  //                 setApprehensive(q.first_question_id);
  //             } else if (q.emotion === "Neutral") {
  //                 setNeutral(q.first_question_id);
  //             } else if (q.emotion === "Nervous") {
  //                 setNervous(q.first_question_id);
  //             } else if (q.emotion === "Worried") {
  //                 setWorried(q.first_question_id);
  //             }
  //         });
  //         console.log(err);
  //     });
  // };

  // const fetchQuestion = async (quesId, isFirst) => {
  //     console.log("Next question id ", quesId);
  //     const request = new QuestionRequest();
  //     request.setId(quesId);
  //     await new FetchQuestionServiceClient(
  //         "https://envoy-proxy-ji7zjwsata-uc.a.run.app",
  //         null,
  //         null
  //     ).fetchQuestionById(request, {}, async (err, response) => {
  //         const parsedQuestion = JSON.parse(response);
  //         console.log("Fetch question by id - ", parsedQuestion.response);
  //         // setQuestion(JSON.parse(response).response.name);

  //         let options = [];
  //         parsedQuestion.response.options.map((ele) => {
  //             console.log("option - n", ele);
  //             options.push(ele);
  //         });

  //       // if(parsedQuestion.response.nextQuestionId === "END"){
  //       //   setEnd("FINISH");
  //       // }
  //       // else{
  //       //   setEnd("NEXT");
  //       // }

  //       if (isFirst === true) {
  //         setUserAlignmentQuestions([
  //             {
  //                 name: parsedQuestion.response.question,
  //                 id: parsedQuestion.response.id,
  //                 nextQuestionId: parsedQuestion.response.nextQuestionId,
  //                 type: parsedQuestion.response.type,
  //                 options: options,
  //             },
  //         ]);
  //       } else {
  //             setUserAlignmentQuestions((userAlignmentQuestions) => [
  //                 ...userAlignmentQuestions,
  //                 {
  //                     name: parsedQuestion.response.question,
  //                     id: parsedQuestion.response.id,
  //                     nextQuestionId: parsedQuestion.response.nextQuestionId,
  //                     type: parsedQuestion.response.type,
  //                     options: options,
  //                 },
  //             ]);
  //         }
  //     });
  // };

  // const onAnswer = (question, option) => {
  //     saveAnswer(question, option);
  //     let i = 0;
  //     for (let item of userAlignmentQuestions) {
  //         console.log("Comp", item.id, question.id);
  //         if (item.id === question.id) {
  //             break;
  //         }
  //         i++;
  //     }
  //     console.log("CVlaue of i", i);
  //     const newData = [];
  //     for (let j = 0; j <= i; j++) {
  //         newData.push(userAlignmentQuestions[j]);
  //     }
  //     setUserAlignmentQuestions(newData);

  //     const nextQuestionId = option.nextQuestionId;
  //     console.log("nextQuestionId", nextQuestionId);
  //     if (nextQuestionId === undefined) {
  //         //enble submit button
  //         setEnd("Finish");
  //     } else {
  //         setEnd("Next");
  //         fetchQuestion(nextQuestionId);
  //     }
  // };

  // const saveAnswer = async (question, answer) => {
  //     const request = new addGoalAlignmentQuestionAnswerRequest();
  //     request.setAnswer(answer.option);
  //     request.setAnsweroptionid(answer.optionOrder);
  //     request.setEmotion("");
  //     request.setNextquestionid(question.nextQuestionId);
  //     request.setQuestionid(question.id);
  //     request.setProgramid(authenticationService.getUser().activeProgramId);
  //     request.setUsergoalid(goal.id);
  //     request.setUserid(authenticationService.getUser().id);
  //     request.setQuestion(question.name);
  //     await new UpdateUserProgramServiceClient(
  //         "https://envoy-proxy-ji7zjwsata-uc.a.run.app",
  //         null,
  //         null
  //     ).addGoalAlignmentQuestionAnswer(request, {}, async (err, response) => {
  //         console.log("add answer", JSON.parse(response));
  //     });
  // };

  //   const clickNext = async () => {
  //     if (end === "Finish") {
  //       const request = new UpdateRequest();
  //       request.setId(authenticationService.getUser().id);
  //       let boolMap = request.getBoolfieldstoupdateMap();
  //       boolMap.set("showGoalOverview", false);
  //       await new UpdateNworxUserServiceClient(
  //         "https://envoy-proxy-ji7zjwsata-uc.a.run.app",
  //         null,
  //         null
  //       ).updateNworxUser(request, {}, async (err, response) => {
  //         console.log("updatee", response);
  //         console.log(err);
  //       });
  //       setShowSuccesModal(true);
  //     } else {
  //     }
  //   };

  useEffect(() => {
    // setTimeout(() => {
    //     fetchUserGoals();
    // }, 1000);
  }, []);

  function CircularProgressWithLabel(props: any) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          thickness={6}
          size={130}
          sx={{
            color: "#1BAD70",
          }}
          variant="determinate"
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Dialog
          open={open}
          aria-labelledby="title"
          aria-describedby="description"
          sx={{ textAlign: "center", padding: "30px" }}
          className="view_purpose_dialog addFlex"
        >
          <DialogContent sx={{ padding: "0 0 0px 0", marginBottom: "0px" }}>
            <CloseIcon
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: "1",
                cursor: "pointer",
              }}
              onClick={() => {
                closeAlignGoalUpdate(false);
                openAlignGoal(true);
              }}
            />
            <Stack
              flexDirection="row"
              alignItems="center"
              className="goal_dtls_flex"
            >
              <Box className="popup_left_box addFlex">
                <Box>
                  <DialogTitle
                    id="title"
                    sx={{
                      color: "#1C2129",
                      fontWeight: "700",
                      fontSize: { mobile: "18px", tablet: "25px" },
                      margin: "0 0 0px",
                      padding: "0 0 0px 0",
                      textAlign: "left",
                    }}
                  >
                    Start Alignment
                  </DialogTitle>
                  <Typography className="gdnc-modal-subtxt modify-spl-marg">
                    Assigned by your manager
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "left",
                    marginBottom: "24px",
                    background: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "32px",
                  }}
                >
                  <Typography className="view_purpose_title">
                    {goalTitle
                      ? goalTitle
                      : "Create a strategic network of the relationships to enhance business results."}
                  </Typography>
                  <Typography className="view_purpose_tag">
                    Top Priority
                  </Typography>
                  <Typography className="view_purpose_subtext">
                    {goalSubTitle
                      ? goalSubTitle
                      : "Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean." +
                        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.."}
                  </Typography>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="15px"
                    justifyContent="space-between"
                  >
                    <Stack flexDirection="row" alignItems="center" gap="15px">
                      <AccessTimeIcon />
                      <Typography className="view_purpose_days">
                        20 Days
                      </Typography>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" gap="15px">
                      <Box className="view_purpose_fromdate">
                        From : 26/07/23
                      </Box>
                      <Box className="view_purpose_tilldate">
                        Till : 12/08/23
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <Grid
                  sx={{
                    textAlign: "left",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  }}
                >
                  <Box className="view_purpose_boxes">
                    <Typography className="view_purpose_box_title">
                      Why It is Important?
                    </Typography>
                    <Typography className="view_purpose_box_subtext">
                      Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut
                      est praesent aenean.Lorem ipsum dolor{" "}
                    </Typography>
                  </Box>
                  <Box className="view_purpose_boxes">
                    <Typography className="view_purpose_box_title">
                      How can you achieve?
                    </Typography>
                    <Typography className="view_purpose_box_subtext">
                      Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut
                      est praesent aenean.Lorem ipsum dolor{" "}
                    </Typography>
                  </Box>
                  <Box className="view_purpose_boxes">
                    <Typography className="view_purpose_box_title">
                      What are the Benefits?
                    </Typography>
                    <Typography className="view_purpose_box_subtext">
                      Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut
                      est praesent aenean.Lorem ipsum dolor{" "}
                    </Typography>
                  </Box>
                  <Box className="view_purpose_boxes">
                    <Typography className="view_purpose_box_title">
                      Team Assistance
                    </Typography>
                    <Typography className="view_purpose_box_subtext">
                      Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut
                      est praesent aenean.Lorem ipsum dolor{" "}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box className="popup_right_box">
                <Box>
                  <article className="textfield_label txt-left">
                    Alignment Percentage {/* {goal && goal.alignmentScore} */}
                  </article>
                  {/* <ThemeProvider theme={theme}>
                                        <BorderLinearProgress
                                            color="danger"
                                            variant="determinate"
                                            value={10}
                                            sx={{
                                                color: (theme) =>
                                                theme.palette.grey[
                                                    theme.palette.mode === "light" ? 200 : 800
                                                ],
                                            }}
                                        />
                                    </ThemeProvider> */}
                  <article className="gdnc-modal-headtxt txt-left mar-t30">
                    What&apos;s your take on this Goal?
                  </article>
                  <Box className="gl-modify-txtbox-clr">
                    <article className="gdnc-modal-headtxt2 txt-left">
                      Understand your Goal First!
                    </article>
                    <article className="gdnc-modal-subtxt txt-left">
                      It is important to read all the goal information before
                      you start to give your feedback on this goal
                    </article>
                  </Box>
                  <Box className="gl-modify-txtbox-clr txtbox-clr2">
                    <article className="gdnc-modal-headtxt2 txt-left">
                      How do you feel about taking on this Goal?
                    </article>
                    <Box className="radios-back-bar"></Box>
                    <Box className="goal-feel-radios">
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          onClick={(e) => {
                            // setRadioValue(e.target.value);
                            setShowProcess(1);
                            //fetchQuestion(worried, true);
                          }}
                          value="Worried"
                          control={<Radio />}
                          labelPlacement="bottom"
                          label="Worried"
                        />
                        <FormControlLabel
                          value="Nervous"
                          onClick={(e) => {
                            // setRadioValue(e.target.value);
                            setShowProcess(1);
                            //fetchQuestion(nervous, true);
                          }}
                          control={<Radio />}
                          labelPlacement="bottom"
                          label="Nervous"
                        />
                        <FormControlLabel
                          onClick={(e) => {
                            // setRadioValue(e.target.value);
                            setShowProcess(1);
                            //fetchQuestion(neutral, true);
                          }}
                          value="Neutral"
                          control={<Radio />}
                          labelPlacement="bottom"
                          label="Neutral"
                        />
                        <FormControlLabel
                          onClick={(e) => {
                            // setRadioValue(e.target.value);
                            setShowProcess(1);
                            //fetchQuestion(apprehensive, true);
                          }}
                          value="Apprehensive"
                          control={<Radio />}
                          labelPlacement="bottom"
                          label="Apprehensive"
                        />
                        <FormControlLabel
                          onClick={(e) => {
                            // setRadioValue(e.target.value);
                            setShowProcess(1);
                            //fetchQuestion(excited, true);
                          }}
                          value="Excited"
                          control={<Radio />}
                          labelPlacement="bottom"
                          label="Excited"
                        />
                      </RadioGroup>
                    </Box>
                  </Box>
                  {/* {userAlignmentQuestions.map((ques) => {
                                        console.log("ques type", ques.type);
                                        if (ques.type === "objective") {
                                            return (
                                                <AlignmentQbjectiveQuestion
                                                key={ques.id}
                                                question={ques}
                                                onAnswer={(a, b) => {
                                                    onAnswer(a, b);
                                                }}
                                                />
                                            );
                                        } else {
                                            return <AlignmentSubjectQuestion question={ques} />;
                                        }
                                    })} */}
                  {/* {(showPrpcess === 1 || showPrpcess === 2) && (
                                        <Box className="gl-modify-txtbox-clr txtbox-clr2">
                                        <article className="gdnc-modal-headtxt2 txt-left">
                                            {question}
                                        </article>
                                        <TextField
                                            multiline
                                            rows={4}
                                            placeholder="Describe your thoughts here...."
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            inputProps={{
                                            sx: {
                                                fontSize: "16px",
                                                color: "#3E4248",
                                                fontWeight: "500",
                                            },
                                            }}
                                            sx={{ marginBottom: "20px" }}
                                        />
                                        </Box>
                                    )}
                                    {showPrpcess === 2 && (
                                        <Box className="gl-modify-txtbox-clr txtbox-clr2">
                                        <article className="gdnc-modal-headtxt2 txt-left">
                                            What are you committed to?
                                        </article>
                                        <TextField
                                            multiline
                                            rows={4}
                                            placeholder="Describe your thoughts here...."
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            inputProps={{
                                            sx: {
                                                fontSize: "16px",
                                                color: "#3E4248",
                                                fontWeight: "500",
                                            },
                                            }}
                                            sx={{ marginBottom: "20px" }}
                                        />
                                        </Box>
                                    )} */}
                </Box>
                <Button
                  style={{ width: "180px", margin: "30px auto 0 auto" }}
                  variant="contained"
                  //onClick={clickNext}
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
                  disabled={showPrpcess === 0 ? true : false}
                >
                  {end}
                </Button>
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
        <Dialog
          open={showSuccesModal}
          sx={{ textAlign: "center", padding: "30px" }}
        >
          <Box>
            <CircularProgressWithLabel value={30} />
          </Box>
          <DialogTitle
            sx={{
              color: "#1BAD70",
              textAlign: "center",
              fontWeight: "700",
              fontSize: { mobile: "18px", tablet: "31px" },
              padding: "0 0 0px 0",
            }}
          >
            Good Job!!!
          </DialogTitle>
          <DialogTitle
            id="title"
            sx={{
              color: "#252525",
              fontWeight: "700",
              fontSize: { mobile: "18px", tablet: "31px" },
              padding: "0 0 0px 0",
            }}
          >
            Your Current Alignment is 30%
          </DialogTitle>
          <DialogContent sx={{ padding: "0 0 0px 0" }}>
            <DialogContentText
              id="description"
              sx={{
                color: "#5D636B",
                fontWeight: "400",
                fontSize: { mobile: "16px", tablet: "20px" },
                marginBottom: "20px",
                padding: "0 0 0px 0",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est
              praesent aenean.Lorem ipsum dolor sit amet consectetur.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Link
                            to="/signin"
                            style={{ margin: "0 auto", textDecoration: "none" }}
                        > */}
            <Button
              onClick={() => {
                setShowSuccesModal(false);
                //navigate("/align");
              }}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
                textTransform: "capitalize",
                width: "190px !important",
                marginTop: "20px",
              }}
            >
              Start Improving
            </Button>
            {/* </Link> */}
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default AlignGoalUpdate;
