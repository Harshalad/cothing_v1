import {
  Box,
  Collapse,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AlignEmployeeQuotient = ( { goal }: any ) => {
  const [ isReadMore, setIsReadMore ] = useState( true );
  const [ expanded, setExpanded ] = useState<any>( false );

  const toggleReadMore = () => {
    setIsReadMore( !isReadMore );
  };

  const alignmentQuotientExists = goal?.alignmentQuotients?.length;
  const feedback = alignmentQuotientExists
    ? goal?.alignmentQuotients[ goal?.alignmentQuotients?.length - 1 ]?.feedback
    : "";

  const rating = alignmentQuotientExists
    ? goal?.alignmentQuotients[ goal?.alignmentQuotients?.length - 1 ]?.rating
    : null;

  const ratingScore = alignmentQuotientExists
    ? rating === "High"
      ? 100
      : rating === "Medium"
        ? 48
        : 18
    : 0;

  return (
    <>
      <Box className="align_quotnt_box">
        <Typography className="align_quotnt_title">
          Quality of your thinking in setting this goal
        </Typography>
        { !ratingScore ? (
          <Typography
            className="align_quotnt_dot_text"
            sx={ { marginBottom: "24px" } }
          >
            You are yet to recieve this feedback.
          </Typography>
        ) : null }
        <Box className="align_quotnt_rating">
          <LinearProgress
            variant="determinate"
            value={ ratingScore } // low - 18, medium - 48, high - 100
            sx={ {
              cursor: "default !important",
              width: "100%",
              height: "8px",
              borderRadius: "8px",
              "&.MuiLinearProgress-root": {
                backgroundColor: "#C8CDD4",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2E5DB0",
              },
            } }
          />
          <Stack className="align_quotnt_dot_flex" sx={ { cursor: "default" } }>
            <Box
              className={
                ratingScore >= 18
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              sx={ { cursor: "default !important" } }
            >
              <Typography
                className="align_quotnt_dot_text"
                sx={ { cursor: "default" } }
              >
                Low
              </Typography>
            </Box>
            <Box
              sx={ { cursor: "default !important" } }
              className={
                ratingScore >= 48
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography
                className="align_quotnt_dot_text"
                sx={ { cursor: "default" } }
              >
                Medium
              </Typography>
            </Box>
            <Box
              sx={ { cursor: "default !important" } }
              className={
                ratingScore >= 84
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography
                className="align_quotnt_dot_text"
                sx={ { cursor: "default" } }
              >
                High
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Collapse id="expert" in={ expanded === true }>
          <Box className="align_quotnt_feedbk">
            <Typography className="align_quotnt_feedbk_title">
              Feedback
            </Typography>
            <Typography className="align_quotnt_feedbk_text">
              { isReadMore
                ? feedback?.length > 50
                  ? feedback?.slice( 0, 50 ) + "..."
                  : feedback
                : feedback }
              { feedback?.length > 50 ? (
                <span
                  className="align_quotnt_feedbk_readmr"
                  onClick={ toggleReadMore }
                >
                  { isReadMore ? " Read more" : " Read less" }
                </span>
              ) : (
                ""
              ) }
            </Typography>
          </Box>
        </Collapse>
        { alignmentQuotientExists ? (
          <Box
            className="align_quotnt_viwmor"
            onClick={ () => setExpanded( !expanded ) }
          >
            <Typography className="align_quotnt_viwmor_txt">
              View { expanded === true ? "Less" : "More" }
            </Typography>
          </Box>
        ) : null }
      </Box>
    </>
  );
};
export default AlignEmployeeQuotient;
