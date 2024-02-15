import { Box, Collapse, LinearProgress, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

const AlignExpertQuotient = () => {

  var alignQuotntRating = 18;

  var text = "This goal is not aligned with next 6 month team goals -  goal is not aligned with next 6 month team goals";
  const [isReadMore, setIsReadMore] = useState(true);
  const [expanded, setExpanded] = useState<any>(false);
  const [open, setOpen] = useState<any>("");
  const [showAlignQuotRating, setAlignQuotRating] = useState<any>(0);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleTooltipOpen = (value: any) => {
    setOpen(
      value === "alignQuotient" ? value : false
    );
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box className="align_quotnt_box">
        <Stack className="align_quotnt_hdr_flx">
            <Typography className="align_quotnt_title">Alignment Quotient</Typography>
            <Box className="tooltip_box">
                <Tooltip
                    open={open === "alignQuotient"}
                    onClose={handleTooltipClose}
                    title="If phone number displayed is incorrect please reach out to your point of contact or support@nworx.ai"
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                >
                    <img
                        src="/images/more-info.png"
                        alt="more info"
                        width={22}
                        height={22}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleTooltipOpen("alignQuotient")}
                        onMouseEnter={() => handleTooltipOpen("alignQuotient")}
                    />
                </Tooltip>
            </Box>
        </Stack>
        <Typography className="align_quotnt_rating_title">Rating / New Rating</Typography>
        <Box className="align_quotnt_rating">
          <LinearProgress
            variant="determinate"
            value={showAlignQuotRating !== 0 ? showAlignQuotRating : alignQuotntRating} // low - 18, medium - 48, high - 100
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
            <Box className={showAlignQuotRating !== 0 ? showAlignQuotRating >= 18 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot" : alignQuotntRating >= 18 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"} onClick={() => setAlignQuotRating(18)}>
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box className={showAlignQuotRating !== 0 ? showAlignQuotRating >= 48 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot" : alignQuotntRating >= 48 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"} onClick={() => setAlignQuotRating(48)}>
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box className={showAlignQuotRating !== 0 ? showAlignQuotRating >= 84 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot" : alignQuotntRating >= 84 ? "align_quotnt_dot rated_dot" : "align_quotnt_dot"} onClick={() => setAlignQuotRating(100)}>
              <Typography className="align_quotnt_dot_text">High</Typography>
            </Box>
          </Stack>
        </Box>
        <Typography className="align_quotnt_rating_title">Old Rating</Typography>
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
                backgroundColor: "#1C2129"
              },
            }}
          />
          <Stack className="align_quotnt_dot_flex">
            <Box className={alignQuotntRating >= 18 ? "align_quotnt_dot old_rated_dot" : "align_quotnt_dot"}>
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box className={alignQuotntRating >= 48 ? "align_quotnt_dot old_rated_dot" : "align_quotnt_dot"}>
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box className={alignQuotntRating >= 84 ? "align_quotnt_dot old_rated_dot" : "align_quotnt_dot"}>
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
            <TextField
                id="align_quotnt_feedbck_txtfld"
                placeholder="Give quality Feedback"
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                    sx: { fontSize: "16px", color: "#1C2129" },
                }}
            />
          </Box>
        </Collapse>
        <Box className="align_quotnt_viwmor">
          <Typography className="align_quotnt_viwmor_txt">
              Give Rating
          </Typography>
        </Box><br />
        <Box className="align_quotnt_viwmor">
          <Typography className="align_quotnt_viwmor_txt">
              Done
          </Typography>
        </Box><br />
        <Stack className="align_quotnt_btn_flx">
            <Box className="align_quotnt_viwmor" onClick={() => setExpanded(!expanded)}>
                <Typography className="align_quotnt_viwmor_txt">
                    View {expanded === true ? "Less" : "More"}
                </Typography>
            </Box>
            <Box className="align_quotnt_viwmor">
                <Typography className="align_quotnt_viwmor_txt">
                    Update
                </Typography>
            </Box>
            <Box className="align_quotnt_viwmor">
                <Typography className="align_quotnt_viwmor_txt">
                    Cancel
                </Typography>
            </Box>
        </Stack>
      </Box>
    </>
  );
}
export default AlignExpertQuotient;