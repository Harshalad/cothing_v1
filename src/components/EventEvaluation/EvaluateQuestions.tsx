import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin, ZoomInIcon, ZoomOutIcon } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EvaluateQuestions = ({
  testDetails,
  currSecIndex,
  currQuesIndex,
  singleMCQ,
  handleSingleMCQchange,
  subjectiveAnswer,
  handleSetSublectiveAnswer,
  rating,
  handleRating,
  note,
  handleNote,
}: any) => {
  const [notes, setNotes] = useState<any>("");
  const [feedback, setFeedback] = useState<any>("");
  const [notesExpanded, setNotesExpanded] = useState<any>(true);
  const [feedbackExpanded, setFeedbackExpanded] = useState<any>(true);
  const [wrongOption, setWrongOption] = useState<any>(false);
  const [correctOption, setCorrectOption] = useState<any>(false);
  const [objectiveScore, setObjectiveScore] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>(false);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [expanded, setExpanded] = useState<any>(false);

  const handleExpand = (clickedHandle: any) => {
    if (clickedHandle === "notes") {
      setNotesExpanded(!notesExpanded);
    } else {
      setFeedbackExpanded(!feedbackExpanded);
    }
  };

  const handleNotesChange = (e: any) => {
    setNotes(e);
  };

  const handleFeedbackChange = (e: any) => {
    setFeedback(e);
  };

  const handleObjectiveScore = (e: any) => {
    var regex = /\b((100)|[1-9]\d?)\b/;
    // if(!e.target.validity.patternMismatch) {
    //   setObjectiveScore(e.target.value);
    // }
    if (regex.test(e.target.value) || e.target.value === "") {
      setObjectiveScore(e.target.value);
    }
  };

  const handleWrong = () => {
    setCorrectOption(false);
    setWrongOption(true);
  };

  const handleCorrect = () => {
    setWrongOption(false);
    setCorrectOption(true);
  };

  const openImagePreview = () => {
    setImagePreview(true);

    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };

    setTimeout(() => {
      const rootElement: any = document.getElementById("modal_image_contr");
      console.log(rootElement);
      rootElement.addEventListener("contextmenu", handleContextMenu);

      return () => {
        rootElement.removeEventListener("contextmenu", handleContextMenu);
      };
    }, 0);
  };

  const closeImagePreview = () => {
    setImagePreview(false);
  };

  const handleAccordion = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  //subjective
  const handleChange = (e: any) => {
    handleSetSublectiveAnswer(e);
  };

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };

    if (document.getElementById("eval_image_contr")) {
      const rootElement: any = document.getElementById("eval_image_contr");
      rootElement.addEventListener("contextmenu", handleContextMenu);

      return () => {
        rootElement.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, []);

  const currSection = testDetails?.sections[currSecIndex];
  const currentQuestion = currSection?.questions?.[currQuesIndex];
  console.log(currSection, "currentQuestion");
  return (
    <>
      <Box className="quests_contr">
        <Stack className="quests_contr_flex">
          <Box className="quests_contr_left">
            <Box className="eval_quests_box_left">
              <Stack className="total_quests_flex">
                <Typography className="total_quests">
                  Question {currQuesIndex + 1} out of{" "}
                  {currSection?.questions?.length}
                </Typography>
              </Stack>
              <Typography className="quests_subtext">
                Refer below to answer the question
              </Typography>
              <Typography className="quests_content">
                {currentQuestion?.question?.assessorQuestion
                  ? currentQuestion?.question?.assessorQuestion.replace(
                      "[employeeName]",
                      testDetails?.assesseName
                    )
                  : ""}
              </Typography>

              {/* //rating question */}
              {currentQuestion?.question?.type === "rating" && (
                <Box className="quest_scale">
                  <FormControl className="scale">
                    <RadioGroup
                      value={rating + ""}
                      onChange={(e) => handleRating(e)}
                    >
                      {/* {console.log(rating, "ratingg")} */}
                      {currentQuestion?.question?.assessorOption?.map(
                        (e: any, index: any) => {
                          return (
                            <FormControlLabel
                              key={index}
                              value={e.order}
                              control={<Radio />}
                              label={e.value}
                            />
                        );
                        }
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}

              {/* mcq question */}
              {currentQuestion?.question?.type === "mcq" && (
                <Box className="quest_single_mcq">
                  <Typography className="mcq_title">Choose One</Typography>
                  <Typography className="mcq_subtext">
                    Out of the presented options, choose one answer you deem is
                    the correct one.
                  </Typography>
                  <FormControl className="mcq">
                    <RadioGroup
                      aria-label="mcq-options"
                      name="mcq-options"
                      value={singleMCQ}
                      onChange={(e: any) =>
                        handleSingleMCQchange(e.target.value)
                      }
                    >
                      {currentQuestion?.question?.assessorOption?.map(
                        (e: any, index: number) => {
                          return (
                            <FormControlLabel
                              key={index}
                              value={e.order}
                              control={<Radio />}
                              label={e.value}
                            />
                          );
                        }
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}

              {/* subjective question */}
              {currentQuestion?.question?.type === "subjective" && (
                <Box className="quest_subj">
                  <TextField
                    id=""
                    placeholder="Type answer here..."
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
                    value={subjectiveAnswer}
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                    className="quests_txtfld"
                    multiline={true}
                    rows={
                      10
                      // currentQuestion?.question?.answerType === "shortText"
                      // ? 2
                      // : 18
                    }
                  />
                </Box>
              )}
              {/* <Typography className="answer_title">
                Answer
              </Typography> */}
              {/* <Box className="eval_refmatr_accord_contr">
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleAccordion("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#1C2129" }} />}
                  >
                    <Typography className="eval_accord_title">
                      Reference Material 1
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="eval_accord_descrp">
                      Refer below to answer the question A recent consumer
                      report brought up a couple of critical insights while
                      evaluating performance drivers of e-commerce platforms for
                      the grocery segment - i. Consumers will continue to show
                      good interest in shopping for groceries and will expect
                      more value from loyalty programs&apos; point of view. ii.
                      Wide product range, availability status if not available,
                      higher discount margins, order fulfilment in time, returns
                      management are the top 5 criteria for creating repeat
                      customers on an e-commerce platform
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleAccordion("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#1C2129" }} />}
                  >
                    <Typography className="eval_accord_title">
                      Reference Material 2
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="eval_accord_descrp">
                      Refer below to answer the question A recent consumer
                      report brought up a couple of critical insights while
                      evaluating performance drivers of e-commerce platforms for
                      the grocery segment - i. Consumers will continue to show
                      good interest in shopping for groceries and will expect
                      more value from loyalty programs&apos; point of view. ii.
                      Wide product range, availability status if not available,
                      higher discount margins, order fulfilment in time, returns
                      management are the top 5 criteria for creating repeat
                      customers on an e-commerce platform
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleAccordion("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#1C2129" }} />}
                  >
                    <Typography className="eval_accord_title">
                      Reference Material 3
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="eval_accord_descrp">
                      Refer below to answer the question A recent consumer
                      report brought up a couple of critical insights while
                      evaluating performance drivers of e-commerce platforms for
                      the grocery segment - i. Consumers will continue to show
                      good interest in shopping for groceries and will expect
                      more value from loyalty programs&apos; point of view. ii.
                      Wide product range, availability status if not available,
                      higher discount margins, order fulfilment in time, returns
                      management are the top 5 criteria for creating repeat
                      customers on an e-commerce platform
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Worker 
                workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                <Box className="eval_pdf_contr">
                  <Box
                    className="eval_pdf_toolbar"
                  >
                    <ZoomOutButton />
                    <ZoomPopover />
                    <ZoomInButton />
                  </Box>
                  <Viewer fileUrl={"/images/sample-pdf.pdf"} plugins={[zoomPluginInstance]} />
                </Box>
              </Worker>
              <Box className="eval_image_contr" id="eval_image_contr">
                <img 
                  src="/images/eval-image.png" 
                  alt="evaluator image" 
                  width="100%" 
                  height="400px" 
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    openImagePreview()
                  }}
                />
                <Typography 
                  className="full_screen_img_txt"
                  onClick={() => {
                    openImagePreview()
                  }}
                >
                  View image in full screen
                </Typography>
              </Box>
              <Box className="eval_video_contr">
                <ReactPlayer
                  url="/images/video.mp4" //https://www.youtube.com/watch?v=_9KCpdAj_cE // /images/video.mp4
                  //width="100%"
                  //height="400px"
                  controls={true}
                  config={{ 
                    file: { 
                      attributes: {
                        onContextMenu: (e: any) => e.preventDefault(),
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </Box>
              <embed 
                src="/images/sample_pdf.pdf#toolbar=0" 
                type="application/pdf"
                width="100%" 
                height="400px" 
              />
              <Typography className="answer_content">
                Lorem ipsum dolor sit amet consectetur. Suspendisse et dignissim quam lacus convallis 
                vestibulum arcu. Adipiscing urna a risus lorem aliquam urna. Ultrices habitant nec urna lectus. 
                Tellus odio porta porta elementum blandit rhoncus nullam.
              </Typography> */}
            </Box>
          </Box>
          <Box className="quests_contr_right">
            <Box
              className={`notes_contr ${
                notesExpanded ? "none" : "notes_contr_minimize"
              }`}
            >
              <Stack className="notes_head_flx">
                <Typography className="notes_tite">Notes</Typography>
                {notesExpanded ? (
                  <RemoveCircleOutlineRoundedIcon
                    sx={{ color: "#3E4248", cursor: "pointer" }}
                    onClick={() => handleExpand("notes")}
                  />
                ) : (
                  <AddCircleOutlineRoundedIcon
                    sx={{ color: "#3E4248", cursor: "pointer" }}
                    onClick={() => handleExpand("notes")}
                  />
                )}
              </Stack>
              <Divider className="eval_hr notes_hr" />
              <Collapse in={notesExpanded}>
                <TextField
                  placeholder="Take your notes here...."
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
                  value={note}
                  onChange={(e) => {
                    handleNote(e.target.value);
                  }}
                  className="notes_txtfld"
                  multiline={true}
                  rows={9}
                />
              </Collapse>
            </Box>
            {/* <Box
              className={`feedbck_contr ${
                feedbackExpanded ? "none" : "feedbck_contr_minimize"
              }`}
            >
              <Stack className="feedbck_head_flx">
                <Typography className="feedbck_tite">Feedback</Typography>
                {feedbackExpanded ? (
                  <RemoveCircleOutlineRoundedIcon
                    sx={{ color: "#3E4248", cursor: "pointer" }}
                    onClick={() => handleExpand("feedbck")}
                  />
                ) : (
                  <AddCircleOutlineRoundedIcon
                    sx={{ color: "#3E4248", cursor: "pointer" }}
                    onClick={() => handleExpand("feedbck")}
                  />
                )}
              </Stack>
              <Divider className="eval_hr feedbck_hr" />
              <Collapse in={feedbackExpanded}>
                <Box className="eval_obj_contr">
                  <Box className="eval_feedbck_txtfld_contr">
                    <TextField
                    placeholder="Type your feedback..."
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
                    value={feedback}
                    onChange={(e) => {
                      handleFeedbackChange(e.target.value);
                    }}
                    className="feedback_txtfld"
                    multiline={true}
                    rows={2}
                  />
                  </Box>
                  <Box className="eval_radiobtns_contr">
                    <Typography className="eval_obj_text">
                      Objective 1 / Scoring
                    </Typography>
                    <FormControl>
                      <RadioGroup row name="febck-options">
                        <FormControlLabel
                          value={"Very Difficult"}
                          control={<Radio />}
                          label={"Very Difficult"}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult3"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult2"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult1"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Easy"}
                          control={<Radio />}
                          label={"Very Easy"}
                          labelPlacement="bottom"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box className="eval_radiobtns_contr">
                    <Typography className="eval_obj_text">
                      Objective 2
                    </Typography>
                    <FormControl>
                      <RadioGroup row name="febck-options">
                        <FormControlLabel
                          value={"Very Difficult"}
                          control={<Radio />}
                          label={"Very Difficult"}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult3"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult2"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Difficult1"}
                          control={<Radio />}
                          label={""}
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value={"Very Easy"}
                          control={<Radio />}
                          label={"Very Easy"}
                          labelPlacement="bottom"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Stack className="wrng_crct_flx">
                    <Stack className={`wrong_flx ${wrongOption ? "wrong_flx_border" : "none"}`} onClick={() => handleWrong()}>
                      <Typography className={`wrong_text ${wrongOption ? "wrong_text_color" : "none"}`}>Wrong</Typography>
                      <CloseRoundedIcon sx={{color: wrongOption ? "#E74649" : "#3E4248"}} />
                    </Stack>
                    <Stack className={`correct_flx ${correctOption ? "correct_flx_border" : "none"}`} onClick={() => handleCorrect()}>
                      <Typography className={`correct_text ${correctOption ? "correct_text_color" : "none"}`}>Correct</Typography>
                      <CheckRoundedIcon sx={{color: correctOption ? "#1BAD70" : "#3E4248"}} />
                    </Stack>
                  </Stack>
                  <TextField
                    placeholder="000"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputProps={{
                      sx: {
                        fontSize: "16px",
                        color: "#3E4248",
                        fontWeight: "500",
                      },
                      //pattern: "100|[0-9]{1,3}"
                    }}
                    value={objectiveScore}
                    onChange={(e) => {
                      handleObjectiveScore(e);
                    }}
                    className="obj_score_txtfld"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">/ 100</InputAdornment>
                    }}
                  />
                </Box>
              </Collapse>
            </Box> */}
          </Box>
        </Stack>
      </Box>
      {/* <Dialog fullScreen open={imagePreview} className="image_preview_modal">
        <CloseIcon
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "1",
            cursor: "pointer",
          }}
          onClick={() => {
            closeImagePreview();
          }}
        />
        <DialogContent>
          <Box id="modal_image_contr">
            <img
              src="/images/eval-image.png"
              alt="evaluator image"
              width="100%"
              height="100%"
            />
          </Box>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
export default EvaluateQuestions;
