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
import { addAlignQuotientByExpert } from "../../../../../actions/align/alignQuotient/addAlignQuotientByExpert";
import Spinner from "../../../Spinner/Spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPost } from "../../../../../actions/align/posts/createPost";
const ExpertUpdateRating = ({
  goal,
  reportee,
  setUpdateRating,
  fetchDirectReports,
  setShowGoalOverview,
}: any) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [newFeedback, setNewFeedback] = useState("");
  const [newRating, setNewRating] = useState<any>(0);
  const [doneLoading, setDoneLoading] = useState(false);
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const onUpdateClick = async () => {
    try {
      console.log("called");
      setDoneLoading(true);
      if (newRating && feedback) {
        const response = await addAlignQuotientByExpert({
          goalId: goal?.id,
          alignmentQuotient: {
            rating:
              newRating === 18 ? "Low" : newRating === 48 ? "Medium" : "High",
            feedback: newFeedback,
          },
          expertUserId: user?.id,
          expertUserName: user?.name,
          userId: reportee?.userId ? reportee?.userId : reportee?.id,
          programId: reportee?.programId
            ? reportee?.programId
            : reportee?.activeProgramId,
        });
        setShowGoalOverview(false);
        fetchDirectReports();
        toast.success("Alignment Quotient updated successfully", {
          toastId: "ALIGNMENT_QUOTIENT_UPDATE",
        });
        console.log(response);
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
                newRating === 18 ? "Low" : newRating === 48 ? "Medium" : "High",
              feedback: newFeedback,
            
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: reportee?.userName
            ? reportee?.userName
            : reportee?.name,
          postedToUserId: reportee?.userId ? reportee?.userId : reportee?.id,
          postedToRole: "LP",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDoneLoading(false);
    }
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const feedback =
    goal?.alignmentQuotients[goal?.alignmentQuotients?.length - 1]?.feedback;

  const rating =
    goal?.alignmentQuotients[goal?.alignmentQuotients?.length - 1]?.rating;

  const ratingScore = rating === "High" ? 100 : rating === "Medium" ? 48 : 18;

  return (
    <>
      <Box className="align_quotnt_box">
        <Stack className="align_quotnt_hdr_flx">
          <Typography className="align_quotnt_title">
            Alignment Quotient
          </Typography>
        </Stack>
        <Typography className="align_quotnt_rating_title">
          New Rating
        </Typography>
        <Box className="align_quotnt_rating">
          <LinearProgress
            variant="determinate"
            value={newRating} // low - 18, medium - 48, high - 100
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
                newRating >= 18
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setNewRating(18)}
            >
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box
              className={
                newRating >= 48
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setNewRating(48)}
            >
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box
              className={
                newRating >= 84
                  ? "align_quotnt_dot rated_dot"
                  : "align_quotnt_dot"
              }
              onClick={() => setNewRating(100)}
            >
              <Typography className="align_quotnt_dot_text">High</Typography>
            </Box>
            <Box className="align_quotnt_feedbk"></Box>
          </Stack>
        </Box>
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
            inputProps={{
              sx: { fontSize: "16px", color: "#1C2129" },
            }}
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
          />
        </Box>
        <Typography className="align_quotnt_rating_title">
          Old Rating
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
                backgroundColor: "#1C2129",
              },
            }}
          />
          <Stack className="align_quotnt_dot_flex">
            <Box
              className={
                ratingScore >= 18
                  ? "align_quotnt_dot old_rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">Low</Typography>
            </Box>
            <Box
              className={
                ratingScore >= 48
                  ? "align_quotnt_dot old_rated_dot"
                  : "align_quotnt_dot"
              }
            >
              <Typography className="align_quotnt_dot_text">Medium</Typography>
            </Box>
            <Box
              className={
                ratingScore >= 84
                  ? "align_quotnt_dot old_rated_dot"
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

        <br />
        {doneLoading ? (
          <Spinner />
        ) : (
          <Stack className="align_quotnt_btn_flx">
            <Box className="align_quotnt_viwmor">
              <Typography
                className="align_quotnt_viwmor_txt"
                onClick={onUpdateClick}
              >
                Update
              </Typography>
            </Box>
            <Box className="align_quotnt_viwmor">
              <Typography
                className="align_quotnt_viwmor_txt"
                onClick={() => setUpdateRating(false)}
              >
                Cancel
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default ExpertUpdateRating;
