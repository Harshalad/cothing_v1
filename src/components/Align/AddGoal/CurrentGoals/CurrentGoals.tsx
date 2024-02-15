import { useState, useRef, useEffect } from "react";
import { Typography, Box, Stack, Avatar, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import SavedForLaterGoals from "../SaveForLaterGoals/SavedForLaterGoals";
import { updateUserGoalStatus } from "../../../../actions/align/updateUserGoalStatus";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { fetchSavedForLaterGoals } from "../../../../actions/align/fetchSavedForLaterGoals";
import { toast } from "react-toastify";

const CurrentGoals = ({
  currentGoals,
  setCurrentGoals,
  addPurpose,
  viewPurpose,
  selectedGoal,
  setSelectedGoal,
  PROGRAM_ID_TEMP,
  ASSIGNEE_USER_ID_TEMP,
  getCurrentGoals,
  employeeData,
}: any) => {
  const [showEditOption, setEditOption] = useState(false);
  const [isDisableBtn, setDisableBtn] = useState(false);
  const [savedForLaterGoals, setSavedForLaterGoals] = useState(null);
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const managerToggleView = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const goalAddedByOthers = currentGoals.filter(
    (currentGoal: any) => currentGoal.addedByUserId !== user.id
  );
  const goalsAddedByMe = currentGoals.filter(
    (currentGoal: any) => currentGoal.addedByUserId === user.id
  );

  const isManagerView =
    managerToggleView === MANAGER_VIEW_STATE.LP ? false : true;

  const userId = isManagerView ? employeeData?.id : user.id;
  const userName = isManagerView ? employeeData?.name : user.name;

  const programId = isManagerView
    ? employeeData?.activeProgramId
    : user.activeProgramId;
  console.log(currentGoals, "CURRENT GOALS");

  // const assignGoals = async () => {
  //   try {
  //     let selectedGoalIds: any = [];

  //     currentGoals?.map((curGoal: any) => {
  //       if (curGoal.status === "ADDED") {
  //         selectedGoalIds.push(curGoal.id);
  //       }
  //     });

  //     const response = await updateUserGoalStatus({
  //       status: isManagerView ? "ASSIGNED" : "SENT_FOR_APPROVAL",
  //       userId,
  //       programId,
  //       goalId: selectedGoalIds,
  //       userName,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const assignGoal = async (goal: any) => {
    try {
      console.log({
        status: isManagerView ? "ASSIGNED" : "SENT_FOR_APPROVAL",
        userId,
        programId,
        goalId: goal?.id,
        userName,
      });
      const response = await updateUserGoalStatus({
        status: isManagerView ? "ASSIGNED" : "SENT_FOR_APPROVAL",
        userId,
        programId,
        goalId: goal?.id,
        userName: user?.name,
      });
      await getCurrentGoals();
      toast.success(
        isManagerView
          ? "Goal assigned successfully."
          : "Goal sent for approval to your manager.",
        { toastId: "GOAL_SENT_OR_ASSIGNED_CURRENT_GOALS" }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const onSaveForLaterClicked = async (id: string) => {
  //   try {
  //     const response = await updateUserGoalStatus({
  //       status: "SAVED_FOR_LATER",
  //       userId,

  //       programId,
  //       goalId: id,
  //     });
  //     const filteredCurrentGoals = currentGoals.filter(
  //       (currentGoal: any) => currentGoal?.id !== id
  //     );
  //     setCurrentGoals(filteredCurrentGoals);
  //     getSavedForLaterGoals();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onAddClicked = async (id: string) => {
  //   try {
  //     const response = await updateUserGoalStatus({
  //       status: "ADDED",
  //       userId,
  //       programId,
  //       goalId: id,
  //     });
  //     const filteredCurrentGoals = currentGoals.filter(
  //       (currentGoal: any) => currentGoal?.id === id
  //     );
  //     setCurrentGoals([...currentGoals, filteredCurrentGoals]);
  //     getSavedForLaterGoals();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getSavedForLaterGoals = async () => {
  //   try {
  //     const response = await fetchSavedForLaterGoals({
  //       userId,
  //       programId,
  //     });
  //     //@ts-ignore
  //     if (response?.savedForLaterGoals) {
  //       //@ts-ignore
  //       setSavedForLaterGoals(response?.savedForLaterGoals);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getSavedForLaterGoals();
  // }, []);

  return (
    <>
      <Box className="goals_main">
        <Box className="added_goals_block">
          <Typography
            sx={{
              marginBottom: "12px",
              color: "#989EA5",
              fontSize: "12px",
            }}
          >
            {/* Add details and assign goals. */}
          </Typography>
          <Box className="goals_main no_goals_main">
            <Typography sx={{ color: "#5D636B", fontSize: "16px" }}>
              Start assigning the goals
            </Typography>
          </Box>
          <Box className="goals_main">
            <Box className="disabled_goals_block">
              {goalAddedByOthers &&
                goalAddedByOthers.map((currentGoal: any, index: number) => {
                  return (
                    <Stack
                      key={index}
                      p="12px"
                      mb="12px"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        border: "1px solid #EAECEF",
                        borderRadius: "8px",
                      }}
                      gap="10px"
                    >
                      <Box className="currentgoal_content_limit">
                        <Typography
                          className="disbaled_goal_name"
                          sx={{ color: "#C8CDD4" }}
                        >
                          {currentGoal?.nameAlias
                            ? currentGoal?.nameAlias
                            : currentGoal?.name}
                        </Typography>
                      </Box>
                      {!currentGoal?.onStart &&<Stack flexDirection="row" alignItems="center" gap="10px">
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#F58A43",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            viewPurpose(e);
                            setSelectedGoal(currentGoal);
                          }}
                        >
                          View Details
                        </Typography>
                        <Avatar
                          sx={{
                            width: "22px",
                            height: "22px",
                            bgcolor: "#E8E3FF",
                            color: "#6755C3",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {currentGoal?.addedBy?.substring(0, 1)}
                        </Avatar>
                      </Stack>}
                    </Stack>
                  );
                })}
            </Box>
            <Box className="added_goals_block">
              {goalsAddedByMe &&
                goalsAddedByMe.map((currentGoal: any, index: number) => {
                  return (
                    <Stack
                      key={index}
                      p="12px"
                      mb="12px"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        border: "1px solid #C8CDD4",
                        borderRadius: "8px",
                      }}
                      gap="10px"
                    >
                      <Box className="currentgoal_content_limit">
                        <Typography
                          className="added_goal_name"
                          sx={{ color: "#5D636B" }}
                        >
                          {currentGoal?.nameAlias
                            ? currentGoal?.nameAlias
                            : currentGoal?.name}
                        </Typography>
                      </Box>
                     {!currentGoal?.onStart&& <Stack flexDirection="row" alignItems="center" gap="10px">
                        {/* <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#989EA5",
                            cursor: "pointer",
                          }}
                          //@ts-ignore
                          onClick={() => onSaveForLaterClicked(currentGoal?.id)}
                        >
                          Save for later
                        </Typography> */}
                        <Typography
                          id="goal1"
                          className="purpose_btn"
                          sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            color: "#F58A43",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            addPurpose(e);
                            setSelectedGoal(currentGoal);
                          }}
                        >
                          {currentGoal?.purposeStatus
                            ? "Edit Details"
                            : "Add Details"}
                        </Typography>
                        {/* // (currentGoal?.status !== "ASSIGNED" ||
                          //   (currentGoal?.status !== "SENT_FOR_APPROVAL" &&
                          //     currentGoal?.status !== "IN_PROGRESS")) && ( */}
                        {
                          currentGoal?.purposeStatus &&
                            currentGoal?.status === "ADDED" && (
                              // <Box className="assign_goal_btn">
                              <Button
                                sx={{
                                  color: "#FFFFFF",
                                  backgroundColor: "#F58A43",
                                  boxShadow: "none",
                                  "&:hover": {
                                    backgroundColor: "#F58A43",
                                    boxShadow: "none",
                                  },
                                  textTransform: "none",
                                  // padding: "8px !important",
                                  height: "25px !important",
                                  // maxWidth: "80px !important",
                                  width: "180px !important",
                                  fontSize: "14px  !important",
                                }}
                                onClick={() => assignGoal(currentGoal)}
                                disabled={isDisableBtn ? true : false}
                              >
                                {isManagerView ? "Assign" : "Send to manager"}
                              </Button>
                            )
                          // </Box>
                        }
                      </Stack>}
                    </Stack>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box className="assign_goal_btn">
        <Button
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#F58A43",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#F58A43",
              boxShadow: "none",
            },
            textTransform: "none",
            padding: "8px !important",
            width: "180px !important",
            fontSize: "14px  !important",
          }}
          onClick={() => assignGoals()}
          disabled={isDisableBtn ? true : false}
        >
          {isManagerView ? "Send to manager" : "Assign"}
        </Button>
      </Box> */}
      {/* <Divider sx={{ border: "1px solid #EAECEF", margin: "16px 0" }} />
      <SavedForLaterGoals
        goals={savedForLaterGoals}
        onAddClicked={onAddClicked}
        addPurpose={addPurpose}
        setSelectedGoal={setSelectedGoal}
        showEditOption={showEditOption}
      /> */}
    </>
  );
};

export default CurrentGoals;
