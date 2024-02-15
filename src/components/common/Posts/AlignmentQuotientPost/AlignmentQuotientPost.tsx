import { useState } from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

const AlignmentQuotientPost = ({ post }: any) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const alignmentQuotientExists = post?.typeAttributes?.rating
    ? true
    : false;
  const feedback = post?.typeAttributes?.feedback;
  const rating = post?.typeAttributes?.rating;
  const ratingScore = alignmentQuotientExists
    ? rating === "High"
      ? 100
      : rating === "Medium"
      ? 48
      : 18
    : 0;
  return (
    <div>
      <Box className="aligngl_quest_box">
        <Typography className="align_quotnt_title">
          Alignment Quotient
        </Typography>
        <Box className="align_quotnt_rating">
          <LinearProgress
            variant="determinate"
            value={ratingScore} // low - 18, medium - 48, high - 100
            sx={{
              width: "100%",
              height: "8px",
              borderRadius: "8px",
              "&.MuiLinearProgress-root": {
                backgroundColor: "#C8CDD4",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2E5DB0",
              },
            }}
          />
          <Stack className="align_quotnt_dot_flex">
            <Box
              className={
                ratingScore >= 18
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box
              className={
                ratingScore >= 48
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box
              className={
                ratingScore >= 84
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">High</Typography>
            </Box>
          </Stack>
        </Box>
        <Box className="align_quotnt_feedbk">
          <Typography className="align_quotnt_feedbk_title">
            Feedback
          </Typography>
          <Typography className="align_quotnt_feedbk_text">
            {isReadMore
              ? feedback?.length > 50
                ? feedback?.slice(0, 50) + "..."
                : feedback
              : feedback}
            {feedback?.length > 50 ? (
              <span
                className="align_quotnt_feedbk_readmr"
                onClick={toggleReadMore}
              >
                {isReadMore ? " Read more" : " Read less"}
              </span>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AlignmentQuotientPost;
