import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSavedForLaterGoals } from "../../../../actions/align/fetchSavedForLaterGoals";
import { updateUserGoalStatus } from "../../../../actions/align/updateUserGoalStatus";
import { useSelector } from "react-redux";

const SavedForLaterGoals = ({
  goals,
  onAddClicked,
  addPurpose,
  setSelectedGoal,
  showEditOption,
}: any) => {
  console.log("inside saved for later", goals);

  return (
    <Box>
      <Box className="no_goals_saved">
        <Typography
          className="goal_heading"
          sx={{ fontWeight: "600", color: "#1C2129" }}
        >
          No goals saved for later
        </Typography>
      </Box>
      <Box>
        <Typography
          className="goal_heading"
          sx={{ fontWeight: "600", color: "#1C2129" }}
        >
          Saved for later
        </Typography>
      </Box>
      <Typography
        sx={{
          fontWeight: "500",
          color: "#1C2129",
          marginBottom: "16px",
          fontSize: "12px",
        }}
      >
        Your goals are automatically saved here for later
      </Typography>
      {goals &&
        goals.map((currentGoal: any, index: number) => {
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
                  {currentGoal?.name}
                </Typography>
              </Box>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap="10px"
                //@ts-ignore
                onClick={() => onAddClicked(currentGoal?.id)}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#989EA5",
                    cursor: "pointer",
                  }}
                >
                  Add
                </Typography>
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
                  {showEditOption ? "Edit Details" : "Add Purpose"}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      {/* <Stack
          p="12px"
          mb="12px"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ border: "1px solid #C8CDD4", borderRadius: "8px" }}
          gap="10px"
        >
          <Box className="savedgoal_content_limit">
            <Typography className="added_goal_name" sx={{ color: "#5D636B" }}>
              XXX Skill Improvement and Manageme...
            </Typography>
          </Box>
          <Stack flexDirection="row" alignItems="center" gap="10px">
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#989EA5",
                cursor: "pointer",
              }}
              onClick={() => {
                //   assignGoal();
              }}
            >
              Add
            </Typography>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "12px",
                color: "#F58A43",
                cursor: "pointer",
              }}
              onClick={() => {
                onAddClicked();
              }}
            >
              Add Purpose
            </Typography>
          </Stack>
        </Stack>*/}
    </Box>
  );
};

export default SavedForLaterGoals;
