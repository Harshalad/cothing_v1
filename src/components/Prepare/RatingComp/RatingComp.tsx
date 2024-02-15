import {
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import ExpertGiveRating from "./ExpertGiveRating/ExpertGiveRating";
import { current } from "@reduxjs/toolkit";

const RatingComp = ({
  preparePage,
  expertRatings,
  employeeData,
  userWorkSheetId,
  worksheet,
  pageType,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [expertGiveRating, setExpertGiveRating] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  // const rating = expertRatings
  //   .toReversed()
  //   .find((expertRating: any) => expertRating.ratedBy === user?.id);

  let finalRatings: any[] = [];

  if (expertRatings && expertRatings.length) {
    let ratingMap = new Map();
    for (const er of expertRatings) {
      ratingMap.set(er.ratedBy, er);
    }

    ratingMap.forEach(function (value, key) {
      finalRatings.push(value);
    });
  }

  const myRatings = finalRatings?.filter(
    (rating) => rating?.ratedBy === user?.id
  );
  console.log(worksheet?.status, "WORKSHEET STATUS");
  console.log(myRatings, "myRatings");
  return (
    <>
      {!finalRatings?.length ? (
        <Box className="prep_rating_box">
          <Typography className="rating_title">
            No feedback received yet
          </Typography>
          <Rating name="no rating" value={0} readOnly className="prep_rating" />
        </Box>
      ) : null}
      {finalRatings?.map((ratingObject: any, index: number) => {
        console.log(ratingObject, "ratingsObject");

        if (ratingObject?.ratedByRole === "EXPERT") {
          return (
            <ExpertRatingView
              ratingObject={ratingObject}
              index={index}
              key={index}
              expertGiveRating={expertGiveRating}
              setExpertGiveRating={setExpertGiveRating}
              showUpdate={showUpdate}
              setShowUpdate={setShowUpdate}
            />
          );
        } else {
          return (
            <ManagerRatingView
              ratingObject={ratingObject}
              index={index}
              key={index}
            />
          );
        }
      })}
      {currentUserRole === MANAGER_VIEW_STATE.EXPERT &&
      !myRatings?.length &&
      (worksheet?.status?.toUpperCase() === "COMPLETED" ||
        worksheet?.status?.toUpperCase() === "IN_PROGRESS") ? (
        !expertGiveRating ? (
          <Box
            className="prep_rating_cta_box disabled"
            sx={{
              display: "flex",
              justifyContent: "center !important",
              width: "100%",
            }}
            onClick={() => setExpertGiveRating(true)}
          >
            <Typography
              className="prep_ask_rating"
              onClick={() => {}}
              sx={{ textAlign: "center" }}
            >
              Give Rating
            </Typography>
          </Box>
        ) : null
      ) : null}
      {currentUserRole === MANAGER_VIEW_STATE.EXPERT && expertGiveRating ? (
        <ExpertGiveRating
          preparePage={preparePage}
          expertGiveRating={expertGiveRating}
          setExpertGiveRating={setExpertGiveRating}
          employeeData={employeeData}
          userWorkSheetId={userWorkSheetId}
          showUpdate={showUpdate}
          pageType={pageType}
          setShowUpdate={setShowUpdate}
          ratingObject={finalRatings?.find(
            (ratingObject) => ratingObject?.ratedBy === user?.id
          )}
        />
      ) : null}
    </>
  );
};
export default RatingComp;

const ManagerRatingView = ({ ratingObject, index }: any) => {
  const [expanded, setExpanded] = useState<any>(false);

  const viewMore = (clickedName: any) => {
    var accordClass: any = document.getElementById(clickedName);
    if (accordClass.classList.contains("MuiCollapse-hidden")) {
      setExpanded(clickedName);
    } else {
      setExpanded(false);
    }
  };
  return (
    <Box className="prep_rating_box">
      <Stack className="prep_mngr_rating_flex">
        <Box className="prep_mngr_rating_box">
          <Stack className="prep_mngrs_rating_flex">
            <Typography className="rating_title">Managers Rating</Typography>
            <Rating
              name="manager rating"
              value={ratingObject?.rating}
              readOnly
              className="prep_rating"
            />
          </Stack>
        </Box>
        <Box className="prep_rating_cta_box">
          <Typography
            className="prep_rating_cta"
            onClick={() => viewMore(`manager-${index}`)}
          >
            View {expanded === `manager-${index}` ? "Less" : "More"}
          </Typography>
        </Box>
      </Stack>
      <Collapse id={`manager-${index}`} in={expanded === `manager-${index}`}>
        <Divider className="prep_rating_hr" />
        <Box className="prep_exprt_more">
          <Typography className="prep_more_title">
            Manager has given you the following rating for your preparation
          </Typography>
          <Typography className="prep_more_text">
            {ratingObject?.generalComment}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

const ExpertRatingView = ({
  ratingObject,
  index,
  expertGiveRating,
  setExpertGiveRating,
  showUpdate,
  setShowUpdate,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [expanded, setExpanded] = useState<any>(false);

  const viewMore = (clickedName: any) => {
    var accordClass: any = document.getElementById(clickedName);
    if (accordClass.classList.contains("MuiCollapse-hidden")) {
      setExpanded(clickedName);
    } else {
      setExpanded(false);
    }
  };
  console.log(ratingObject, "RATING OBJECT");
  return (
    <Box className="prep_rating_box">
      <Stack className="prep_exprt_rating_flex">
        <Box className="prep_exprt_rating_box">
          <Stack className="prep_qulty_rating_flex">
            <Typography className="rating_title">Quality Rating</Typography>
            <Rating
              name="quality rating"
              value={ratingObject?.qualityRating}
              readOnly
              className="prep_rating"
            />
          </Stack>
          <Stack className="prep_thorough_rating_flex">
            <Typography className="rating_title">
              Thoroughness Rating
            </Typography>
            <Rating
              name="thoroughness rating"
              value={ratingObject?.thoroughnessRating}
              readOnly
              className="prep_rating"
            />
          </Stack>
        </Box>
        {ratingObject?.ratedBy === user?.id ? (
          <Box className="prep_rating_cta_box">
            <Typography
              className="prep_rating_cta"
              onClick={() => {
                setExpertGiveRating(true);
                setShowUpdate(true);
              }}
            >
              Update
            </Typography>
          </Box>
        ) : null}
        {(currentUserRole === MANAGER_VIEW_STATE.LP ||
          currentUserRole === MANAGER_VIEW_STATE.EXPERT) && (
          <Box className="prep_rating_cta_box">
            <Typography
              className="prep_rating_cta"
              onClick={() => viewMore(`expert-${index}`)}
            >
              View {expanded === `expert-${index}` ? "Less" : "More"}
            </Typography>
          </Box>
        )}
      </Stack>
      <Collapse id={`expert-${index}`} in={expanded === `expert-${index}`}>
        <Divider className="prep_rating_hr" />
        <Box className="prep_exprt_more">
          <Typography className="prep_more_title">Quality</Typography>
          <Typography className="prep_more_text">
            {ratingObject?.qualityComment}
          </Typography>
        </Box>
        <Box className="prep_exprt_more">
          <Typography className="prep_more_title">Thoroughness</Typography>
          <Typography className="prep_more_text">
            {ratingObject?.thoroughnessComment}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};
