import { Box, Typography, Stack, Checkbox } from "@mui/material";

const NewGoalAdded = () => {
  return (
    <Box mt="32px">
      <Typography
        className="goal_heading"
        sx={{
          fontWeight: "600",
          color: "#1C2129",
          marginBottom: "16px",
        }}
      >
        New goal added
      </Typography>
      <label htmlFor={"new_goals"}>
        <Stack
          m="8px 0"
          p="0 16px"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="15px"
          sx={{ cursor: "pointer" }}
        >
          <Box className="goal_content_limit">
            <Typography
              sx={{
                fontWeight: "500",
                color: "#3E4248",
                fontSize: "16px",
              }}
            >
              Produce 30% more clean energy by 30th Nov 2024
            </Typography>
            <Typography sx={{ color: "#989EA5", fontSize: "12px" }}>
              This skill will enhance your people skills and.....
            </Typography>
          </Box>
          <Checkbox
            id={"new_goals"}
            sx={{
              padding: "0",
              color: "#C8CDD4",
              "&.Mui-checked": {
                color: "#2E5DB0",
              },
            }}
          />
        </Stack>
      </label>
    </Box>
  );
};

export default NewGoalAdded;
