import { Box, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { submitUserTest } from "../../actions/assessment/submitTest";
import { useRouter } from "next/router";

const Progressbar = ({ questionAnswerMap, currSectionIndex }: any) => {
  const [open, setOpen] = useState<any>(false);

  //@ts-ignore
  const sections = useSelector((state) => state?.assessment?.sections);

  let total_quet = 0;
  if (sections) {
    sections.forEach((section: any) => {
      total_quet += section.questions.length;
    });
  }

  let ans_quet = 0;
  questionAnswerMap.forEach((value: any, key: any) => {
    console.log(value, "queValue");
    value.forEach((innerValue: any, innerKey: any) => {
      if (innerValue?.question?.type === "subjective") {
        ans_quet +=
          innerValue?.answerObject?.answer === null ||
          innerValue?.answerObject?.answer.length === 0
            ? 0
            : 1;
      } else {
        ans_quet +=
          innerValue?.answerObject?.answerOption === null ||
          innerValue?.answerObject?.answerOption?.length === 0
            ? 0
            : 1;
      }
    });
  });

  const percentageAnswered = (ans_quet / total_quet) * 100;
  const roundedPercentage = Math.round(percentageAnswered);

  const handleTooltipOpen = (evt: any, value: any) => {
    console.log(evt);
    setOpen(evt.currentTarget.id === value ? value : false);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };
    const router = useRouter();
    const testId = router?.query?.id;
  const handleProgresBarClick = async() =>{
    if(ans_quet === total_quet){
      const response = submitUserTest({
        userTestMapId: testId,
        autoSubmitted: false,
      });
      router.push("/assessment/thank-you");
    }else{
      toast.error("Complete all questions before submitting the Test");
    }
  } 
  return (
    <>
      <Box className="progress_bar_contr">
        <Stack className="progress_bar_contr_flex">
          <Box>
            {sections && <Typography className="prog_perctg">
              {roundedPercentage}%
            </Typography>}
            {/* <Typography className="prog_text">
              Section {currSectionIndex + 1}
            </Typography> */}
          </Box>
          <Stack className="progressbar_flex">
            {sections?.map((section: any, index: any) => {
              let sectionTotalQuestion = section?.questions.length;
              let currSectionMap = questionAnswerMap.get(index);
              let sectionAnswerQuestion = 0;
              console.log(currSectionMap, "currSectionMap");
              currSectionMap?.forEach((value: any, key: any) => {
                if (value?.question?.type === "subjective" || value?.question?.type === "fileUpload") {
                  sectionAnswerQuestion +=
                    value?.answerObject?.answer === null ||
                    value?.answerObject?.answer.length === 0
                      ? 0
                      : 1;
                } else {
                  sectionAnswerQuestion +=
                    value?.answerObject?.answerOption === null ||
                    value?.answerObject?.answerOption?.length === 0
                      ? 0
                      : 1;
                }
              });
              let currSectionPercantage = (
                (sectionAnswerQuestion / sectionTotalQuestion) *
                100
              ).toFixed();
              return (
                <Box className="progressbar_box progress_bar_one" key={index}>
                  <Stack className="round_flex_one">
                    <Box className="round_before">
                      <Stack className="prgrs_rnd_flx">
                        <Typography className="round_text">
                          Section
                        </Typography>
                        <Typography className="round_text">
                          {index + 1}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Tooltip
                    open={open === "sect1"}
                    onClose={handleTooltipClose}
                    title={`${sectionAnswerQuestion} out of ${sectionTotalQuestion} completed`}
                    arrow
                    disableTouchListener
                    placement="top"
                    sx={{
                      backgroundColor: "#EAECEF",
                    }}
                    slotProps={{
                      tooltip: {
                        className: "assestment_progbr_tooltip",
                      },
                    }}
                  >
                    <Box>
                      <LinearProgress
                        id="sect1"
                        variant="determinate"
                        value={Number(currSectionPercantage)}
                        className="pb1"
                        sx={{
                          borderRadius: "22px",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#1BAD70",
                            borderRadius: "0",
                          },
                        }}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleTooltipOpen(e, "sect1")}
                        onMouseEnter={(e) => handleTooltipOpen(e, "sect1")}
                      />
                      <LinearProgress
                        id="sect1"
                        variant="determinate"
                        value={100}
                        className="pb2"
                        sx={{
                          borderRadius: "22px",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#C8CDD4",
                            borderRadius: "0",
                          },
                        }}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => handleTooltipOpen(e, "sect1")}
                        onMouseEnter={(e) => handleTooltipOpen(e, "sect1")}
                      />
                    </Box>
                  </Tooltip>
                </Box>
              );
            })}
            {sections && <Box className="round_after">
              <Typography
                className="round_text"
              >
                Submit
              </Typography>
            </Box>}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default Progressbar;
