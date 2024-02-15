import {
  Box,
  Button,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateRatingRequestToDone } from "../../../actions/prepare/rating/updateRatingRequestToDone";
import { addExpertRatingToWorksheet } from "../../../actions/prepare/rating/addRatingToWorksheet";
import { createPost } from "../../../actions/align/posts/createPost";
import Spinner from "../../common/Spinner/Spinner";
import { toast } from "react-toastify";
import { updateRatingRequestToDoneQp } from "../../../actions/quickPrep/rating/updateRatingRequestToDone";
import { fetchWorksheetAIRating } from "../../../actions/aiRating/fetchWorksheetAIRating";

const ExpertRating = ({
  preparePage,
  showUpdate,
  employeeData,
  userWorkSheetId,
  getRatingRequests,
}: any) => {
  const [qualityRating, setQualityRating] = useState(0);
  const [thoroughnessRating, setThoroughnessRating] = useState(0);
  const [showRatingHistory, setRatingHistory] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [thoroughnessComment, setThoroughnessComment] = useState<any>(null);
  const [qualityComment, setQualityComment] = useState<any>(null);
  const [aiLoader, setAiLoader] = useState(false);
  const [aiRatingId, setAiRatingId] = useState<any>(null);

  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  var text =
    "This goal is not aligned with next 6 month team goals -  goal is not aligned with next 6 month team goals";

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const updateRatingStatusToDone = async () => {
    try {
      if (userWorkSheetId && user?.id) {
        const response = updateRatingRequestToDone(userWorkSheetId, user?.id);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(preparePage,"shjfsa")
  const handleGenrateClick = async () => {
    setAiLoader(true);
    const response = await fetchWorksheetAIRating({ worksheetId: userWorkSheetId, userId: employeeData?.id, programId: employeeData?.activeProgramId, qp: !preparePage })
    console.log(response, "adityairesponse");
    if(response!==null){
      //@ts-ignore
      setQualityRating(response?.quality_rating);
      //@ts-ignore
      setQualityComment(response?.quality_feedback);
      //@ts-ignore
      setThoroughnessRating(response?.thoroughness_rating);
      //@ts-ignore
      setThoroughnessComment(response?.thoroughness_feedback);
      //@ts-ignore
      setAiRatingId(response?.id);
      toast.success("Feedback Generated")
    }else{
      toast.warning("Try again after sometime",);
      // handleGenrateClick();
    }
    
    // setQualityRating(1);
    setAiLoader(false);
  }
  const updateRatingStatusToDoneQp = async () => {
    try {
      if (userWorkSheetId && user?.id) {
        const response = updateRatingRequestToDoneQp({
          userWorksheetId: userWorkSheetId,
          raterId: user?.id,
          userId: employeeData?.id,
          programId: employeeData?.activeProgramId,
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      setRatingLoading(true);
      if (userWorkSheetId && qualityRating && thoroughnessRating) {
        const response = await addExpertRatingToWorksheet({
          uwid: userWorkSheetId,
          ratedBy: user?.id,
          ratedByUserName: user?.name,
          qualityComment,
          thoroughnessComment,
          qualityRating,
          thoroughnessRating,
          ratedByRole: currentUserRole,
          aiRatingId:aiRatingId
        });
        const response2 = preparePage
          ? await updateRatingStatusToDone()
          : await updateRatingStatusToDoneQp();
        const response3 = await createPost({
          userWorksheetId: userWorkSheetId,
          userId: employeeData?.id,
          programId: employeeData?.activeProgramId,
          // userGoalId,
          type: preparePage ? "PREPARE" : "QUICK_PREPARE",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            type: "RATINGS_POST",
            qualityRating,
            qualityComment,
            thoroughnessRating,
            thoroughnessComment,
            ratedBy: user?.name,
            ratedByRole: currentUserRole,
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: employeeData?.name,
          postedToUserId: employeeData?.id,
          postedToRole: "LP",
        });
        toast.success("Rating added successfully!", {
          toastId: "EXPERT_RATING_SUCCESS",
        });
        setQualityRating(0);
        setQualityComment(null);
        setThoroughnessRating(0);
        setThoroughnessComment(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        toastId: "EXPERT_RATING_FAILURE  ",
      });
    } finally {
      setRatingLoading(false);
      getRatingRequests();
    }
  };

  return (
    <>
      <Box className="prep_give_exprt_rating">
        <div style={{ display: "flex", justifyContent: "space-between", }}>
          <Typography className="prep_msg_subtitle">
            {showUpdate === "update" ? "Update Rating" : "Give Rating/Request for Rating"}
          </Typography>
          {aiLoader ? <Spinner /> : <Button style={{ width: "155px", padding: "2px", marginBottom: "8px", backgroundColor: "#f58a43", color: "#ffffff", fontSize: "14px", textTransform: "none" }} onClick={() => handleGenrateClick()}>Generate Rating</Button>}
        </div>


        {showUpdate === "update" ? (
          ""
        ) : (
          <>
            <Typography className="prep_rqstd_rtng_subtext">
              {employeeData?.name} has completed their preparation
            </Typography>
            <Typography className="prep_msg_text">
              Please take the required action for this goal / rating is
              requested
            </Typography>
            {/* <Typography
              className="prep_msg_readmore"
              onClick={() => setRatingHistory(!showRatingHistory)}
            >
              {showRatingHistory === true
                ? "Close previous ratings and comments"
                : "View previous ratings and comments"}
            </Typography> */}
          </>
        )}
        <Typography className="prep_more_title mt">Quality Rating</Typography>
        <Stack className="prev_ratings_flex">
          <Rating
            name="quality rating"
            className="prep_rating"
            value={qualityRating}
            onChange={(event: any, newValue: any) => {
              setQualityRating(newValue);
            }}
          />
          {showRatingHistory === true || showUpdate === "update" ? (
            <Typography className="prep_new_rtng_text">(New)</Typography>
          ) : (
            ""
          )}
        </Stack>
        <Box className="algn_askqust_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Write your reason here..."
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ sx: { fontSize: "14px", color: "#1C2129" } }}
            value={qualityComment}
            onChange={(e) => setQualityComment(e.target.value)}
            multiline
          />
        </Box>
        {showRatingHistory === true || showUpdate === "update" ? (
          <Box className="curprev_ratings_box">
            <Box className="curnt_ratings_box">
              <Stack className="prev_ratings_flex">
                <Rating
                  name="quality rating"
                  className="prep_rating"
                  value={2}
                  readOnly
                />
                <Typography className="prep_prev_rtng_text">
                  (Current rating on 02/04/2023)
                </Typography>
              </Stack>
              <Box className="prep_msg_text_box">
                <Typography className="prep_more_text">
                  {isReadMore
                    ? text.length > 50
                      ? text.slice(0, 50) + "..."
                      : text
                    : text}
                </Typography>
                {text.length > 50 ? (
                  <span className="prep_msg_readmore" onClick={toggleReadMore}>
                    {isReadMore ? "Read more" : "Read less"}
                  </span>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="prev_ratings_box">
              <Stack className="prev_ratings_flex">
                <Rating
                  name="quality rating"
                  className="prep_rating"
                  value={2}
                  readOnly
                />
                <Typography className="prep_prev_rtng_text">
                  (Previous rating on 02/02/2023)
                </Typography>
              </Stack>
              <Box className="prep_msg_text_box">
                <Typography className="prep_more_text">
                  {isReadMore
                    ? text.length > 50
                      ? text.slice(0, 50) + "..."
                      : text
                    : text}
                </Typography>
                {text.length > 50 ? (
                  <span className="prep_msg_readmore" onClick={toggleReadMore}>
                    {isReadMore ? "Read more" : "Read less"}
                  </span>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
        <Divider className="prep_msg_hr" />
        <Typography className="prep_more_title mt">
          Thoroughness Rating
        </Typography>
        <Stack className="prev_ratings_flex">
          <Rating
            name="thoroughness rating"
            className="prep_rating"
            value={thoroughnessRating}
            onChange={(event: any, newValue: any) => {
              setThoroughnessRating(newValue);
            }}
          />
          {showRatingHistory === true || showUpdate === "update" ? (
            <Typography className="prep_new_rtng_text">(New)</Typography>
          ) : (
            ""
          )}
        </Stack>
        <Box className="algn_askqust_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Write your reason here..."
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ sx: { fontSize: "14px", color: "#1C2129" } }}
            value={thoroughnessComment}
            onChange={(e) => setThoroughnessComment(e.target.value)}
            multiline
          />
        </Box>
        {showRatingHistory === true || showUpdate === "update" ? (
          <Box className="curprev_ratings_box">
            <Box className="curnt_ratings_box">
              <Stack className="prev_ratings_flex">
                <Rating
                  name="quality rating"
                  className="prep_rating"
                  value={2}
                  readOnly
                />
                <Typography className="prep_prev_rtng_text">
                  (Current rating on 02/04/2023)
                </Typography>
              </Stack>
              <Box className="prep_msg_text_box">
                <Typography className="prep_more_text">
                  {isReadMore
                    ? text.length > 50
                      ? text.slice(0, 50) + "..."
                      : text
                    : text}
                </Typography>
                {text.length > 50 ? (
                  <span className="prep_msg_readmore" onClick={toggleReadMore}>
                    {isReadMore ? "Read more" : "Read less"}
                  </span>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="prev_ratings_box">
              <Stack className="prev_ratings_flex">
                <Rating
                  name="quality rating"
                  className="prep_rating"
                  value={2}
                  readOnly
                />
                <Typography className="prep_prev_rtng_text">
                  (Previous rating on 02/02/2023)
                </Typography>
              </Stack>
              <Box className="prep_msg_text_box">
                <Typography className="prep_more_text">
                  {isReadMore
                    ? text.length > 50
                      ? text.slice(0, 50) + "..."
                      : text
                    : text}
                </Typography>
                {text.length > 50 ? (
                  <span className="prep_msg_readmore" onClick={toggleReadMore}>
                    {isReadMore ? "Read more" : "Read less"}
                  </span>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
        {ratingLoading ? (
          <Spinner />
        ) : (
          <Box
            className="standard_cta_box"
            sx={{
              textAlign:
                showRatingHistory === true || showUpdate === "update"
                  ? "center!important"
                  : "right",
            }}
          >
            <Button className="standard_cta" onClick={onSubmit}>
              {showUpdate === "update" ? "Update" : "Done"}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};
export default ExpertRating;
