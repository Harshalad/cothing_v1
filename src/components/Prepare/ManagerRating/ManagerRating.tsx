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
import { addManagerRatingToWorksheet } from "../../../actions/prepare/rating/addRatingToWorksheet";
import { createPost } from "../../../actions/align/posts/createPost";
import { useSelector } from "react-redux";
import { updateRatingRequestToDone } from "../../../actions/prepare/rating/updateRatingRequestToDone";
import Spinner from "../../common/Spinner/Spinner";
import { toast } from "react-toastify";
import { updateRatingRequestToDoneQp } from "../../../actions/quickPrep/rating/updateRatingRequestToDone";

const ManagerRating = ({
  preparePage,
  showUpdate,
  employeeData,
  userWorkSheetId,
  getRatingRequests,
}: any) => {
  const [rating, setRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [showRatingHistory, setRatingHistory] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [generalComment, setGeneralComment] = useState<any>(null);

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
  console.log(employeeData, "employee data");

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
      if (userWorkSheetId && rating) {
        const response = await addManagerRatingToWorksheet({
          uwid: userWorkSheetId,
          rating: rating,
          ratedBy: user?.id,
          ratedByUserName: user?.name,
          generalComment,
          ratedByRole: currentUserRole,
        });
        const response2 = preparePage
          ? await updateRatingStatusToDone()
          : await updateRatingStatusToDoneQp();
        const response3 = await createPost({
          userWorksheetId: userWorkSheetId,
          userId: employeeData?.id,
          programId: employeeData?.activeProgramId,
          userGoalId: "userGoalId",
          type: preparePage ? "PREPARE" : "QUICK_PREPARE",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            type: "RATINGS_POST",
            rating: rating.toString(),
            ratedBy: user?.name,
            ratedByRole: currentUserRole,
            generalComment,
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
          toastId: "MANAGER_RATING_SUCCESS",
        });
        setRating(0);
        setGeneralComment(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        toastId: "MANAGER_RATING_FAILURE  ",
      });
    } finally {
      setRatingLoading(false);
      getRatingRequests();
    }
  };

  return (
    <>
      <Box className="prep_give_exprt_rating" sx={{ marginTop: "16px" }}>
        <Typography className="prep_msg_subtitle">
          {showUpdate === "update" ? "Update Rating" : "Give Rating"}
        </Typography>
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
        <Typography className="prep_more_title mt">Rating</Typography>
        <Stack className="prev_ratings_flex">
          <Rating
            name="quality rating"
            className="prep_rating"
            value={rating}
            onChange={(event: any, newValue: any) => {
              setRating(newValue);
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
            value={generalComment}
            onChange={(e) => setGeneralComment(e.target.value)}
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
export default ManagerRating;
