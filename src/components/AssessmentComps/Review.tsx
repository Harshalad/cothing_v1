import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelector } from "react-redux";
import { TimeLeft } from "./TimeLeft";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner/Spinner";

const Review = ( {
  questionAnswerMap,
  openReview,
  handleSetCurrSectionIndex,
  handleSetCurrQuestionIndex,
  handleshowReview,
}: any ) => {
  console.log( questionAnswerMap, "questionAnswerMap" );
  const [ showConfirmModal, setConfirmModal ] = useState( false );
  //@ts-ignore
  const testDetails = useSelector( ( state ) => state?.assessment?.testDetails );

  const closeConfirmModal = () => {
    setConfirmModal( false );
  };
  //@ts-ignore
  const sections = useSelector( ( state ) => state?.assessment?.sections );
  let total_quet = 0;
  if ( sections ) {
    sections.map( ( section: any ) => ( total_quet += section.questions.length ) );
  }
  let ans_quet = 0;
  questionAnswerMap.forEach( ( value: any, key: any ) => {
    value.forEach( ( value: any, key: any ) => {
      console.log( value, "qp,revie" );
      if (
        value?.question?.type === "subjective" ||
        value?.question?.type === "fileUpload"
      ) {
        ans_quet +=
          value?.answerObject?.answer === null ||
            value?.answerObject?.answer.length === 0
            ? 0
            : 1;
      } else {
        ans_quet +=
          value?.answerObject?.answerOption === null ||
            value?.answerObject?.answerOption?.length === 0
            ? 0
            : 1;
      }
    } );
  } );
  const handleTestConfirm = () => {
    if ( testDetails?.submitTestOnlyAtEnd ) {
      if ( total_quet === ans_quet ) {
        setConfirmModal( true );
      } else {
        toast.error( "Please respond to all questions before submitting. You cannot come back to it later." );
      }
    } else {
      setConfirmModal( true );
    }
  };
  const handleReviewClick = ( e: any ) => {
    console.log( e, "handelereview" );
    // console.log(sec_index,que_index<"indexes");
    handleSetCurrSectionIndex( e.sec_index );
    handleSetCurrQuestionIndex( e.que_index );
    handleshowReview();
  };
  console.log( sections, "section in review page" );
  return (
    <>
      <Dialog open={ openReview } fullScreen>
        <Box className="review_contr">
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={ { cursor: "pointer" } }
            onClick={ () => handleshowReview() }
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
              sx={ {
                fontSize: "16px",
                fontWeight: "500",
                color: "balck",
              } }
            >
              Back
            </Typography>
          </Stack>
          <Stack className="review_top_flex">
            <Box className="review_title_contr">
              <Typography className="review_title">{ testDetails?.assessmentLabelSingular } Review</Typography>
            </Box>
            {/* <Stack className="test_instructs_time_flex"> */ }
            <TimeLeft />
            {/* </Stack> */ }
          </Stack>
          <Stack className="review_sects_flex">
            { sections?.map( ( section: any, sec_index: any ) => {
              return (
                <Box className="review_sects_contr" key={ sec_index }>
                  <Typography className="review_sect_title">
                    Section { sec_index + 1 }
                  </Typography>
                  <Stack className="review_sect_quests_flex">
                    <Stack className="review_sect_quests_rowflex">
                      { section.questions.map(
                        ( question: any, que_index: any ) => {
                          return (
                            <Typography
                              key={ que_index }
                              className={ `review_sect_quests ${ ( questionAnswerMap
                                .get( sec_index )
                                ?.get( que_index )?.answerObject?.answer !==
                                null &&
                                questionAnswerMap
                                  .get( sec_index )
                                  ?.get( que_index )?.answerObject?.answer
                                  ?.length !== 0 ) ||
                                ( questionAnswerMap
                                  .get( sec_index )
                                  ?.get( que_index )?.answerObject
                                  ?.answerOption !== null &&
                                  questionAnswerMap
                                    .get( sec_index )
                                    ?.get( que_index )?.answerObject?.answerOption
                                    ?.length !== 0 )
                                ? "answrd"
                                : ""
                                }` }
                              sx={ { cursor: "pointer" } }
                              onClick={ () => {
                                handleReviewClick( { sec_index, que_index } );
                              } }
                            >
                              { que_index + 1 }
                            </Typography>
                          );
                        }
                      ) }
                    </Stack>
                  </Stack>
                </Box>
              );
            } ) }
            {/* <Box className="review_sects_contr">
            <Typography className="review_sect_title">Section 2</Typography>
            <Stack className="review_sect_quests_flex">
              <Stack className="review_sect_quests_rowflex">
                <Typography className="review_sect_quests answrd">1</Typography>
                <Typography className="review_sect_quests answrd">2</Typography>
                <Typography className="review_sect_quests answrd">3</Typography>
                <Typography className="review_sect_quests answrd">4</Typography>
                <Typography className="review_sect_quests answrd">5</Typography>
                <Typography className="review_sect_quests answrd">6</Typography>
                <Typography className="review_sect_quests answrd">7</Typography>
                <Typography className="review_sect_quests answrd">8</Typography>
                <Typography className="review_sect_quests answrd">9</Typography>
                <Typography className="review_sect_quests answrd">
                  10
                </Typography>
              </Stack>
              <Stack className="review_sect_quests_rowflex">
                <Typography className="review_sect_quests">11</Typography>
                <Typography className="review_sect_quests">12</Typography>
                <Typography className="review_sect_quests">13</Typography>
                <Typography className="review_sect_quests">14</Typography>
                <Typography className="review_sect_quests">15</Typography>
                <Typography className="review_sect_quests">16</Typography>
                <Typography className="review_sect_quests">17</Typography>
                <Typography className="review_sect_quests">18</Typography>
                <Typography className="review_sect_quests">19</Typography>
                <Typography className="review_sect_quests">20</Typography>
              </Stack>
            </Stack>
          </Box> */}
          </Stack>
          <Stack className="review_quests_stat">
            <Box className="review_quests_stat_rowflex">
              <Typography className="review_quests_stat_title">
                Total Questions : { total_quet }
              </Typography>
            </Box>
            <Box className="review_quests_stat_rowflex">
              <Typography className="review_quests_stat_title">
                Attempted Questions : { ans_quet }
              </Typography>
            </Box>
            <Box className="review_quests_stat_rowflex">
              <Typography className="review_quests_stat_title">
                Not Attempted Questions : { total_quet - ans_quet }
              </Typography>
            </Box>
          </Stack>
          <Box className="test_instructs_cta">
            <Button
              className={ testDetails?.submitTestOnlyAtEnd ? total_quet === ans_quet ? "standard_cta" : "submmit_button" : "standard_cta" }
              onClick={ () => handleTestConfirm() }
            >
              Submit
            </Button>
          </Box>
        </Box>

        <ConfirmModal
          showModal={ showConfirmModal }
          closeConfirmModal={ closeConfirmModal }
        />
      </Dialog>
    </>
  );
};
export default Review;
