import { useState } from "react";
import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const Review = ({
  openReview,
  handleOpenReview,
  testDetails,
  handelQuestionIndex,
  questionAnswerMap,
  handleReviewSection,
}: any) => {
  const router = useRouter();
  const [showConfirmModal, setConfirmModal] = useState(false);
  let totalQuestion = 0;
  testDetails?.sections.map(
    (section: any) => (totalQuestion += section.questions.length)
  );
  let answeredQuestion = 0;
  questionAnswerMap.forEach((value: any, key: any) => {
    value.forEach((value: any, key: any) => {
      console.log(value, "qp,revie");
      if (value?.answerObject?.evaluated) {
        answeredQuestion += 1;
      }
    });
  });
  const handleQuestionClick = (index: any, qIndex: any) => {
    handleOpenReview();
    handelQuestionIndex(qIndex);
    handleReviewSection(index);
  };
  const handleTestConfirm = () => {
    setConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
  };
  return (
    <Dialog open={openReview} fullScreen>
      <Box className="review_contr">
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => handleOpenReview()}
        >
          <Typography
            //@ts-ignore
            position="relative"
            flex-direction="row"
            align-items="center"
            justify-content="center"
            margin-bottom="56px"
            className="go_back_flex"
          >
            <ChevronLeftIcon />
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "balck",
            }}
          >
            Back
          </Typography>
        </Stack>
        <Stack className="review_top_flex">
          <Box className="review_title_contr">
            <Typography className="review_title">Evaluation Review</Typography>
          </Box>
        </Stack>
        <Stack className="review_sects_flex">
          {testDetails?.sections?.map((section: any, sec_index: any) => {
            return (
              <Box className="review_sects_contr" key={sec_index}>
                <Typography className="review_sect_title">
                  Section {sec_index + 1}
                </Typography>
                <Stack className="review_sect_quests_flex">
                  <Stack className="review_sect_quests_rowflex">
                    {section?.questions?.map(
                      (question: any, que_Index: any) => {
                        return (
                          <Typography
                            className={`review_sect_quests ${
                              questionAnswerMap.get(sec_index)?.get(que_Index)
                                ?.answerObject?.evaluated
                                ? "answrd"
                                : ""
                            }`}
                            key={que_Index}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleQuestionClick(sec_index, que_Index)
                            }
                          >
                            {que_Index + 1}
                          </Typography>
                        );
                      }
                    )}
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
        <Stack className="review_quests_stat">
          <Box className="review_quests_stat_rowflex">
            <Typography className="review_quests_stat_title">
              Total Questions : {totalQuestion}
            </Typography>
          </Box>
          <Box className="review_quests_stat_rowflex">
            <Typography className="review_quests_stat_title">
              Attempted Questions : {answeredQuestion}
            </Typography>
          </Box>
          <Box className="review_quests_stat_rowflex">
            <Typography className="review_quests_stat_title">
              Not Attempted Questions : {totalQuestion - answeredQuestion}
            </Typography>
          </Box>
        </Stack>
        <Box className="test_instructs_cta">
          <Button
            className="standard_cta"
            disabled={totalQuestion !== answeredQuestion}
            onClick={() => handleTestConfirm()}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <SubmitEvaluationModal
        showModal={showConfirmModal}
        closeConfirmModal={closeConfirmModal}
      />
    </Dialog>
  );
};
export default Review;
