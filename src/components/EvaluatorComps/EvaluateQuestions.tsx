import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Link,
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
  currentQuestionIndex,
  currentSectionIndex,
  notes,
  handleNotesChanges,
  handleCorrect,
  handleWrong,
  correctOption,
  wrongOption,
  handleObjectiveScoreState,
  objectiveScore,
  correct,
  handleSetCorrect,
}: any) => {
  const [feedback, setFeedback] = useState<any>("");
  const [notesExpanded, setNotesExpanded] = useState<any>(true);
  const [feedbackExpanded, setFeedbackExpanded] = useState<any>(true);

  const [imagePreview, setImagePreview] = useState<any>(false);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [expanded, setExpanded] = useState<any>(false);

  const [currentSection, setCurrentSection] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    setCurrentSection(testDetails?.sections[currentSectionIndex]);
  }, [currentSectionIndex, testDetails, currentSectionIndex]);
  useEffect(() => {
    setCurrentQuestion(currentSection?.questions[currentQuestionIndex]);
  }, [currentSection, testDetails, currentQuestionIndex]);
  const handleExpand = (clickedHandle: any) => {
    if (clickedHandle === "notes") {
      setNotesExpanded(!notesExpanded);
    } else {
      setFeedbackExpanded(!feedbackExpanded);
    }
  };

  const handleNotesChange = (e: any) => {
    handleNotesChanges(e);
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
      handleObjectiveScoreState(e.target.value);
    }
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
  console.log("currentQestion", currentQuestion);
  return (
    <>
      <Box className="quests_contr">
        <Stack className="quests_contr_flex">
          <Box className="quests_contr_left">
            <Box className="eval_quests_box_left">
              <Stack className="total_quests_flex">
                <Typography className="total_quests">
                  Question {currentQuestionIndex + 1} out of{" "}
                  {currentSection?.questions?.length}
                </Typography>
              </Stack>
              <Typography className="quests_subtext">
                Refer below to answer the question
              </Typography>
              <Typography className="quests_content">
                {currentQuestion?.question?.question}
              </Typography>
              <Typography className="answer_title">Answer</Typography>
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
                      Refer below to answer the question
                      A recent consumer report brought up a couple of critical insights while evaluating performance drivers of e-commerce platforms for the grocery segment -
                      i. Consumers will continue to show good interest in shopping for groceries and will expect more value from loyalty programs point of view.
                      ii. Wide product range availability status if not available higher discount margins order fulfilment in time returns management are the top 5 criteria for creating repeat customers on an e-commerce platform
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
                      Refer below to answer the question
                      A recent consumer report brought up a couple of critical insights while evaluating performance drivers of e-commerce platforms for the grocery segment -
                      i. Consumers will continue to show good interest in shopping for groceries and will expect more value from loyalty programs point of view.
                      ii. Wide product range availability status if not available higher discount margins order fulfilment in time returns management are the top 5 criteria for creating repeat customers on an e-commerce platform
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
                      Refer below to answer the question
                      A recent consumer report brought up a couple of critical insights while evaluating performance drivers of e-commerce platforms for the grocery segment -
                      i. Consumers will continue to show good interest in shopping for groceries and will expect more value from loyalty programs point of view.
                      ii. Wide product range availability status if not available higher discount margins order fulfilment in time returns management are the top 5 criteria for creating repeat customers on an e-commerce platform
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box> */}
              {/* <Worker 
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
              </Worker> */}
              {/* <Box className="eval_image_contr" id="eval_image_contr">
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
              </Box> */}
              {/* <Box className="eval_video_contr">
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
              </Box> */}
              {/* <embed 
                src="/images/sample_pdf.pdf#toolbar=0" 
                type="application/pdf"
                width="100%" 
                height="400px" 
              /> */}
              {currentQuestion?.question?.type === "fileUpload" && (
                <Typography className="full_screen_img_txt">
                  <Link href={currentQuestion?.answerObject?.answer}>
                    Download File
                  </Link>
                </Typography>
              )}
              {currentQuestion?.question?.type === "subjective" && (
                <Typography className="answer_content">
                  {currentQuestion?.answerObject?.answer}
                </Typography>
              )}
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
                  value={notes}
                  onChange={(e) => {
                    handleNotesChange(e.target.value);
                  }}
                  className="notes_txtfld"
                  multiline={true}
                  rows={9}
                />
              </Collapse>
            </Box>
            <Box
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
                  {/* Feed back box*/}
                  {/* <Box className="eval_feedbck_txtfld_contr">
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
                  </Box> */}
                  {/* <Box className="eval_radiobtns_contr">
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
                  </Box> */}
                  {/* <Box className="eval_radiobtns_contr">
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
                  </Box> */}

                  {/*Wrong and right*/}
                  {currentQuestion?.question?.evaluationType === "binary" ? (
                    <Stack className="wrng_crct_flx">
                      <Stack
                        className={`wrong_flx ${
                          correct === "0" ? "wrong_flx_border" : "none"
                        }`}
                        onClick={() => handleSetCorrect("0")}
                      >
                        <Typography
                          className={`wrong_text ${
                            correct === "0" ? "wrong_text_color" : "none"
                          }`}
                        >
                          Wrong
                        </Typography>
                        <CloseRoundedIcon
                          sx={{
                            color: correct === "0" ? "#E74649" : "#3E4248",
                          }}
                        />
                      </Stack>
                      <Stack
                        className={`correct_flx ${
                          correct === "1" ? "correct_flx_border" : "none"
                        }`}
                        onClick={() => handleSetCorrect("1")}
                      >
                        <Typography
                          className={`correct_text ${
                            correct==='1' ? "correct_text_color" : "none"
                          }`}
                        >
                          Correct
                        </Typography>
                        <CheckRoundedIcon
                          sx={{ color: correct==="1" ? "#1BAD70" : "#3E4248" }}
                        />
                      </Stack>
                    </Stack>
                  ) : (
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
                      value={objectiveScore<0?0:objectiveScore}
                      onChange={(e) => {
                        handleObjectiveScore(e);
                      }}
                      className="obj_score_txtfld"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            / {currentQuestion?.question?.maxMarks}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}

                  {/*Grade Question*/}
                </Box>
              </Collapse>
            </Box>
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
