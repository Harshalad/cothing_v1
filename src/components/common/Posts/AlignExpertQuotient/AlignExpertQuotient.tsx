import { useState } from "react";
import { addAlignQuotientByExpert } from "../../../../actions/align/alignQuotient/addAlignQuotientByExpert";
import ExpertGiveRating from "./ExpertGiveRating/ExpertGiveRating";
import ExpertViewRating from "./ExpertViewRating/ExpertViewRating";
import ExpertUpdateRating from "./ExpertUpdateRating/ExpertUpdateRating";

const AlignExpertQuotient = ({
  preparePage,
  goal,
  reportee,
  fetchDirectReports,
  setShowGoalOverview,
}: any) => {
  const [updateRating, setUpdateRating] = useState(false);

  if (goal?.alignmentQuotients?.length) {
    if (updateRating) {
      return (
        <ExpertUpdateRating
          goal={goal}
          reportee={reportee}
          setUpdateRating={setUpdateRating}
          fetchDirectReports={fetchDirectReports}
          setShowGoalOverview={setShowGoalOverview}
        />
      );
    }
    return (
      <ExpertViewRating
        goal={goal}
        reportee={reportee}
        setUpdateRating={setUpdateRating}
      />
    );
  }
  return (
    <ExpertGiveRating
      preparePage={preparePage}
      goal={goal}
      reportee={reportee}
      setUpdateRating={setUpdateRating}
      fetchDirectReports={fetchDirectReports}
      setShowGoalOverview={setShowGoalOverview}
    />
  );
};

export default AlignExpertQuotient;
