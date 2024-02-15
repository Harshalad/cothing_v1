import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Collapse,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addAlignQuotientByExpert } from "../../../../../actions/align/alignQuotient/addAlignQuotientByExpert";
import Spinner from "../../../Spinner/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPost } from "../../../../../actions/align/posts/createPost";
const ExpertGiveRating = ({
  goal,
  reportee,
  setUpdateRating,
  fetchDirectReports,
  setShowGoalOverview,
}: any) => {
  var alignQuotntRating = 0;
  console.log(reportee,"alignQuotntRating");
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const [expanded, setExpanded] = useState<any>(false);
  const [showAlignQuotRating, setAlignQuotRating] = useState<any>(0);
  const [feedback, setFeedback] = useState("");
  const [doneLoading, setDoneLoading] = useState(false);

  const onDoneClick = async () => {
    try {
      setDoneLoading(true);
      if (showAlignQuotRating && feedback) {
        const response = await addAlignQuotientByExpert({
          goalId: goal?.id,
          alignmentQuotient: {
            rating:
              showAlignQuotRating === 18
                ? "Low"
                : showAlignQuotRating === 48
                ? "Medium"
                : "High",
            feedback,
          },
          expertUserId: user?.id,
          expertUserName: user?.name,
          userId: reportee?.userId ? reportee?.userId : reportee?.id,
          programId: reportee?.programId
            ? reportee?.programId
            : reportee?.activeProgramId,
        });
        await createPost({
          userId: reportee?.userId ? reportee?.userId : reportee?.id,
          programId: reportee?.programId
            ? reportee?.programId
            : reportee?.activeProgramId,
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            type: "ALIGNMENT_QUOTIENT_POST",
              rating:
                showAlignQuotRating === 18
                  ? "Low"
                  : showAlignQuotRating === 48
                  ? "Medium"
                  : "High",
              feedback:feedback,
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName:reportee?.userName ? reportee?.userName : reportee?.name,
          postedToUserId:reportee?.userId ? reportee?.userId : reportee?.id,
          postedToRole:"LP"

        });
        setShowGoalOverview(false);
        fetchDirectReports();
        toast.success("Alignment Quotient added successfully", {
          toastId: "ALIGNMENT_QUOTIENT_ADD",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDoneLoading(false);
    }
  };

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
            value={
              showAlignQuotRating !== 0
                ? showAlignQuotRating
                : alignQuotntRating
            } // low - 18, medium - 48, high - 100
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
                showAlignQuotRating !== 0
                  ? showAlignQuotRating >= 18
                    ? "align_quotnt_dot rated_dot"
                    : "align_quotnt_dot"
                  : alignQuotntRating >= 18
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setAlignQuotRating(18)}
            >
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box
              className={
                showAlignQuotRating !== 0
                  ? showAlignQuotRating >= 48
                    ? "align_quotnt_dot rated_dot"
                    : "align_quotnt_dot"
                  : alignQuotntRating >= 48
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setAlignQuotRating(48)}
            >
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box
              className={
                showAlignQuotRating !== 0
                  ? showAlignQuotRating >= 84
                    ? "align_quotnt_dot rated_dot"
                    : "align_quotnt_dot"
                  : alignQuotntRating >= 84
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setAlignQuotRating(100)}
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

            <TextField
              id="align_quotnt_feedbck_txtfld"
              placeholder="Give quality Feedback"
              variant="outlined"
              size="small"
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              inputProps={{
                sx: { fontSize: "16px", color: "#1C2129" },
              }}
            />
          </Box>
        </Collapse>
        {/* <Box className="align_quotnt_viwmor">
            <Typography className="align_quotnt_viwmor_txt">
              Give Rating
            </Typography>
          </Box> */}
        {/* <br /> */}
        {/* <Box className="align_quotnt_viwmor">
            <Typography className="align_quotnt_viwmor_txt">Done</Typography>
          </Box> */}
        <br />
        {expanded !== true ? (
          <Stack className="align_quotnt_btn_flx">
            <Box
              className="align_quotnt_viwmor"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {expanded !== true ? (
                <Typography className="align_quotnt_viwmor_txt">
                  Give Rating
                </Typography>
              ) : null}
            </Box>
          </Stack>
        ) : (
          <Stack className="align_quotnt_btn_flx">
            {doneLoading ? (
              <Spinner />
            ) : (
              <Box className="align_quotnt_viwmor" onClick={onDoneClick}>
                <Typography className="align_quotnt_viwmor_txt">
                  Done
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default ExpertGiveRating;
