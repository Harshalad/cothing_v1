import { Box, Typography, Stack, Avatar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { fetchPreviousGoals } from "../../../../actions/align/fetchPreviousGoals";
import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner/Spinner";

const PreviousGoals = ({ previousGoals, completedGoalsLoading }: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  console.log(previousGoals,"aditya previouslgoal");
  // useEffect(() => {
  //   const getUserGoals = async () => {
  //     try {
  //       const response = fetchPreviousGoals({
  //         userId: user?.id,
  //         programId: user?.activeProgramId,
  //       });
  //       console.log(response, "response : completed goal");

  //       //@ts-ignore
  //       if (response?.previousGoals) {
  //         //@ts-ignore
  //         setPreviousGoals(response?.previousGoals);
  //       }
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getUserGoals();
  // }, []);

  {
    completedGoalsLoading ? <Spinner /> : {};
  }

  {
    if (!previousGoals || !previousGoals?.length) {
      return (
        <>
          <Box className="goals_main">
            <Typography
              sx={{ color: "#5D636B", fontSize: "16px", textAlign: "center" }}
            >
              No data yet.
            </Typography>
          </Box>
        </>
      );
    } else {
      return (
        <Box className="goals_main">
          {previousGoals?.map((currentGoal: any, index: number) => {
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
                <Typography
                  className="disbaled_goal_name"
                  sx={{ color: "#5D636B" }}
                >
                  {currentGoal?.nameAlias
                    ? currentGoal?.nameAlias
                    : currentGoal?.name}
                </Typography>
                {!currentGoal?.onStart && <Avatar
                  sx={{
                    width: "22px",
                    height: "22px",
                    bgcolor: "#E8E3FF",
                    color: "#6755C3",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {currentGoal?.assignedBy?.substring(0, 1)?.toUpperCase()}
                </Avatar>}
              </Stack>
            );
          })}
        </Box>
      );
    }
  }
};

export default PreviousGoals;
