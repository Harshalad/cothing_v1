import { Box, Stack, Typography } from "@mui/material";
import ActiveAssessments from "./ActiveAssessments";
import CompletedAssessments from "./CompletedAssessments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchActiveGiveMRA } from "../../actions/analyze/fetchActiveGiveMRA";
import { fetchCompletedGiveMRA } from "../../actions/analyze/fetchCompletedGiveMRA";
import Spinner from "../common/Spinner/Spinner";
const GiveFeedback = ({ activeClass }: any) => {
  // @ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  console.log(user, "giveUser");
  const [feedbackActiveAssessments, setFeedbackActiveAssessments] =
    useState<any>(null);
  const [feedbackcompletedAssessments, setFeedbackcompletedAssessments] =
    useState<any>(null);
  const [showSppiner, setShowSppiner] = useState<any>(false);

  useEffect(() => {
    setShowSppiner(true);
    const fetechFeedbackActiveAssessments = async () => {
      // console.log(user, "activeGiveMRA");
      const response = await fetchActiveGiveMRA({ userId: user?.id });
      // console.log(response, "activeGiveMRA");
      if (response) {
        //@ts-ignore
        setFeedbackActiveAssessments(response?.activeGiveMRA);
      }
    };
    const fetchFeedbackcompletedAssessments = async () => {
      const response = await fetchCompletedGiveMRA({ userId: user?.id });
      // console.log(response, "completedGiveMRA");
      if (response) {
        //@ts-ignore
        setFeedbackcompletedAssessments(response?.completedGiveMRA);
      }
    };
    setShowSppiner(false);
    fetechFeedbackActiveAssessments();
    fetchFeedbackcompletedAssessments();
  }, [activeClass]);
  return (
    <>
      <Box className="active_assmnts_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">
            Active Assessments
          </Typography>
        </Stack>
        {showSppiner ? (
          <Spinner />
        ) : (
          <ActiveAssessments
            activeClass={activeClass}
            feedbackActiveAssessments={feedbackActiveAssessments}
          />
        )}
      </Box>
      <Box className="compltd_assmnts_contr">
        <Typography className="active_assmnts_title">
          Completed Assessments
        </Typography>
        {showSppiner ? (
          <Spinner />
        ) : (
          <CompletedAssessments
            activeClass={activeClass}
            feedbackcompletedAssessments={feedbackcompletedAssessments}
          />
        )}
      </Box>
    </>
  );
};
export default GiveFeedback;
