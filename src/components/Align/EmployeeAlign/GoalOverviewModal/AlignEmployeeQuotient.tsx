import { Box, Collapse, LinearProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

const AlignEmployeeQuotient = () => {

  var alignQuotntRating = 0;

  var text = "This goal is not aligned with next 6 month team goals -  goal is not aligned with next 6 month team goals";
  const [isReadMore, setIsReadMore] = useState(true);
  const [expanded, setExpanded] = useState<any>(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <Box className="align_quotnt_box">
        <Typography className="align_quotnt_title">Alignment Quotient</Typography>
        <Box className="align_quotnt_rating">
          <LinearProgress
            variant="determinate"
            value={alignQuotntRating} // low - 18, medium - 48, high - 100
            sx={{
              width: "100%",
              height: "8px",
              borderRadius: "8px",
              "&.MuiLinearProgress-root": {
                backgroundColor: "#C8CDD4"
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2E5DB0"
              },
            }}
          />
          <Stack className="align_quotnt_dot_flex">
            <Box className={alignQuotntRating >= 18 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"}>
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box className={alignQuotntRating >= 48 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"}>
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box className={alignQuotntRating >= 84 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"}>
              <Typography className="align_quotnt_dot_text">High</Typography>
            </Box>
          </Stack>
        </Box>
        <Collapse id="expert" in={expanded === true}>
          <Box className="align_quotnt_feedbk">
            <Typography className="align_quotnt_feedbk_title">Feedback</Typography>
            <Typography className="align_quotnt_feedbk_text">
              {isReadMore ? text.length > 50 ? text.slice(0, 50) + "..." : text : text}
              {text.length > 50
              ?
                <span className="align_quotnt_feedbk_readmr" onClick={toggleReadMore}>
                  {isReadMore ? " Read more" : " Read less"}
                </span>
              :
                ""
              }
            </Typography>
          </Box>
        </Collapse>
        <Box className="align_quotnt_viwmor" onClick={() => setExpanded(!expanded)}>
          <Typography className="align_quotnt_viwmor_txt">
              View {expanded === true ? "Less" : "More"}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default AlignEmployeeQuotient;