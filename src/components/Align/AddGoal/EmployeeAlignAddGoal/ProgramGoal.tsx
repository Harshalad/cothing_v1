import { Box, Typography, Stack, Checkbox } from "@mui/material";
const ProgramGoal = ({ goal, checkBoxClicked, isAdded }: any) => {
  return (
    <>
      <Stack
        m="8px 0"
        p="0 16px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="15px"
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "500",
              color: "#3E4248",
              fontSize: "16px",
            }}
          >
            {goal.goalName}
          </Typography>
          <Typography sx={{ color: "#989EA5", fontSize: "12px" }}>
            This skill will enhance your people skills and.....
          </Typography>
        </Box>
        <Checkbox
          sx={{
            padding: "0",
            color: "#C8CDD4",
            "&.Mui-checked": {
              color: "#2E5DB0",
            },
          }}
          onClick={(e) => checkBoxClicked(goal.goalId, e)}
          checked={isAdded === true}
        />
      </Stack>
    </>
  );
};
export default ProgramGoal;
