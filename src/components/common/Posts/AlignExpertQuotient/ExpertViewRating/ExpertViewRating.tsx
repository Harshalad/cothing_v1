import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Collapse,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

const ExpertViewRating = ({ goal, reportee, setUpdateRating }: any) => {
  var alignQuotntRating = 18;

  var text =
    "This goal is not aligned with next 6 month team goals -  goal is not aligned with next 6 month team goals";
  const [isReadMore, setIsReadMore] = useState(true);
  const [expanded, setExpanded] = useState<any>(false);
  const [open, setOpen] = useState<any>("");
  const [showAlignQuotRating, setAlignQuotRating] = useState<any>(0);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const feedback =
    goal?.alignmentQuotients[goal?.alignmentQuotients?.length - 1]?.feedback;

  const rating =
    goal?.alignmentQuotients[goal?.alignmentQuotients?.length - 1]?.rating;

  const ratingScore = rating === "High" ? 100 : rating === "Medium" ? 48 : 18;
  console.log(goal?.alignmentQuotients, rating, feedback);

  return (
    <>
      <Box className="align_quotnt_box">
        <Stack className="align_quotnt_hdr_flx">
          <Typography className="align_quotnt_title">
            Alignment Quotient
          </Typography>
        </Stack>
        <Typography className="align_quotnt_rating_title">Rating</Typography>
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
                ratingScore >= 48
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">High</Typography>
            </Box>
          </Stack>
        </Box>
        <Collapse id="expert" in={expanded === true}>
          <Box className="align_quotnt_feedbk">
            <Typography className="align_quotnt_feedbk_title">
              Feedback
            </Typography>
            <Typography className="align_quotnt_feedbk_text">
              {isReadMore
                ? feedback > 50
                  ? feedback?.length.slice(0, 50) + "..."
                  : feedback
                : feedback}
              {feedback > 50 ? (
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
        </Collapse>
        <Stack className="align_quotnt_btn_flx">
          <Box
            className="align_quotnt_viwmor"
            onClick={() => setExpanded(!expanded)}
          >
            <Typography className="align_quotnt_viwmor_txt">
              View {expanded === true ? "Less" : "More"}
            </Typography>
          </Box>
          <Box className="align_quotnt_viwmor">
            <Typography
              className="align_quotnt_viwmor_txt"
              onClick={() => setUpdateRating(true)}
            >
              Update
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ExpertViewRating;
