import { Box, Typography, Stack, LinearProgress } from "@mui/material";
import Milestone from "./Miltstone/Milestone";
import { ACHIEVE_VIEW_STATES } from "../../../../constants/achieve";

const Milestones = ({
  achieve,
  tabName,
  viewGoal,
  getIFrame,
  selectedGoal,
  selectedGoalMilestones,
  setIFrameLink,
  setIFrameTitle,
  goal,
  employeeData,
  viewState,
  setViewState,
  handleChange, setMediaType
}: any) => {
  const initiallyExpandedIndex = selectedGoalMilestones?.findIndex(
    (milestone: any) =>
      milestone?.mainMethod?.status?.toLowerCase() === "in_progress" ||
      milestone?.mainMethod?.status?.toLowerCase() === "-" ||
      milestone?.mainMethod?.status === null
  );
  return (
    <>
      {selectedGoalMilestones &&
        selectedGoalMilestones.map(
          (milestone: any, index: any, achieveArr: any) => {
            const mainMethodStatus =
              milestone?.mainMethod?.status?.toLowerCase();

            const mainMethod = milestone?.mainMethod;

            const supportingMethods = milestone?.supportingMethods || [];

            return (
              <Milestone
                key={index}
                milestone={milestone}
                mainMethod={mainMethod}
                mainMethodStatus={mainMethodStatus}
                supportingMethods={supportingMethods}
                milestonesCount={selectedGoalMilestones?.length}
                currentIndex={index}
                getIFrame={getIFrame}
                setIFrameLink={setIFrameLink}
                setMediaType={setMediaType}
                setIFrameTitle={setIFrameTitle}
                goal={goal}
                initiallyExpandedIndex={initiallyExpandedIndex}
                employeeData={employeeData}
              handleChange={handleChange}
              />
            );
          }
        )}
    </>
  );
};
export default Milestones;
