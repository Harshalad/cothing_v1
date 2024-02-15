import {
  Box,
  Typography,
  Divider,
  LinearProgress,
  formControlClasses,
} from "@mui/material";

const AchieveGoals = ({
  achieve,
  index,
  goalActiveId,
  showMilestones,
  selectedGoal,
}: any) => {
  console.log(achieve, "inside achieve component");

  const getDate = (d: any) => {
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <Box
        className="tabContent"
        key={achieve.id}
        sx={{
          backgroundColor:
            (index === 0 && goalActiveId === "") || goalActiveId === achieve.id
              ? "#DFEBF6"
              : "transparent",
        }}
        onClick={() => {
          showMilestones(achieve.id, achieve.status);
        }}
      >
        <Typography
          sx={{
            color: "#1C2129",
            fontWeight:
              (index === 0 && goalActiveId === "") ||
              goalActiveId === achieve.id
                ? "700"
                : "400",
          }}
          className="progress_title"
        >
          {achieve?.nameAlias ? achieve?.nameAlias : achieve?.name}
        </Typography>
        <Box sx={{ width: "100%", margin: "16px 0" }}>
          <LinearProgress
            variant="determinate"
            value={achieve?.goalAchieveScore || 0}
            sx={{
              height: "8px",
              borderRadius: "16px",
              "&.MuiLinearProgress-root": {
                backgroundColor:
                  (index === 0 && goalActiveId === "") ||
                  goalActiveId === achieve.id
                    ? "#FFFFFF"
                    : "#EAECEF",
              },
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  achieve?.goalAchieveScore < 40
                    ? "#EE4412"
                    : achieve?.goalAchieveScore > 80
                    ? "#21C262"
                    : "#F2D56C",
              },
            }}
          />
        </Box>
        <Typography
          sx={{
            color: "#5D636B",
            fontWeight:
              (index === 0 && goalActiveId === "") ||
              goalActiveId === achieve.id
                ? "700"
                : "400",
            fontSize: "12px",
          }}
        >
          Target - {getDate(achieve.endDate)}
        </Typography>
      </Box>
      <Divider sx={{ margin: "12px 0" }} />
    </>
  );
};
export default AchieveGoals;
